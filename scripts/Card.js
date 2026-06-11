class Card {
  constructor(text, link, templateSelector, handleImageClick) {
    this._text = text;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
  }

  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  _handleLikeClick(evt) {
    evt.target.classList.toggle("card__like-button_is-active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImagePreview() {
    this._handleImageClick(this._text, this._link);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", (evt) => this._handleLikeClick(evt));

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => this._handleDeleteClick());

    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImagePreview());
  }

  getCardElement() {
    this._element = this._getTemplate();

    const image = this._element.querySelector(".card__image");
    const title = this._element.querySelector(".card__title");

    image.src = this._link;
    image.alt = this._text;
    title.textContent = this._text;

    this._setEventListeners();

    return this._element;
  }
}

export default Card;
