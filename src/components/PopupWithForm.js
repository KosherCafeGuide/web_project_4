import Popup from "./Popup";
class PopupWithForm extends Popup {
    constructor({ popupSelector, handleFormSubmit }) {
        super(popupSelector); //this.popupElement
        this._handleFormSubmit = handleFormSubmit;
        this._form = this.popupElement.querySelector('.popup__form');
        this.close = this.close.bind(this);
        //this.setEventListeners = this.setEventListeners.bind(this);
    }
    _getInputValues() {
        const inputs = [...this._form.querySelectorAll('.popup__input')];
        const inputValues = {};

        inputs.forEach((input) => {
            inputValues[input.name] = input.value;
        });

        return inputValues;
    }
    _formSubmit() {
        this._handleFormSubmit(this._getInputValues());
        this.close();
    }
    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', () => this._formSubmit());
    }
    close() {

        this._form.reset();
        super.close();
    }

    setPlaceholders(placeHolderValues) { //currently user={name:"value of name", job: "value of job"}
        const inputs = [...this._form.querySelectorAll('.popup__input')];
        inputs.forEach((input) => {
            input.value = placeHolderValues[input.name];
        });
    }
}

export default PopupWithForm;