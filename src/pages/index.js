import "./index.css";
import avatar from "../images/avatar.jpg";
const avatarProfile = document.getElementById("profile__avatar");
avatarProfile.src = avatar;
//import and implement classes from Card and FormValidator 
//and implement functions in utils, using preset cards

//--
//import statements
//--
import Card from "../components/Card";
import FormValidator from "../components/FormValidator";
import { initialCards, defaultFormConfig, popupConfig, profileConfig, cardsConfig } from "../utils/constants";
import PopupWithForm from "../components/PopupWithForm";
import PopupWithImage from "../components/PopupWithImage";
import Section from "../components/Section";
import UserInfo from "../components/UserInfo";

//--
//Profile Setup
//--
const userInfo = new UserInfo({
    nameSelector: profileConfig.profileTitle,
    jobSelector: profileConfig.profileDescription
});

//--
//Cards Setup
//--
const renderCard = (data) => {
    const card = new Card({
        data,
        handleCardClick: () => {
            openImagePopup(data);
        }

    }, cardsConfig.cardSelector);
    cardsList.addItem(card.generateCard());
}
const cardsList = new Section({
    items: initialCards,
    renderer: (data) => {
        renderCard(data);
    }
}, cardsConfig.placeswrap);

//--
//Image Popup Setup
//--
const imagePopup = new PopupWithImage(popupConfig.imageModalWindow);
const openImagePopup = (data) => {
        imagePopup.open(data);
    }
    //--
    //User Info Popup Setup
    //--
const userInfoPopup = new PopupWithForm({
    popupSelector: popupConfig.editFormModalWindow,
    handleFormSubmit: (data) => {
        userInfo.setUserInfo(data)
    }
});

//--
//Add Card Popup Setup
//--
const newCardPopup = new PopupWithForm({
    popupSelector: popupConfig.cardFormModalWindow,
    handleFormSubmit: (data) => {
        renderCard(data);
    }
});

//--
//Form Validator settings
//--
const profileFormValidator = new FormValidator(defaultFormConfig, userInfoPopup.popupElement);
const placeFormValidator = new FormValidator(defaultFormConfig, newCardPopup.popupElement);

//--
//EventListeners
//--
imagePopup.setEventListeners();
userInfoPopup.setEventListeners();
newCardPopup.setEventListeners();

//--
//Initial Cards / Places
//--
cardsList.renderItems(initialCards);

//--
//Enable Form Validators
//--
profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

//--
//DOM to JS
//--

const openProfileForm = document.querySelector('.profile__edit-btn');
const openPlaceForm = document.querySelector('.profile__add-btn');
const openProfileFormWithCurrentInfo = () => {
    userInfoPopup.open();
    userInfoPopup.setPlaceholders(userInfo.getUserInfo());
    profileFormValidator.resetValidation();
}

openProfileForm.addEventListener('click', openProfileFormWithCurrentInfo);

const openPlaceFormEmpty = () => {
    newCardPopup.open();
    placeFormValidator.resetValidation();
}
openPlaceForm.addEventListener('click', openPlaceFormEmpty);