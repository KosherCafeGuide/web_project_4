import Popup from "./Popup";
class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleSubmit }) {
        super(popupSelector); //this.popupElement
        this._handleSubmit = handleSubmit;
        this._confirmation = this.popupElement.querySelector('.popup__confirmation');
        this._submitBtn = this._confirmation.querySelector('.popup__button');
    }
    _confirmSubmit(event) {
        event.preventDefault();
        this._handleSubmit(this.card);
        this.close();
    }
    open(card) {
        this.card = card;
        super.open();
    }
    setEventListeners() {
        super.setEventListeners();

        this._confirmation.addEventListener('submit', (event) => this._confirmSubmit(event));
    }
    changeSubmitBtnText(msg = "saving") {
        this._submitBtn.textContent = msg;
    }

}
export default PopupWithConfirmation;