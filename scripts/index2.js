//import and implement classes from Card and FormValidator 
//and implement functions in utils, using preset cards

//--
//import statements
//--
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
//--
//Form Validator settings
//--
const settings = {
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};
//--
//Forms
//--
const profileForm = document.querySelector(".edit-profile-form");
const placeForm = document.querySelector(".add-place-form");
const profileFormValidator = new FormValidator(settings, profileForm);
const placeFormValidator = new FormValidator(settings, placeForm);

profileFormValidator.enableValidation();
placeFormValidator.enableValidation();


function renderCard(card, container) {
    container.prepend(card, container);
}

initialCards.forEach(function(card) {
    renderCard(new Card(card, "#element").generateCard, elements);
})