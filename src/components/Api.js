class API {
    constructor({ baseURL, headers }) {
        this.baseURL = baseURL;
        this.headers = headers;
    }
    _customFetch(url, method = "GET") { //used internally
        return fetch(url, {
                method: method,
                headers: this.headers
            })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
            .catch((err) => {
                console.log(err);
            });
    }
    getInitialCards() { //index.js line 66
        return this._customFetch(`${this.baseURL}/cards`);
    }
    getUserInfo() { //index.js Line 66 and 186
        return this._customFetch(`${this.baseURL}/users/me`);
    }

    editProfile({ userName, about }) { //index.js Line 91
        return fetch(`${this.baseURL}/users/me`, {
            method: "PATCH",
            headers: this.headers,
            body: JSON.stringify({
                name: userName,
                about: about
            })
        });
    }
    addCard({ name, link }) { //index.js Line 136
        return fetch(`${this.baseURL}/cards`, {
                method: "POST",
                headers: this.headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })

            })
            .then(res => res.json());
    }
    deleteCard(cardID) { //index.js Line 109
        return this._customFetch(`${this.baseURL}/cards/${cardID}`, "DELETE");
    }

    /*Not used yet*/
    getLikesCount(cardID) {
            return fetch(`${this.baseURL}/cards${cardID}`, {
                    headers: this.headers
                })
                .then(res => res.json())
                .then((result) => {
                    return result.likes.length;
                });
        }
        /*Not used yet*/
    isMyCard(cardID) {
        return fetch(`${this.baseURL}/cards/${cardID}`, {
                headers: this.headers
            })
            .then(res => res.json())
            .then((result) => {
                if (result.owner._id === this.authorisation) {
                    return true;
                } else {
                    return false;
                }
            });
    }

    likeCard(cardID) { //index.js Line 48
        return this._customFetch(`${this.baseURL}/cards/likes/${cardID}`, "PUT");
    }
    unlikeCard(cardID) { //index.js Line 50
        return this._customFetch(`${this.baseURL}/cards/likes/${cardID}`, "DELETE");
    }
    updateAvatar({ link }) {
        return fetch(`${this.baseURL}/users/me/avatar`, {
                method: "PATCH",
                headers: this.headers,
                body: JSON.stringify({
                    avatar: link
                })
            })
            .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
            .catch((err) => {
                console.log(err);
            });
    }


}
export const api = new API({
    baseURL: "https://around.nomoreparties.co/v1/group-12",
    headers: {
        authorization: "077e02f5-469c-4925-a110-e7daac9f6ead",
        "Content-Type": "application/json"
    }
});