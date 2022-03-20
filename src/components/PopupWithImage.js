import Popup from "./Popup";

class PopupWithImage extends Popup {
    open = ({ link, name }) => {
        //puts name from args to the .popup__caption selector
        const imageCaption = this.popupElement.querySelector('.popup__image-title');
        imageCaption.textContent = name;
        //find image by the ".popup__image" selector, set alt and src for it
        const imageElement = this.popupElement.querySelector('.popup__image');
        imageElement.src = link;
        imageElement.alt = name;
        //call super.open(); 
        super.open();
    }
}

export default PopupWithImage;