//Card class with Export
class Card {
    constructor(data, templateSelector) {
        this._title = data.data.name; //not sure why I need the extra "data." here!
        this._imageUrl = data.data.link;
        this._cardID = data.data._id;
        this._ownerID = data.data.owner._id;
        this._likes = data.data.likes;

        this._handleLike = data.handleLike;
        this._handleUnlike = data.handleUnlike;
        this._handleCardClick = data.handleCardClick;
        this._confirmDelete = data.confirmDelete; //returns true if should delete 
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
                this._confirmDelete(this);

            });
        } else {
            deleteBtn.classList.add("hide");
        }
        this._likeButton = this._cardElement.querySelector(".element__like-toggle");
        this.isLikedByMe = this._likes.find(this._doILike);
        this.setLikeIcon();

        this._likeButton.addEventListener('click', () => {
            // this.isLikedByMe = !this.isLikedByMe;
            if (this.isLikedByMe) {
                this._handleUnlike(this);
            } else {
                this._handleLike(this);
            }
        });

        this.image.addEventListener("click", () => {
            this._handleCardClick({
                link: this._imageUrl,
                name: this._title
            });
        });
    }
    setLikeIcon() {
        if (this.isLikedByMe) {
            this._likeButton.classList.add("element__like-toggle-active");
        } else {
            this._likeButton.classList.remove("element__like-toggle-active");
        }
    }
    updateLikesCount(newCount) {
        this.likesCount.textContent = newCount;
    }
    generateCard(canDelete, myID) {
        this._myID = myID;
        this._getTemplate();
        this._addDataToCard();
        this._addEventListeners(canDelete);

        return this._cardElement;
    }
    getID() {
        return this._cardID;
    }
}

export default Card;