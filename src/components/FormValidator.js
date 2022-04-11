//class FormValidator with Export
class FormValidator {
    constructor(settings, formElement) {
        this._settings = settings; //selectors and form classes
        this._formElement = formElement; //form element to be validated
    }
    _hideInputError(input) {
        const errorElement = this._formElement.querySelector("#" + input.id + "-error");
        errorElement.textContent = "";
        errorElement.classList.remove(this._settings.errorClass);
        input.classList.remove(this._settings.inputErrorClass);
    }
    _showInputError(input) {
        const errorElement = this._formElement.querySelector("#" + input.id + "-error");
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._settings.errorClass);
        input.classList.add(this._settings.inputErrorClass);
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
            this.button.classList.add(this._settings.inactiveButtonClass)
            this.button.disabled = true;
        } else {
            this.button.classList.remove(this._settings.inactiveButtonClass)
            this.button.disabled = false;
        }
    }
    _setEventListners() {
        this.inputList = [...this._formElement.querySelectorAll(this._settings.inputSelector)];
        this.button = this._formElement.querySelector(this._settings.submitButtonSelector);
        this.inputList.forEach((input) => {
            input.addEventListener("input", () => {
                this._checkInputValidity(input);
                this._toggleButtonState();
            })

        });
        this._toggleButtonState();
    }
    enableValidation() {
        this._formElement.addEventListener("submit", (e) => e.preventDefault());
        this._setEventListners();

    }
    resetValidation() {
        this.inputList.forEach((input) => {
            this._hideInputError(input) //clearing errors even if user accidently leaves the form with errors on it!            
        });
        this._toggleButtonState(); // controlling the submit button 
    }
}
export default FormValidator;