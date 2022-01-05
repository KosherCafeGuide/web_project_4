// Let's find the form in the DOM
const formElement = document.querySelector(".edit-profile-form"); // Use the querySelector() method
const profile = document.querySelector(".profile");
const editButton = profile.querySelector(".profile__edit-btn");
const popup = document.querySelector(".popup");
const nameInput = formElement.querySelector(".edit-profile-form__name"); // Use querySelector()
const groupInput = formElement.querySelector(".edit-profile-form__group"); // Use querySelector()
const profileName = profile.querySelector(".profile__name");
const profileGroup = profile.querySelector(".profile__group");
// Next is the form submit handler, though
// it won't submit anywhere just yet

// Note that the function name starts with a verb
// and describes exactly what the function does
function handleProfileFormSubmit(evt) {
    // This line stops the browser from 
    // submitting the form in the default way.
    evt.preventDefault();


    let newName = nameInput.value;
    let newGroup = groupInput.value;

    profileName.textContent = newName;
    profileGroup.textContent = newGroup;
    popup.classList.remove("popup_opened");

}

function handleProfileFormCancel(evt) {

    evt.preventDefault();
    popup.classList.remove("popup_opened");
}

function handleProfileFormOpen(evt) {

    evt.preventDefault();

    let currentName = profileName.textContent;

    let currentGroup = profileGroup.textContent;

    nameInput.value = currentName;
    groupInput.value = currentGroup;

    popup.classList.add("popup_opened");

}

formElement.addEventListener('submit', handleProfileFormSubmit);
formElement.addEventListener('reset', handleProfileFormCancel);
editButton.addEventListener("click", handleProfileFormOpen);