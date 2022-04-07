//Card class with Export
class Card {
    constructor(data, templateSelector) {
        this._title = data.data.name; //not sure why I need the extra "data." here!
        this._imageUrl = data.data.link;
        this._cardID = data.data._id;
        this._ownerID = data.data.owner._id;
        this._likes = data.data.likes;

        this._handleCardClick = data.handleCardClick;
        this._confirmDelete = data.confirmDelete; //returns true if should delete 
        this._toggleMyLikeTo = data.toggleMyLikeTo; //toggle like status on server


        this._templateSelector = templateSelector; // "#card-template"

        this._doILike = this._doILike.bind(this);
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
        this.likesCount = this._cardElement.querySelector(".element__likes-count");
        if (this._likes === undefined) {
            this._likes = [];
        }
        this.likesCount.textContent = this._likes.length;
        this.title.textContent = this._title;
        this.image.src = this._imageUrl;
        this.image.alt = this._title;
    }
    deleteCard() {
        this._cardElement.remove(); //this._cardElement=null; does not work
        this._cardElement = null;
    }
    _doILike(idOfLiker) {
        return idOfLiker._id === this._myID;
    }
    _addEventListeners(canDelete) {
        const deleteBtn = this._cardElement.querySelector(".element__delete-btn")
        if (canDelete) {
            deleteBtn.classList.remove("hide");
            deleteBtn.addEventListener("click", () => {
                this._confirmDelete(this._cardID);

            });
        } else {
            deleteBtn.classList.add("hide");
        }
        this.likeBtn = this._cardElement.querySelector(".element__like-toggle");
        this.isLikedByMe = this._likes.find(this._doILike);
        this._setLikeIcon();
        this.likeBtn.addEventListener("click", () => {
            this.isLikedByMe = !this.isLikedByMe;
            if (this.isLikedByMe) {
                this.likesCount.textContent = Number(this.likesCount.textContent) + 1;
            } else {
                this.likesCount.textContent = Number(this.likesCount.textContent) - 1;
            }
            this._toggleMyLikeTo(this._cardID, this.isLikedByMe);
            this._setLikeIcon();
        })
        this.image.addEventListener("click", () => {
            this._handleCardClick({
                link: this._imageUrl,
                name: this._title
            });
        });
    }
    _setLikeIcon() {
        if (this.isLikedByMe) {
            this.likeBtn.classList.add("element__like-toggle-active");
        } else {
            this.likeBtn.classList.remove("element__like-toggle-active");
        }
    }
    generateCard(canDelete, myID) {
        this._myID = myID;
        this._getTemplate();
        this._addDataToCard();
        this._addEventListeners(canDelete);

        return this._cardElement;
    }
}

export default Card;