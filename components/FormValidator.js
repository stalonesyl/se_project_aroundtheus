export default class FormValidator {
    // ------------------------ CONSTRUCTOR ------------------------
    constructor(config, formEl) {
      this._inputSelector = config.inputSelector;
      this._submitButtonSelector = config.submitButtonSelector;
      this._inactiveButtonClass = config.inactiveButtonClass;
      this._inputErrorClass = config.inputErrorClass;
      this._errorClass = config.errorClass;
      this._form = formEl;
  
      this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
      this._submitButton = this._form.querySelector(this._submitButtonSelector);
    }
  
    // ------------------------ PRIVATE METHODS ------------------------
  
    // Show the error message for an input field
    _showInputError(inputEl) {
      const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.add(this._inputErrorClass);
      errorMessageEl.textContent = inputEl.validationMessage;
      errorMessageEl.classList.add(this._errorClass);
    }
  
    // Hide the error message for an input field
    _hideInputError(inputEl) {
      const errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
      inputEl.classList.remove(this._inputErrorClass);
      errorMessageEl.textContent = "";
      errorMessageEl.classList.remove(this._errorClass);
    }
  
    // Toggle the error message for an input field based on its validity
    _toggleInputError(inputEl) {
      if (!inputEl.validity.valid) {
        this._showInputError(inputEl);
      } else {
        this._hideInputError(inputEl);
      }
    }
  
    // Check if the form contains any invalid input fields
    _hasInvalidInput() {
      return !this._inputList.every((inputEl) => inputEl.validity.valid);
    }
  
    // Disable the submit button
    _disableButton() {
      this._submitButton.classList.add(this._inactiveButtonClass);
      this._submitButton.disabled = true;
    }
  
    // Enable the submit button
    _enableButton() {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.disabled = false;
    }
  
    // Toggle the state (enabled/disabled) of the submit button based on form validity
    _toggleButtonState() {
      if (this._hasInvalidInput()) {
        this._disableButton();
      } else {
        this._enableButton();
      }
    }
  
    // Attach event listeners to input fields and buttons
    _setEventListeners() {
      this._inputList.forEach((inputEl) => {
        inputEl.addEventListener("input", () => {
          this._toggleInputError(inputEl);
          this._toggleButtonState();
        });
      });
      this._toggleButtonState();
    }
  
    // ------------------------ PUBLIC METHODS ------------------------
  
    // Enable validation for the form
    enableValidation() {
      this._form.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners();
    }
  
    // Reset the form by hiding error messages and disabling the button
    resetForm() {
      this._disableButton();
      this._inputList.forEach((inputElement) => {
        this._hideInputError(inputElement);
      });
    }
  }
  