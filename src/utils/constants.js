export const defaultFormConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
};

export const popupConfig = {
    imageModalWindow: ".popup-image",
    editFormModalWindow: ".popup-profile-form",
    cardFormModalWindow: ".popup-place-form",
    deleteConfirmationWindow: ".popup-delete-confirmation",
    changeAvatarModalWindow: ".popup-avatar-form"
};

export const profileConfig = {
    profileTitle: ".profile__name",
    profileDescription: ".profile__job",
    profileAvatarImage: ".profile__avatar"
};

export const cardsConfig = {
    cardSelector: "#element", //Card. templateSelector  
    placeswrap: ".elements", //Section.containerSelector
};
export const submitButtonConfig = {
    profile: ".edit-profile-form__save",
    avatar: ".update-avatar-form__save",
    card: ".add-place-form__save"
}