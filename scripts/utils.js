//event handlers and openPopup/closePopup functions
/*PROFILE*/
const profile = document.querySelector(".profile");
const profileName = profile.querySelector(".profile__name");
const profileGroup = profile.querySelector(".profile__group");
const profileForm = document.querySelector(".edit-profile-form");
const profileFormPopup = profileForm.closest(".popup");
const editButton = profile.querySelector(".profile__edit-btn");
const nameInput = profileForm.querySelector(".edit-profile-form__field_type_name");
const groupInput = profileForm.querySelector(".edit-profile-form__field_type_group");

/*PLACE / CARD*/
const placeForm = document.querySelector(".add-place-form");
const placeFormPopup = placeForm.closest(".popup");
const addButton = profile.querySelector(".profile__add-btn");
const titleInput = placeForm.querySelector(".add-place-form__field_type_title");
const linkInput = placeForm.querySelector(".add-place-form__field_type_link");
const elements = document.querySelector(".elements");

/*GENERAL*/
const cancelButtons = document.querySelectorAll(".cancel");
const overlays = document.querySelectorAll(".popup");



function handleProfileFormSubmit(event) {
    // This line stops the browser from 
    // submitting the form in the default way.
    event.preventDefault();

    const newName = nameInput.value;
    const newGroup = groupInput.value;

    profileName.textContent = newName;
    profileGroup.textContent = newGroup;
    closePopup(event.target.closest(".popup_opened"));
}



function handleEscDown(event) {
    if (event.code === "Escape") {
        closePopup(document.querySelector(".popup_opened"));
    }
}

function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
        closePopup(event.target);
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

function handleFormCancel(event) {
    closePopup(event.target.closest(".popup_opened"));
}



function handleProfileFormOpen(resetFormValidations) {
    const currentName = profileName.textContent;
    const currentGroup = profileGroup.textContent;

    nameInput.value = currentName;
    groupInput.value = currentGroup;

    openPopup(profileFormPopup);
    resetFormValidations();

}

function handlePlaceFormOpen(resetFormValidations) {
    openPopup(placeFormPopup);
    resetFormValidations();
}

function handlePlaceFormSubmit(makeViewableCard, event) {

    const newCard = {
        name: titleInput.value,
        link: linkInput.value
    }
    placeForm.reset();
    makeViewableCard(newCard);
    closePopup(event.target.closest(".popup_opened"));
}

//--
//Event listeners
//--
function setEventListeners(makeViewableCard, resetFormValidations) {
    profileForm.addEventListener('submit', handleProfileFormSubmit);

    placeForm.addEventListener('submit', (event) => {
        handlePlaceFormSubmit(makeViewableCard, event);
    });
    cancelButtons.forEach(function(cancelButton) {
        cancelButton.addEventListener('click', handleFormCancel);
    })
    overlays.forEach(function(overlay) {
        overlay.addEventListener('click', handleOverlayClick);
    })
    editButton.addEventListener("click", () => {
        handleProfileFormOpen(resetFormValidations);
    });
    addButton.addEventListener("click", () => {
        handlePlaceFormOpen(resetFormValidations);
    });

}

export { openPopup, closePopup, setEventListeners };;