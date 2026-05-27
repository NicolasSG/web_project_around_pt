import { openModal, closeModal, addOverlayCloseHandler } from "./utils.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const closeButtonNewProfile = document.querySelector(
  "#new-card-popup > .popup__content > .popup__close",
);
const profileAddButton = document.querySelector(".profile__add-button");
const editModal = document.querySelector("#edit-popup");
const newProfile = document.querySelector("#new-card-popup");
const containerCard = document.querySelector(".cards__list");
const newCardForm = document.querySelector("#new-card-form");
const imageModal = document.querySelector("#image-popup");
const imageModalCloseBtn = imageModal.querySelector(".popup__close");
const editForm = document.querySelector("#edit-profile-form");

const initialCards = [
  ["Vale de Yosemite", "https://code.s3.yandex.net/web-code/yosemite.jpg"],
  ["Lago Louise", "https://code.s3.yandex.net/web-code/lake-louise.jpg"],
  [
    "Montanhas Carecas",
    "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  ],
  ["Latemar", "https://code.s3.yandex.net/web-code/latemar.jpg"],
  [
    "Parque Nacional da Vanoise",
    "https://code.s3.yandex.net/web-code/vanoise.jpg",
  ],
  ["Lago di Braies", "https://code.s3.yandex.net/web-code/lago.jpg"],
];

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.setEventListeners();

addOverlayCloseHandler(editModal);
addOverlayCloseHandler(newProfile);
addOverlayCloseHandler(imageModal);

function handleImagePreview(name, link) {
  openModal(imageModal);
  imageModal.querySelector(".popup__image").src = link;
  imageModal.querySelector(".popup__image").alt = name;
  imageModal.querySelector(".popup__caption").textContent = name;
}

initialCards.forEach(([name, link]) => {
  const card = new Card(name, link, "#card__template", handleImagePreview);
  containerCard.append(card.getCardElement());
});

function fillProfileForm() {
  const titleName = document.querySelector(".profile__title").textContent;
  const description = document.querySelector(
    ".profile__description",
  ).textContent;
  document.querySelector(".popup__input_type_name").value = titleName;
  document.querySelector(".popup__input_type_description").value = description;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = document.querySelector(".popup__input_type_name").value;
  const jobInput = document.querySelector(
    ".popup__input_type_description",
  ).value;
  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;
  closeModal(editModal);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const nameInput = newCardForm.querySelector(
    ".popup__input_type_card-name",
  ).value;
  const urlInput = newCardForm.querySelector(".popup__input_type_url").value;
  const card = new Card(
    nameInput,
    urlInput,
    "#card__template",
    handleImagePreview,
  );
  containerCard.prepend(card.getCardElement());
  closeModal(newProfile);
}

editButton.addEventListener("click", () => {
  openModal(editModal);
  fillProfileForm();
});

closeButton.addEventListener("click", () => closeModal(editModal));

closeButtonNewProfile.addEventListener("click", () => closeModal(newProfile));

imageModalCloseBtn.addEventListener("click", () => closeModal(imageModal));

profileAddButton.addEventListener("click", () => {
  newProfile.querySelectorAll(".popup__input").forEach((el) => {
    el.value = "";
  });
  newProfile.querySelector(".popup__button").setAttribute("disabled", "");
  openModal(newProfile);
});

editForm.addEventListener("submit", handleProfileFormSubmit);
newCardForm.addEventListener("submit", handleCardFormSubmit);
