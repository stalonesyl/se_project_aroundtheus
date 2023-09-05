import Popup from "./Popup.js";

// Extending Popup class to include form functionality
export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // Call the parent constructor and pass the selector
    super({ popupSelector });
    // Get the form element from the popup
    this._popupForm = this._popupElement.querySelector(".modal__form");
    // Store the form submit handler
    this._handleFormSubmit = handleFormSubmit;
    // Get all input elements from the form
    this._inputList = Array.from(this._popupElement.querySelectorAll(".modal__input"));
  }

  // Method to get all input values from the form
  _getInputValues() {
    // Create an object to store the input values
    this._newData = {};
    // Iterate over all input elements and store their values
    this._inputList.forEach((inputElement) => {
      this._newData[inputElement.name] = inputElement.value;
    });
    // Return the object with input values
    return this._newData;
  }

  // Method to set event listeners for the form
  setEventListener() {
    // Call the parent method to set common event listeners
    super.setEventListeners();
    // Add submit event listener to the form
    this._popupForm.addEventListener("submit", (event) => {
      event.preventDefault();
      // Call the form submit handler with the input values
      this._handleFormSubmit(this._getInputValues());
      // Close the popup after form submission
      this.close();
    });
  }

  // Method to close the popup and reset the form
  close() {
    // Reset the form inputs
    this._popupForm.reset();
    // Call the parent method to close the popup
    super.close();
  }
}

