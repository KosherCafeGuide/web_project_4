import Popup from "./Popup";

class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this.imageCaption = this.popupElement.querySelector('.popup__image-title');
        this.imageElement = this.popupElement.querySelector('.popup__image');
    }
    open = ({ link, name }) => {
        this.imageCaption.textContent = name;
        this.imageElement.src = link;
        this.imageElement.alt = name;
        super.open();
    }
}

export default PopupWithImage;