import Popup from "./Popup.js";

class PopupWithImage extends Popup {
  constructor(selector) {
    super(selector);
  }
  open(name, link) {
    super.open();
    this._selector.querySelector(".popup__image").src = link;
    this._selector.querySelector(".popup__image").alt = name;
    this._selector.querySelector(".popup__caption").textContent = name;
  }
}

export default PopupWithImage;
