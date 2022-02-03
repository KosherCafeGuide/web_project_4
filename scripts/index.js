//--
//Forms
//--
const profileForm = document.querySelector(".edit-profile-form");
const placeForm = document.querySelector(".add-place-form");
//--
//Direct from the DOM
//--
const profile = document.querySelector(".profile");
const profileFormPopup = profileForm.closest(".popup");
const placeFormPopup = placeForm.closest(".popup");
const popupImage = document.querySelector(".popup__image");
const popupImageTitle = document.querySelector(".popup__image-title")
const popupImagePopup = popupImage.closest(".popup");
const elements = document.querySelector(".elements");
const elementTemplate = document.querySelector("#element").content.querySelector(".element");

//--
//Form Elements (labels, fields and buttons)
//--
const editButton = profile.querySelector(".profile__edit-btn");
const addButton = profile.querySelector(".profile__add-btn");
const cancelButtons = document.querySelectorAll(".cancel");
const overlays = document.querySelectorAll(".popup");
const nameInput = profileForm.querySelector(".edit-profile-form__field_type_name");
const groupInput = profileForm.querySelector(".edit-profile-form__field_type_group");
const titleInput = placeForm.querySelector(".add-place-form__field_type_title");
const linkInput = placeForm.querySelector(".add-place-form__field_type_link");


//--
//Page Elements /DOM Nodes used in code
//--

const profileName = profile.querySelector(".profile__name");
const profileGroup = profile.querySelector(".profile__group");

//--
//Functions
//--

function deleteCard(card) {
    card.remove();
}

function createCard(card) {

    const element = elementTemplate.cloneNode(true);
    const deleteBtn = element.querySelector(".element__delete-btn")
    const title = element.querySelector(".element__image-title");
    const image = element.querySelector(".element__image");
    const likeBtn = element.querySelector(".element__like-toggle");

    title.textContent = card.name;
    image.src = card.link;
    image.alt = card.name;

    deleteBtn.addEventListener("click", function(evt) {
        deleteCard(element);
    })
    likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("element__like-toggle-active");
    })
    image.addEventListener("click", expandImage);
    return element;

}

function expandImage(evt) {

    const imageURL = evt.target.currentSrc;
    const imageTitle = evt.target.alt;
    popupImage.src = imageURL;
    popupImage.alt = imageTitle;
    popupImageTitle.textContent = imageTitle;

    openPopup(popupImagePopup);

}

function renderCard(card, container) {
    container.prepend(card);
}

initialCards.forEach(function(card) {
        renderCard(createCard(card), elements);
    })
    // Note that the function name starts with a verb
    // and describes exactly what the function does
function handleProfileFormSubmit(evt) {
    // This line stops the browser from 
    // submitting the form in the default way.
    evt.preventDefault();

    const newName = nameInput.value;
    const newGroup = groupInput.value;

    profileName.textContent = newName;
    profileGroup.textContent = newGroup;
    closePopup(evt.target.closest(".popup_opened"));
}



function handleEscDown(evt) {
    console.log("Window Level Esc");
    if (evt.code === "Escape") {
        console.log("isEscEvent");
        //evt.preventDefault();
        closePopup(document.querySelector(".popup_opened"));
    }
}

function handleEscDown2(evt) {
    console.log("Popup Level Esc");
    if (evt.code === "Escape") {
        console.log("isEscEvent");
        //evt.preventDefault();
        closePopup(document.querySelector(".popup_opened"));
    }
}

function handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget) {
        closePopup(evt.target);
    }
}

function closePopup(popup) {
    popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", handleEscDown);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
    document.addEventListener("keydown", handleEscDown);
}

function handleFormCancel(evt) {
    closePopup(evt.target.closest(".popup_opened"));
}



function handleProfileFormOpen() {
    const currentName = profileName.textContent;
    const currentGroup = profileGroup.textContent;

    nameInput.value = currentName;
    groupInput.value = currentGroup;

    openPopup(profileFormPopup);

}

function handlePlaceFormOpen() {
    openPopup(placeFormPopup);
}

function disableSubmitButton(submitButton) {
    console.log(submitButton);
    submitButton.disabled = true;
    submitButton.classList.add("popup__button_disabled");
}

function handlePlaceFormSubmit(evt) {
    // This line stops the browser from 
    // submitting the form in the default way.
    evt.preventDefault();
    const newTitle = titleInput.value;
    const newLink = linkInput.value;
    const newCard = {
        name: newTitle,
        link: newLink
    }
    placeForm.reset();
    renderCard(createCard(newCard), elements);
    closePopup(evt.target.closest(".popup_opened"));
    console.log(evt.submitter);
    disableSubmitButton(evt.submitter);
}

//--
//Event listeners
//--

profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);
cancelButtons.forEach(function(cancelButton) {
    cancelButton.addEventListener('click', handleFormCancel);
})
overlays.forEach(function(overlay) {
    overlay.addEventListener('click', handleOverlayClick);
})
editButton.addEventListener("click", handleProfileFormOpen);
addButton.addEventListener("click", handlePlaceFormOpen);