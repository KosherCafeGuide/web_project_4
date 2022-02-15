//import and implement classes from Card and FormValidator 
//and implement functions in utils, using preset cards

//--
//import statements
//--
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import initialCards from "./cards.js";
import * as utils from "./utils.js";
//--
//Form Validator settings
//--
const settings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible",
};
//--
//Forms
//--
const profileForm = document.querySelector(".edit-profile-form");
const placeForm = document.querySelector(".add-place-form");
const profileFormValidator = new FormValidator(settings, profileForm);
const placeFormValidator = new FormValidator(settings, placeForm);

const elements = document.querySelector(".elements");

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();

function resetFormValidations() {
    profileFormValidator.resetValidation();
    placeFormValidator.resetValidation();
}

function renderCard(card, container) {
    container.prepend(card);
}

function makeViewableCard(card) {
    const newCard = new Card(card, "#element", utils.openPopup).generateCard();
    renderCard(newCard, elements);
}

initialCards.forEach(function(card) {
    makeViewableCard(card);
})
utils.setEventListeners(makeViewableCard, resetFormValidations);