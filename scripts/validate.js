const hideInputError = (input, formEl, { errorClass, inputErrorClass }) => {
    const errorSpan = formEl.querySelector("#" + input.id + "-error");
    errorSpan.textContent = "";
    errorSpan.classList.remove(errorClass);
    input.classList.remove(inputErrorClass);
}

const showInputError = (input, formEl, { errorClass, inputErrorClass }) => {
    const errorSpan = formEl.querySelector("#" + input.id + "-error");
    errorSpan.textContent = input.validationMessage;
    errorSpan.classList.add(errorClass);
    input.classList.add(inputErrorClass);
}

const checkInputValidity = (input, settings, formEl) => {
    if (input.validity.valid) {
        hideInputError(input, formEl, settings);
    } else {
        showInputError(input, formEl, settings);
    }
}
const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};

const toggleButtonState = (inputList, buttonElement, { inactiveButtonClass }) => {

    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.disabled = true;
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.disabled = false;
    }
}
const setEventListners = (formEl, settings) => {
    const inputList = [...formEl.querySelectorAll(settings.inputSelector)];
    const button = formEl.querySelector(settings.submitButtonSelector);
    inputList.forEach((input) => {
        input.addEventListener("input", () => {
            checkInputValidity(input, settings, formEl);
            toggleButtonState(inputList, button, settings);
        })
    });
    toggleButtonState(inputList, button, settings);
}


const enableValidation = (settings) => {
    const formElements = [...document.querySelectorAll(settings.formSelector)];
    formElements.forEach(formEl => {
        formEl.addEventListener("Submit", (e) => e.preventDefault());
        setEventListners(formEl, settings);
    })
}
enableValidation({
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__button",
    inactiveButtonClass: "popup__button_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_visible"
});