// Let's find the form in the DOM
let formElement = document.querySelector(".edit-profile-form"); // Use the querySelector() method
let profile = document.querySelector(".profile");
let editButton = profile.querySelector(".profile__edit-btn");
let overlay = profile.querySelector(".profile__overlay")
    // Next is the form submit handler, though
    // it won't submit anywhere just yet

// Note that the function name starts with a verb
// and describes exactly what the function does
function handleProfileFormSubmit(evt) {
    // This line stops the browser from 
    // submitting the form in the default way.
    evt.preventDefault();
    // Having done so, we can define our own way of submitting the form.
    // We'll explain it in more detail later.

    // Let's find the form fields in the DOM
    let nameInput = formElement.querySelector(".edit-profile-form__name"); // Use querySelector()
    let groupInput = formElement.querySelector(".edit-profile-form__group"); // Use querySelector()

    // Get the values of each field from the corresponding value property
    let newName = nameInput.value;
    let newGroup = groupInput.value;
    // Select elements where the field values will be entered
    let profileName = profile.querySelector(".profile__name");
    let profileGroup = profile.querySelector(".profile__group");
    // Insert new values using the textContent 
    // property of the querySelector() method
    profileName.textContent = newName;
    profileGroup.textContent = newGroup;
    formElement.style.visibility = "hidden";
    overlay.style.visibility = "hidden";

}

// Connect the handler to the form:
// it will watch the submit event
formElement.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormOpen(evt) {
    evt.preventDefault();
    let profileName = profile.querySelector(".profile__name");
    let profileGroup = profile.querySelector(".profile__group");
    let currentName = profileName.textContent;
    let currentGroup = profileGroup.textContent;
    let nameInput = formElement.querySelector(".edit-profile-form__name");
    let groupInput = formElement.querySelector(".edit-profile-form__group");
    nameInput.value = currentName;
    groupInput.value = currentGroup;
    overlay.style.visibility = "visible";
    formElement.style.visibility = "visible";

}
editButton.addEventListener("click", handleProfileFormOpen);