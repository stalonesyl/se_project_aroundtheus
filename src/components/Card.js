export default class Card {
  // Constructor for the Card class
  constructor({ name, link }, cardSelector, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
  }

  // Method to set event listeners
  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".card__like-button");
    const deleteButton = this._cardElement.querySelector(".card__delete-button");

    likeButton.addEventListener("click", () => this._handleLikeIcon());
    deleteButton.addEventListener("click", () => this._handleDeleteCard());
    this._cardImageEl.addEventListener("click", () => this._handleImageClick({ name: this._name, link: this._link }));
  }

  // Method to handle like icon click
  _handleLikeIcon() {
    this._cardElement.querySelector(".card__like-button").classList.toggle("card__like-button_active");
  }

  // Method to handle delete card click
  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Method to get card template
  _getTemplate() {
    return document.querySelector(this._cardSelector).content.querySelector(".card").cloneNode(true);
  }

  // Method to get view of the card
  getView() {
    this._cardElement = this._getTemplate();
    this._cardImageEl = this._cardElement.querySelector(".card__image");
    this._cardTitleEl = this._cardElement.querySelector(".card__title");

    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.alt = this._name;
    this._cardImageEl.src = this._link;

    this._setEventListeners();

    return this._cardElement;
  }
}
