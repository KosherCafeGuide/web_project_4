import Popup from "./Popup";

class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector); //this.popupElement
        this._handleFormSubmit = handleFormSubmit;
        this._form = this.popupElement.querySelector('.popup__form');
        this._submitBtn = this._form.querySelector('.popup__button');

    }
    _getInputValues() {
        const inputs = [...this._form.querySelectorAll('.popup__input')];
        const inputValues = {};

        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }
    changeSubmitBtnText(msg = "saving") {
        this._submitBtn.textContent = msg;
    }
    _formSubmit() {
        this._handleFormSubmit(this._getInputValues());
    }
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => this._formSubmit(evt));
    }
    close = () => { //arrow function method, retains context without need for .bind(this)

        this._form.reset();
        super.close();
    }

    prefillForm(inputValues) {
        const inputs = [...this._form.querySelectorAll('.popup__input')];
        inputs.forEach((input) => {
            input.value = inputValues[input.name];
        });
    }
}

export default PopupWithForm;