import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import "../pages/index.css";
import {
  initialCards,
  profileEditButton,
  profileAddButton,
  profileEditModal,
  addCardModal,
  previewImageModal,
  profileModalCloseButton,
  addCardModalCloseButton,
  previewModalCloseButton,
  profileTitle,
  profileDescription,
  modalTitleInput,
  modalDescriptionInput,
  profileEditForm,
  addCardForm,
  cardListEl,
  cardTemplate,
  cardTitleInput,
  cardUrlInput,
  previewImage,
  previewFooter,
  formValidationConfig,
} from "../utils/constants.js";

// New Card

function createCard({ name, link }) {
  const cardElement = new Card(
    { name, link },
    "#card-template",
    ({ name, link }) => {
      previewImagePopup.open({ name, link });
    }
  );
  return cardElement.getView();
}

// Preview Popup

const previewImagePopup = new PopupWithImage({
  popupSelector: "#preview-modal",
});
previewImagePopup.setEventListeners();

//Profile Popup

const newUser = new UserInfo(".profile__title", ".profile__description");

function handleProfileEditSubmit({ title, description }) {
  newUser.setUserInfo(title, description);
  profilePopup.close();
}

const profilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
profilePopup.setEventListeners();

profileEditButton.addEventListener("click", () => {
  const userData = newUser.getUserInfo();
  modalTitleInput.value = userData.name;
  modalDescriptionInput.value = userData.profession;
  profilePopup.open();
});

// Validation

const addFormValidator = new FormValidator(formValidationConfig, addCardForm);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(
  formValidationConfig,
  profileEditForm
);
editFormValidator.enableValidation();

export { previewImage, previewFooter, previewImageModal };

//Section

const cardListSelector = ".cards__list";
const cardListSection = new Section(
  {
    items: initialCards,
    renderer: ({ name, link }) => {
      const newCard = createCard({ name, link });
      cardListSection.addItem(newCard);
    },
  },
  cardListSelector
);

cardListSection.renderItems();

// Add Card Popup

const addCardPopup = new PopupWithForm("#add-card-modal", (inputValues) => {
  const newCard = createCard(inputValues, cardListEl);
  cardListSection.prependItem(newCard);
  addCardPopup.close();
});
addCardPopup.setEventListeners();

profileAddButton.addEventListener("click", () => {
  addFormValidator.resetValidation();
  addCardPopup.open();
});
