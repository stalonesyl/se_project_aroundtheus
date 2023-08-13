import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
];

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input_error",
};

// ------------------------ VARIABLES ------------------------
// DOM elements for card operations
const cardsWrap = document.querySelector(".card__list");

// DOM elements for modals
const profileEditButton = document.querySelector("#profile-edit-button");
const addCardButton = document.querySelector("#add-card-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const closeButtons = document.querySelectorAll(".modal__close");

// DOM elements for profile editing
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector("#profile-description-input");
const profileEditForm = document.forms["edit-card-form"];

// DOM elements for card addition
const addCardTitleInput = document.querySelector("#add-card-title-input");
const addCardURLInput = document.querySelector("#add-card-modal-URL");
const addCardModalForm = document.forms["add-card-form"];

// Form validation instances
const editFormValidator = new FormValidator(config, profileEditForm);
const addFormValidator = new FormValidator(config, addCardModalForm);

// ------------------------ FUNCTIONS ------------------------

// Function to open a modal
function openModal(modal) {
  modal.classList.add("modal__open");
  document.addEventListener("keydown", closeModalEscKey);
  modal.addEventListener("mousedown", closeModalClick);
}

// Function to close a modal
function closeModal(modal) {
  modal.classList.remove("modal__open");
  document.removeEventListener("keydown", closeModalEscKey);
  modal.removeEventListener("mousedown", closeModalClick);
}

// Function to generate a card
function createCard(cardData) {
  const newCard = new Card(cardData, "#card-template");
  return newCard;
}

// Function to render a card on the UI
function renderCard(cardData, wrapper) {
  const card = createCard(cardData);
  wrapper.prepend(card.getView());
}

// Event handlers
function handleProfileEditOpen() {
  openModal(profileEditModal);
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  editFormValidator.resetForm();
}

function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closeModal(profileEditModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = addCardTitleInput.value;
  const link = addCardURLInput.value;
  renderCard({ name, link }, cardsWrap);
  closeModal(addCardModal);
  addCardModalForm.reset();
}

function closeModalEscKey(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal__open");
    closeModal(openModal);
  }
}

function closeModalClick(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

// ------------------------ EVENT LISTENERS ------------------------

// Event listeners for profile editing
profileEditButton.addEventListener("click", handleProfileEditOpen);
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Event listeners for card addition
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  addCardModalForm.reset();
  addFormValidator.resetForm();
});
addCardModalForm.addEventListener("submit", handleAddCardSubmit);

// Event listeners for modal close operations
closeButtons.forEach((button) => {
  const modal = button.closest(".modal");
  button.addEventListener("click", () => closeModal(modal));
});

// Initial card rendering
initialCards.forEach((cardData) => renderCard(cardData, cardsWrap));

// Form validation initialization
editFormValidator.enableValidation();
addFormValidator.enableValidation();

// ------------------------ EXPORTS ------------------------
export { openModal };
