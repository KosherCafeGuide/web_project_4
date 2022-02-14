//Card class with Export
//import openPopup from "./utils.js";
class Card {
    constructor(data, templateSelector, openPopup) {
        this._title = data.name;
        this._imageUrl = data.link;
        this._templateSelector = templateSelector; // "#card-template"
        this._openPopup = openPopup;

    };
    _getTemplate() {
        this.cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(".element")
            .cloneNode(true);
    }
    _addDataToCard() {
        this.title = this.cardElement.querySelector(".element__image-title");
        this.image = this.cardElement.querySelector(".element__image");
        this.title.textContent = this._title;
        this.image.src = this._imageUrl;
        this.image.alt = this._title;
    }

    _expandImage() {
        const popupImage = document.querySelector(".popup__image");
        const popupImageTitle = document.querySelector(".popup__image-title");
        const popupImagePopup = popupImage.closest(".popup");
        popupImage.src = this._imageUrl;
        popupImage.alt = this._title;
        popupImageTitle.textContent = this._title;
        console.log(this);
        console.log(this._openPopup);
        this._openPopup(popupImagePopup);
    }
    _addEventListeners() {
        this.deleteBtn = this.cardElement.querySelector(".element__delete-btn")
        this.likeBtn = this.cardElement.querySelector(".element__like-toggle");
        this.deleteBtn.addEventListener("click", () => {
            this.cardElement.remove();
        });
        this.likeBtn.addEventListener("click", () => {
            this.likeBtn.classList.toggle("element__like-toggle-active");
        })
        this.image.addEventListener("click", () => {
            this._expandImage()
        });
    }

    generateCard() {
        this._getTemplate();
        this._addDataToCard();
        this._addEventListeners();

        return this.cardElement;
    }
}

export default Card;