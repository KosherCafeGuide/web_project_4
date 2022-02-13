//Card class with Export
class Card {
    constructor(data, templateSelector) {
        this._title = data.name;
        this._imageUrl = data.link;
        this._templateSelector = templateSelector; // "#card-template"

    };
    _getTemplate() {
        this.cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(".card")
            .cloneNode(true);
    }
    _addDataToCard() {
        this.title = cardElement.querySelector(".element__image-title");
        this.image = cardElement.querySelector(".element__image");
        this.title.textContent = this._title;
        this.image.src = this._imageUrl;
        this.image.alt = this._title;
    }
    _deleteCard() {
        this.remove();
    }
    _expandImage() {
        const popupImage = document.querySelector(".popup__image");
        const popupImageTitle = document.querySelector(".popup__image-title");
        const popupImagePopup = popupImage.closest(".popup");
        popupImage.src = this._imageUrl;
        popupImage.alt = this._title;
        popupImageTitle.textContent = this._title;

        openPopup(popupImagePopup);
    }
    _addEventListeners() {
        this.deleteBtn = cardElement.querySelector(".element__delete-btn")
        this.likeBtn = cardElement.querySelector(".element__like-toggle");
        this.deleteBtn.addEventListener("click", function(evt) {
            _deleteCard(element);
        })
        this.likeBtn.addEventListener("click", () => {
            this.likeBtn.classList.toggle("element__like-toggle-active");
        })
        this.image.addEventListener("click", _expandImage);
    }

    generateCard() {
        _getTemplate();
        _addDataToCard();
        _addEventListeners();

        return this.cardElement;
    }
}

export default Card;