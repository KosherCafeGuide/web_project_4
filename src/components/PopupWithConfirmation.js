import Popup from "./Popup";
class PopupWithConfirmation extends Popup {
    constructor({ popupSelector, handleSubmit }) {
        super(popupSelector); //this.popupElement
        this._handleSubmit = handleSubmit;
        this._confirmation = this.popupElement.querySelector('.popup__confirmation');
    }
    _confirmSubmit(event) {
        event.preventDefault();
        this._handleSubmit(this.cardID);
        this.close();
    }
    open(cardID) {
        console.log("Popup with Confirmation Open for deleting Card ID ", cardID)
        this.cardID = cardID;

        super.open();
    }
    setEventListeners() {
        super.setEventListeners();

        this._confirmation.addEventListener('submit', (event) => this._confirmSubmit(event));
    }

}
export default PopupWithConfirmation;