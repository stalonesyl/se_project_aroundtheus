export default class FormValidator {
  // Constructor for the FormValidator class
  constructor(config, formElement) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._formElement = formElement;
  }

  // Method to show input error
  _showInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.add(this._inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(this._errorClass);
  }

  // Method to hide input error
  _hideInputError(inputEl) {
    const errorMessageEl = this._formElement.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(this._inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(this._errorClass);
  }

  // Method to check input validity
  _checkInputValidity(inputEl) {
    !inputEl.validity.valid ? this._showInputError(inputEl) : this._hideInputError(inputEl);
  }

  // Method to reset validation
  resetValidation() {
    this._inputList.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this._toggleButtonState();
  }

  // Method to toggle button state
  _toggleButtonState() {
    this._buttonElement.classList.toggle(this._inactiveButtonClass, this._hasInvalidInput());
    this._buttonElement.disabled = this._hasInvalidInput();
  }

  // Method to check if there is any invalid input
  _hasInvalidInput() {
    return !this._inputList.every((inputEl) => inputEl.validity.valid);
  }

  // Method to set event listener
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._inputList.forEach((inputEl) => {
      inputEl.addEventListener("input", () => {
        this._checkInputValidity(inputEl);
        this._toggleButtonState();
      });
    });
  }

  // Method to enable validation
  enableValidation() {
    this._formElement.addEventListener("submit", (e) => e.preventDefault());
    this._setEventListeners();
  }
}
