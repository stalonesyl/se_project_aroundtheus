// ------------------------ IMPORTS ------------------------
import { openModal } from "../pages/index.js";

// ------------------------ CONSTANTS ------------------------
// DOM elements for image preview modal
const previewImageModal = document.querySelector("#preview-image-modal");
const modalImage = previewImageModal.querySelector(".modal__preview-image");
const modalCaption = previewImageModal.querySelector(".modal__preview-title");

// ------------------------ CARD CLASS ------------------------
export default class Card {
  constructor(cardData, cardSelector) {
    this._name = cardData.name;
    this._link = cardData.link;
    this._cardSelector = cardSelector;
  }

  // Private method to get the card template from HTML
  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card__list-item")
      .cloneNode(true);
  }

  // Private method to fill the card with data
  _fillCardData() {
    this._cardImage.alt = this._name;
    this._cardImage.src = this._link;
    this._cardTitle.textContent = this._name;
  }

  // Private method to set up the event listeners for card actions
  _setEventListeners() {
    this._likeButton.addEventListener("click", () => this._handleLikeIcon());
    this._deleteButton.addEventListener("click", () => this._handleDeleteCard());
    this._cardImage.addEventListener("click", () => this._handlePreviewPicture());
  }

  // Private method to handle the like icon toggle
  _handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  // Private method to handle card deletion
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Private method to handle the image preview
  _handlePreviewPicture() {
    openModal(previewImageModal);
    modalImage.src = this._cardImage.src;
    modalImage.alt = this._cardImage.alt;
    modalCaption.textContent = this._cardTitle.textContent;
  }

  // Public method to get the card's view for rendering
  getView() {
    this._cardElement = this._getTemplate();
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._deleteButton = this._cardElement.querySelector(".card__delete-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._cardTitle = this._cardElement.querySelector(".card__title");

    this._fillCardData();
    this._setEventListeners();

    return this._cardElement;
  }
}
