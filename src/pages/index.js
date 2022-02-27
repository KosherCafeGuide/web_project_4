//import and implement classes from Card and FormValidator 
//and implement functions in utils, using preset cards

//--
//import statements
//--
import Card from "./Card.js.js";
import FormValidator from "./FormValidator.js.js";
import initialCards from "./cards.js.js";
import * as utils from "./utils.js.js";
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

function resetProfileValidations() { //sacrificing readability and extendability for page load speed!
    profileFormValidator.resetValidation();
}

function resetPlaceValidation() { //sacrificing readability and extendability for page load speed!
    placeFormValidator.resetValidation();
}

function renderCard(card, container) {
    container.prepend(card); //if in the future we wanted to insert / append(card), the logic would go in this function
}

function makeViewableCard(card) {
    const newCard = new Card(card, "#element", utils.openPopup).generateCard();
    renderCard(newCard, elements);
}

initialCards.forEach(function(card) {
    makeViewableCard(card);
})
utils.setEventListeners(makeViewableCard, resetProfileValidations, resetPlaceValidation);