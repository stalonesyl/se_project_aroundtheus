import Popup from "./Popup.js";

// Extending Popup class to include image functionality
export default class PopupWithImage extends Popup {
  // Constructor for the PopupWithImage class
  constructor({ popupSelector }) {
    // Call the parent constructor and pass the selector
    super({ popupSelector });
  }

  // Method to open the popup with image and name
  open({ link, name }) {
    // Select the footer element and set its text content to the name
    this._popupElement.querySelector(".modal__preview-footer").textContent = name;
    
    // Select the image element
    const image = this._popupElement.querySelector(".modal__preview-image");
    
    // Set the source and alt attributes of the image
    image.src = link;
    image.alt = name;
    
    // Call the parent open method
    super.open();
  }
}
