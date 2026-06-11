import Popup from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(handleFormSubmit, selector) {
    super(selector);
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues() {
    const inputs = this._selector.querySelectorAll(".popup__input");
    const values = {};
    inputs.forEach((input) => (values[input.name] = input.value));
    return values;
  }

  setEventListeners() {
    super.setEventListeners();
    this._selector.querySelector("form").addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._selector.querySelector("form").reset();
  }
}

export default PopupWithForm;
