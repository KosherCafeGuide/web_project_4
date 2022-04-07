class Popup {
    constructor(popupSelector) {
        this.popupElement = document.querySelector(popupSelector);
        this._handleEscUp = this._handleEscUp.bind(this);
        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
    }

    _handleEscUp(evt) {
        //prevent default and if button was Esc call close method
        evt.preventDefault();
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    setEventListeners() {
        //create an event listener for click on close button or semitransparent background
        this.popupElement.querySelector('.cancel').addEventListener('click', this.close); //close button
        //suggestion of mousedown used. eventListeners using arrow functions can't be removed,
        // and if I don't use an arrow function I don't have access to both evt.target and this.popupElement
        // so if I can't remove it in close, I'm not going to create a new on with each open!90-/8472425451132        
        this.popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target === this.popupElement) {
                this.close(); //popup semitransparent background
            }
        });
    }
    _handleOverlayClick(evt) {
        if (evt.target === this.popupElement) {
            this.close(); //popup semitransparent background
        }
    }
    open() {
        //add a new class and creates an eventlistener for Esc keyup
        this.popupElement.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscUp);

    }

    close() {
        //removes the class we added and the eventlistener for the Esc keyup
        this.popupElement.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscUp);
    }
}

export default Popup;