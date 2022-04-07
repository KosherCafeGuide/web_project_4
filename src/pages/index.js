import "./index.css";
/*import avatar from "../images/avatar.jpg";
const avatarProfile = document.getElementById("profile__avatar");
avatarProfile.style.backgroundImage = `url(${avatar})`;*/
//import and implement classes from Card and FormValidator 
//and implement functions in utils, using preset cards

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


const renderCard = (data) => {
    let canDelete = ((data.owner._id === myID) ? true : false);
    const card = new Card({
        data,
        handleCardClick: () => {
            openImagePopup(data);
        },
        confirmDelete: (cardID) => {
            openDeleteConfirmationPopup(cardID)
        },
        toggleMyLikeTo: (cardID, isLikedByMe) => {
            if (isLikedByMe) {
                api.likeCard(cardID);
            } else {
                api.unlikeCard(cardID);
            }
        }

    }, cardsConfig.cardSelector);
    cardsList.addItem(card.generateCard(canDelete, myID));
}
const cardsList = new Section({
    renderer: renderCard,
}, cardsConfig.placeswrap);

let myID = "0";
let hardRefresh = false;

function refreshScreen() {
    Promise.all([api.getInitialCards(), api.getUserInfo()])
        .then(([cardData, userData]) => {
            if (hardRefresh === true) {
                location.href = location.href;
                hardRefresh = false;
            }
            myID = userData._id;

            cardsList.renderItems(cardData);
            userInfo.setUserInfo({ userName: userData.name, job: userData.about, userID: userData._id, avatarURL: userData.avatar });
        })

}
refreshScreen();
//--
//Image Popup Setup
//--
const imagePopup = new PopupWithImage(popupConfig.imageModalWindow);
const openImagePopup = (data) => { imagePopup.open(data); };
//--
//SubmitButton TextContent
//--
//const userInfoSubmitText = document.querySelector(submitButtonConfig.profile).
//--
//User Info Popup Setup
//--
const userInfoPopup = new PopupWithForm({
    popupSelector: popupConfig.editFormModalWindow,
    handleFormSubmit: (data) => {
        userInfoPopup.changeSubmitBtnText("Updating profile information");
        api.editProfile({ userName: data.name, about: data.job })
            .then(res => {
                if (res.ok) {
                    userInfo.setUserInfo({ userName: data.name, job: data.job });
                    hardRefresh = true;
                    userInfoPopup.changeSubmitBtnText("Profile Information updated successfully");
                    //refreshScreen();
                } else {
                    console.log("error updating User Profile");
                    console.log(res.statusText);
                    userInfoPopup.changeSubmitBtnText(res.statusText);
                }
            })
            .finally(res => {
                userInfoPopup.changeSubmitBtnText("Save");
                userInfoPopup.close();
            })


    }

});
const deleteConfirmationPopup = new PopupWithConfirmation({
    popupSelector: popupConfig.deleteConfirmationWindow,
    handleSubmit: (cardID) => {
        //deleConfirmationPopup.changeSubmitBtnText();
        api.deleteCard(cardID)
            .then(res => {

                if (res.message === "This post has been deleted") {
                    //deleConfirmationPopup.changeSubmitBtnText("Card Deleted");
                    hardRefresh = true;
                    refreshScreen();

                } else {
                    reject("error while deleting image from server")
                }
            })
            .catch(error => {
                console.log(error);
            })
            .finally(res => {
                //deleteConfirmationPopup.changeSubmitBtnText("Yes");
                deleteConfirmationPopup.close();
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
                if (res.ok) {
                    hardRefresh = true;
                    refreshScreen();
                    newCardPopup.changeSubmitBtnText("New photo successfully added");

                } else {
                    console.log("Error adding Card");
                }

            })
            .catch({

            })
            .finally(res => {
                newCardPopup.changeSubmitBtnText("Save");
                newCardPopup.close();
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
                    hardRefresh = true;
                    changeAvatarPopup.changeSubmitBtnText("Avatar successfully updated");
                    refreshScreen();



                } else {
                    console.log("Error changing Avatar image");
                }

            })
            .catch({

            })
            .finally(res => {
                changeAvatarPopup.changeSubmitBtnText("Save");
                changeAvatarPopup.close();
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