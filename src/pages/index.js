import "./index.css";
//--
//import statements
//--
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import { defaultFormConfig, popupConfig, profileConfig, cardsConfig } from "../utils/constants";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";
import { api } from "../components/Api";
import PopupWithConfirmation from "../components/PopupWithConfirmation";


//--
//Profile Setup
//--

const userInfo = new UserInfo({
    nameSelector: profileConfig.profileTitle,
    jobSelector: profileConfig.profileDescription,
    avatarSelector: profileConfig.profileAvatarImage
});

//--
//Cards Setup
//--
function createCard(data) {
    const card = new Card({
        data,
        handleCardClick: () => {
            openImagePopup(data);
        },
        confirmDelete: (cardToDelete) => {
            openDeleteConfirmationPopup(cardToDelete)
        },
        handleLike,
        handleUnlike,
    }, cardsConfig.cardSelector);
    return card;
}

const renderCard = (data) => {
    const canDelete = ((data.owner._id === myID) ? true : false);
    const card = createCard(data);
    cardsList.addItem(card.generateCard(canDelete, myID));
}


function handleLike(card) {
    api.likeCard(card.getID())
        .then((res) => {
            card.isLikedByMe = true;
            card.setLikeIcon(true);
            card.updateLikesCount(res.likes.length);

        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {});
}

function handleUnlike(card) {
    api.unlikeCard(card.getID())
        .then((res) => {
            card.isLikedByMe = false;
            card.setLikeIcon(false);
            card.updateLikesCount(res.likes.length);
        })
        .catch((err) => {
            console.log(err);
        });
}



const cardsList = new Section({
    renderer: renderCard,
}, cardsConfig.placeswrap);

let myID = "0";

Promise.all([api.getInitialCards(), api.getUserInfo()])
    .then(([cardData, userData]) => {

        myID = userData._id;
        cardsList.renderItems(cardData);
        userInfo.setUserInfo({ userName: userData.name, job: userData.about, userID: userData._id, avatarURL: userData.avatar });
    })
    .catch((err) => {
        console.log(err);
    });

//--
//Image Popup Setup
//--
const imagePopup = new PopupWithImage(popupConfig.imageModalWindow);
const openImagePopup = (data) => { imagePopup.open(data); };

//--
//User Info Popup Setup
//--
const userInfoPopup = new PopupWithForm({
    popupSelector: popupConfig.editFormModalWindow,
    handleFormSubmit: (data) => {
        userInfoPopup.changeSubmitBtnText("Updating profile information");
        api.editProfile({ userName: data.name, about: data.job })
            .then(res => {
                userInfo.setUserInfo({ userName: res.name, job: res.about, userID: res._id, avatarURL: res.avatar });

                userInfoPopup.close();
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                userInfoPopup.changeSubmitBtnText("Save");
            })



    }

});
const deleteConfirmationPopup = new PopupWithConfirmation({
    popupSelector: popupConfig.deleteConfirmationWindow,
    handleSubmit: (card) => {
        deleteConfirmationPopup.changeSubmitBtnText("Deleting...");
        api.deleteCard(card.getID())
            .then(res => {
                card.deleteCard();
                deleteConfirmationPopup.close();
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                deleteConfirmationPopup.changeSubmitBtnText("Yes");
            })


    }
});
const openDeleteConfirmationPopup = (data) => { deleteConfirmationPopup.open(data); };

//--
//Add Card Popup Setup
//--
const newCardPopup = new PopupWithForm({
    popupSelector: popupConfig.cardFormModalWindow,
    handleFormSubmit: (data) => {
        newCardPopup.changeSubmitBtnText("Adding new photo");
        api.addCard(data)
            .then(res => {
                data.owner = { _id: userInfo.getUserID() };
                data._id = res._id;
                data.owner._id = myID;
                renderCard(data);
                newCardPopup.close();
            })
            .catch(error => {
                console.log(error);
            })
            .finally(() => {
                newCardPopup.changeSubmitBtnText("Save");
            })
    }
});

const changeAvatarPopup = new PopupWithForm({
    popupSelector: popupConfig.changeAvatarModalWindow,
    handleFormSubmit: (data) => {
        changeAvatarPopup.changeSubmitBtnText("Updating avatar image");
        api.updateAvatar(data)
            .then(res => {
                if (res.avatar === data.link) {
                    userInfo.setAvatar(data.link);
                    changeAvatarPopup.close();
                } else {
                    reject("Error changing Avatar image");
                }

            })
            .catch(error => {
                console.log(error);
            })
            .finally(res => {
                changeAvatarPopup.changeSubmitBtnText("Save");
            })

    }
})

//--
//Form Validator settings
//--
const profileFormValidator = new FormValidator(defaultFormConfig, userInfoPopup.popupElement);
const placeFormValidator = new FormValidator(defaultFormConfig, newCardPopup.popupElement);
const changeAvatarFormValidator = new FormValidator(defaultFormConfig, changeAvatarPopup.popupElement);
//--
//EventListeners
//--
imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();
deleteConfirmationPopup.setEventListeners();
changeAvatarPopup.setEventListeners();
//--
//Initial Cards / Places
//--
//cardsList.renderItems(initialCards);

//--
//Enable Form Validators
//--
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();
changeAvatarFormValidator.enableValidation();
//--
//DOM to JS
//--

const openProfileForm = document.querySelector('.profile__edit-btn');
const openPlaceForm = document.querySelector('.profile__add-btn');
const openAvatarForm = document.querySelector('.profile__edit-avatar-btn');
const openProfileFormWithCurrentInfo = () => {
    userInfoPopup.open();
    userInfoPopup.prefillForm(userInfo.getUserInfo());
    profileFormValidator.resetValidation();
}

openProfileForm.addEventListener('click', openProfileFormWithCurrentInfo);

const openPlaceFormEmpty = () => {
    newCardPopup.open();
    placeFormValidator.resetValidation();
}
openPlaceForm.addEventListener('click', openPlaceFormEmpty);
const changeAvatarImage = () => {
    changeAvatarPopup.open();
    changeAvatarFormValidator.resetValidation();
}
openAvatarForm.addEventListener('click', changeAvatarImage);