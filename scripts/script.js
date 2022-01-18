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
const popup = document.querySelector(".popup");
const elements = document.querySelector(".elements");
//--
//Forms
//--
const formElement = document.querySelector(".edit-profile-form");

//--
//Form Elements (labels, fields and buttons)
//--
const editButton = profile.querySelector(".profile__edit-btn");
const cancelButton = formElement.querySelector(".edit-profile-form__cancel");
const nameInput = formElement.querySelector(".edit-profile-form__field_type_name");
const groupInput = formElement.querySelector(".edit-profile-form__field_type_group");

//--
//Page Elements /DOM Nodes used in code
//--

const profileName = profile.querySelector(".profile__name");
const profileGroup = profile.querySelector(".profile__group");

//--
//Functions
//--
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
    popup.classList.remove("popup_opened");

}

function handleProfileFormCancel() {
    //alert("close form?");
    popup.classList.remove("popup_opened");
}

function handleProfileFormOpen() {
    //alert("open form?");
    let currentName = profileName.textContent;
    let currentGroup = profileGroup.textContent;

    nameInput.value = currentName;
    groupInput.value = currentGroup;

    popup.classList.add("popup_opened");

}

//--
//Event listeners
//--

formElement.addEventListener('submit', handleProfileFormSubmit);
cancelButton.addEventListener('click', handleProfileFormCancel);
editButton.addEventListener("click", handleProfileFormOpen);