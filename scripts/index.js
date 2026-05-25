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

const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__close");
const closeButtonNewProfile = document.querySelector(
  "#new-card-popup > .popup__content > .popup__close",
);
const profileAddButton = document.querySelector(".profile__add-button");
const editModal = document.querySelector("#edit-popup");
const newProfile = document.querySelector("#new-card-popup");
const containerCard = document.querySelector(".cards__list");
const createCardButton = document.querySelector(
  "#new-card-form > .popup__button",
);
const imageModal = document.querySelector("#image-popup");
const imageModalCloseBtn = imageModal.querySelector(".popup__close");

enableValidation(editModal);
enableValidation(newProfile);

createCardButton.addEventListener("click", (evt) => {
  handleCardFormSubmit(evt);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();

  const nameInput = document.querySelector(
    ".popup__input_type_card-name",
  ).value;
  const urlInput = document.querySelector(".popup__input_type_url").value;

  renderCard(nameInput, urlInput, containerCard, "prepend");

  closeModal(newProfile);
}

profileAddButton.addEventListener("click", () => {
  const elements = newProfile.querySelectorAll(".popup__input");
  elements.forEach((el) => {
    el.value = "";
  });
  const button = newProfile.querySelector(".popup__button");
  button.setAttribute("disabled", "");
  openModal(newProfile);
});

closeButtonNewProfile.addEventListener("click", () => {
  closeModal(newProfile);
});

initialCards.forEach(function (item) {
  renderCard(item[0], item[1], containerCard, "append");
});

function getCardElement(name, link) {
  if (name === undefined) {
    name = "Lugar sem nome";
  }

  if (link === undefined) {
    link = "./images/placeholder.jpg";
  }

  const cardTemplate = document
    .querySelector("#card__template")
    .content.querySelector(".card")
    .cloneNode(true);
  const image = cardTemplate.querySelector(".card__image");
  const title = cardTemplate.querySelector(".card__title");

  image.src = link;
  image.alt = name;
  title.textContent = name;

  const likeButton = cardTemplate.querySelector(".card__like-button");
  likeButton.addEventListener("click", (evt) => {
    handleLikeBtnColorChange(evt);
  });

  const deleteButton = cardTemplate.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => {
    handleDeleteCard(cardTemplate);
  });

  image.addEventListener("click", () => {
    openModal(imageModal);
    imageModal.querySelector(".popup__image").setAttribute("src", image.src);
    imageModal
      .querySelector(".popup__image")
      .setAttribute("alt", title.textContent);
    imageModal.querySelector(".popup__caption").textContent = title.textContent;
  });

  imageModalCloseBtn.addEventListener("click", () => {
    closeModal(imageModal);
  });

  return cardTemplate;
}

function handleDeleteCard(cardTemplate) {
  cardTemplate.remove();
}

function handleLikeBtnColorChange(button) {
  button.target.classList.toggle("card__like-button_is-active");
}

function renderCard(name, link, containerCard, method) {
  const cardTemplate = getCardElement(name, link);
  cardTemplate.querySelector(".card__image").src = link;
  cardTemplate.querySelector(".card__title").textContent = name;
  containerCard[method](cardTemplate);
}

function openModal(element) {
  element.classList.add("popup_is-opened");
  enableEscBtn(element);
  fillProfileForm();
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  resetFormError(element);
  disableEscBtn(element);
}

function addOverlayCloseHandler(popup) {
  popup.addEventListener("click", (event) => {
    if (event.target === popup) {
      closeModal(popup);
    }
  });
}

function resetFormError(element) {
  element.querySelectorAll(".popup__input-error_active").forEach((el) => {
    el.classList.remove("popup__input-error_active");
  });

  element.querySelectorAll(".popup__input").forEach((el) => {
    el.classList.remove("popup__input_type_error");
  });
}

addOverlayCloseHandler(editModal);
addOverlayCloseHandler(newProfile);
addOverlayCloseHandler(imageModal);

let currentOpenModal = null;

function handleEscModal(event) {
  if (event.key === "Escape" && currentOpenModal) {
    closeModal(currentOpenModal);
  }
}

function enableEscBtn(popup) {
  currentOpenModal = popup;
  document.addEventListener("keydown", handleEscModal);
}

function disableEscBtn() {
  currentOpenModal = null;
  document.removeEventListener("keydown", handleEscModal);
}

editButton.addEventListener("click", () => {
  handleOpenEditModal();
});

closeButton.addEventListener("click", () => {
  closeModal(editModal);
});

const titleName = document.querySelector(".profile__title").textContent;
const description = document.querySelector(".profile__description").textContent;

function fillProfileForm() {
  document.querySelector(".popup__input_type_name").value = titleName;
  document.querySelector(".popup__input_type_description").value = description;
}

function handleOpenEditModal() {
  openModal(editModal);
  fillProfileForm();
}

const formElement = document.querySelector(".popup__form");
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

formElement.addEventListener("submit", handleProfileFormSubmit);
