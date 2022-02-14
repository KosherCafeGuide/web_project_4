//class FormValidator with Export
class FormValidator {
    constructor(settings, formElement) {
        this.settings = settings; //selectors and form classes
        this.formElement = formElement; //form element to be validated
    }
    _hideInputError(input) {
        const errorspan = this.formElement.querySelector("#" + input.id + "-error");
        errorspan.textContent = "";
        errorspan.classList.remove(this.settings.errorClass);
        input.classList.remove(this.settings.inputErrorClass);
    }
    _showInputError(input) {
        const errorspan = this.formElement.querySelector("#" + input.id + "-error");
        errorspan.textContent = input.validationMessage;
        errorspan.classList.add(this.settings.errorClass);
        input.classList.add(this.settings.inputErrorClass);
    }

    _checkInputValidity(input) {
        if (input.validity.valid) {
            this._hideInputError(input);
        } else {
            this._showInputError(input);
        }

    }
    _hasInvalidInput() {
        return this.inputList.some((inputElement) => { return !inputElement.validity.valid })
    }

    _toggleButtonState() {
        if (this._hasInvalidInput()) {
            this.button.classList.add(this.settings.inactiveButtonClass)
            this.button.disabled = true;
        } else {
            this.button.classList.remove(this.settings.inactiveButtonClass)
            this.button.disabled = false;
        }
    }
    _setEventListners() {
        this.inputList = [...this.formElement.querySelectorAll(this.settings.inputSelector)];
        this.button = this.formElement.querySelector(this.settings.submitButtonSelector);
        this.inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            })

        });
        this._toggleButtonState();
    }
    enableValidation() {
        this.formElement.addEventListener("submit", (e) => e.preventDefault());
        this._setEventListners();

    }
}
export default FormValidator;