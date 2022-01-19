const initialCards = [{
        name: "Yosemite Valley",
        link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
    },
    {
        name: "Lake Louise",
        link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
    },
    {
        name: "Bald Mountains",
        link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
    },
    {
        name: "Latemar",
        link: "https://code.s3.yandex.net/web-code/latemar.jpg"
    },
    {
        name: "Vanoise National Park",
        link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
    },
    {
        name: "Lago di Braies",
        link: "https://code.s3.yandex.net/web-code/lago.jpg"
    }
];
//--
//Direct from the DOM
//--
const profile = document.querySelector(".profile");
const profileFormPopup = document.querySelector(".edit-profile-form").parentElement.parentElement;
const placeFormPopup = document.querySelector(".add-place-form").parentElement.parentElement;
const elements = document.querySelector(".elements");
//--
//Forms
//--
const profileForm = document.querySelector(".edit-profile-form");
const placeForm = document.querySelector(".add-place-form");

//--
//Form Elements (labels, fields and buttons)
//--
const editButton = profile.querySelector(".profile__edit-btn");
const addButton = profile.querySelector(".profile__add-btn");
const cancelButtonProfile = profileForm.querySelector(".edit-profile-form__cancel");
const nameInput = profileForm.querySelector(".edit-profile-form__field_type_name");
const groupInput = profileForm.querySelector(".edit-profile-form__field_type_group");
const titleInput = placeForm.querySelector(".add-place-form__field_type_title");
const linkInput = placeForm.querySelector(".add-place-form__field_type_link");
const cancelButtonPlace = placeForm.querySelector(".add-place-form__cancel");

//--
//Page Elements /DOM Nodes used in code
//--

const profileName = profile.querySelector(".profile__name");
const profileGroup = profile.querySelector(".profile__group");

//--
//Functions
//--

function deleteElement(card) {
    card.remove();
}

function createElement(card) {
    const elementTemplate = document.querySelector("#element").content.querySelector(".element");
    const element = elementTemplate.cloneNode(true);
    const deleteBtn = element.querySelector(".element__delete-btn")
    const title = element.querySelector(".element__image-title");
    const image = element.querySelector(".element__image");
    const likeBtn = element.querySelector(".element__like-toggle");

    title.textContent = card.name;
    image.src = card.link;
    image.alt = card.name;

    deleteBtn.addEventListener("click", function(evt) {
        const elementToDel = evt.path[1];
        console.log(elementToDel)
        deleteElement(elementToDel);
    })
    likeBtn.addEventListener("click", () => {
        likeBtn.classList.toggle("element__like-toggle-active");
    })

    return element;

}

function renderElement(card, container) {
    container.append(card);
}

initialCards.forEach(function(card) {
        const newElement = createElement(card);
        renderElement(newElement, elements);
    })
    // Note that the function name starts with a verb
    // and describes exactly what the function does
function handleProfileFormSubmit(evt) {
    // This line stops the browser from 
    // submitting the form in the default way.
    evt.preventDefault();
    //alert("save form?");

    let newName = nameInput.value;
    let newGroup = groupInput.value;

    profileName.textContent = newName;
    profileGroup.textContent = newGroup;
    closePopup(evt.path[2]);
}

function closePopup(popup) {
    //console.log(popup);
    popup.classList.remove("popup_opened");

}

function handleFormCancel(evt) {
    if (titleInput.value !== "" || linkInput.value !== "") {
        titleInput.value = "";
        linkInput.value = "";
    }
    closePopup(evt.path[3]);
}

function openPopup(popup) {
    popup.classList.add("popup_opened");
}

function handleProfileFormOpen() {
    //alert("open form?");
    let currentName = profileName.textContent;
    let currentGroup = profileGroup.textContent;

    nameInput.value = currentName;
    groupInput.value = currentGroup;

    openPopup(profileFormPopup);

}

function handlePlaceFormOpen() {
    openPopup(placeFormPopup);
}

function handlePlaceFormSubmit(evt) {
    // This line stops the browser from 
    // submitting the form in the default way.
    evt.preventDefault();
    let newTitle = titleInput.value;
    let newLink = linkInput.value;
    const newCard = {
        name: newTitle,
        link: newLink
    }
    titleInput.value = "";
    linkInput.value = "";
    const newElement = createElement(newCard);
    renderElement(newElement, elements);
    closePopup(evt.path[2]);
}

//--
//Event listeners
//--

profileForm.addEventListener('submit', handleProfileFormSubmit);
placeForm.addEventListener('submit', handlePlaceFormSubmit);
cancelButtonProfile.addEventListener('click', handleFormCancel);
cancelButtonPlace.addEventListener('click', handleFormCancel);
editButton.addEventListener("click", handleProfileFormOpen);
addButton.addEventListener("click", handlePlaceFormOpen);