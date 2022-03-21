//Card class with Export
class Card {
    constructor(data, templateSelector) {
        this._title = data.data.name; //not sure why I need the extra "data." here!
        this._imageUrl = data.data.link;
        this._templateSelector = templateSelector; // "#card-template"
        this._handleCardClick = data.handleCardClick;

    };
    _getTemplate() {
        this._cardElement = document
            .querySelector(this._templateSelector)
            .content
            .querySelector(".element")
            .cloneNode(true);
    }
    _addDataToCard() {
        this.title = this._cardElement.querySelector(".element__image-title");
        this.image = this._cardElement.querySelector(".element__image");
        this.title.textContent = this._title;
        this.image.src = this._imageUrl;
        this.image.alt = this._title;
    }


    _addEventListeners() {
        const deleteBtn = this._cardElement.querySelector(".element__delete-btn")
        const likeBtn = this._cardElement.querySelector(".element__like-toggle");
        deleteBtn.addEventListener("click", () => {
            this._cardElement.remove(); //this._cardElement=null; does not work
            this._cardElement = null;
        });
        likeBtn.addEventListener("click", () => {
            likeBtn.classList.toggle("element__like-toggle-active");
        })
        this.image.addEventListener("click", () => {
            this._handleCardClick({
                link: this._imageUrl,
                name: this._title
            });
        });
    }

    generateCard() {
        this._getTemplate();
        this._addDataToCard();
        this._addEventListeners();

        return this._cardElement;
    }
}

export default Card;