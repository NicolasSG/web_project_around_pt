let initialCards = [
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

initialCards.forEach(function (item) {
  console.log(item);
});

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

createCardButton.addEventListener("click", (evt) => {
  handleCardFormSubmit(evt);
});

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  console.log(evt);

  let nameInput = document.querySelector(".popup__input_type_card-name").value;
  let urlInput = document.querySelector(".popup__input_type_url").value;

  renderNewCard(nameInput, urlInput, containerCard);

  closeModal(newProfile);
}

profileAddButton.addEventListener("click", () => {
  openModal(newProfile);
});

closeButtonNewProfile.addEventListener("click", () => {
  closeModal(newProfile);
});

initialCards.forEach(function (item) {
  renderCard(item[0], item[1], containerCard);
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
    imageModal.classList.toggle("popup_is-opened");
    imageModal.querySelector(".popup__image").setAttribute("src", image.src);
    imageModal
      .querySelector(".popup__image")
      .setAttribute("alt", title.textContent);
    imageModal.querySelector(".popup__caption").textContent = title.textContent;
  });

  imageModalCloseBtn.addEventListener("click", () => {
    imageModal.classList.remove("popup_is-opened");
  });

  return cardTemplate;
}

function handleDeleteCard(cardTemplate) {
  cardTemplate.remove();
}

function handleLikeBtnColorChange(button) {
  button.target.classList.toggle("card__like-button_is-active");
}

function renderNewCard(name, link, containerCard) {
  const cardTemplate = getCardElement(name, link);
  cardTemplate.querySelector(".card__image").src = link;
  cardTemplate.querySelector(".card__title").textContent = name;
  containerCard.prepend(cardTemplate);
}

function renderCard(name, link, containerCard) {
  const cardTemplate = getCardElement(name, link);
  cardTemplate.querySelector(".card__image").src = link;
  cardTemplate.querySelector(".card__title").textContent = name;
  containerCard.append(cardTemplate);
}

function openModal(element) {
  element.classList.add("popup_is-opened");
  fillProfileForm();
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
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

// Vamos encontrar o formulário no DOM
let formElement = document.querySelector(".popup__form");

// Em seguida, criamos o manipulador (handler) do evento submit
// (não se preocupe, ainda não enviaremos nada de fato)

// Observe que o nome da função começa com um verbo
// e descreve exatamente o que a função faz

function handleProfileFormSubmit(evt) {
  // Esta linha impede o navegador
  // de enviar o formulário da forma padrão.
  evt.preventDefault();
  // Fazendo isso, podemos definir nossa própria forma de enviar o formulário.
  // Explicaremos em mais detalhes posteriormente.

  // Vamos encontrar os campos de formulário do DOM
  let nameInput = document.querySelector(".popup__input_type_name").value;
  let jobInput = document.querySelector(".popup__input_type_description").value;

  // Pegue os valores de cada campo do valor da propriedade correspondente

  // Selecionamos os elementos da página onde esses valores serão exibidos
  document.querySelector(".profile__title").textContent = nameInput;
  document.querySelector(".profile__description").textContent = jobInput;

  // Insira novos valores usando a propriedade textContent
  // propriedade dos elementos selecionados
  closeModal(editModal);
}

// Conecta o manipulador ao formulário:
// ele ficará de olho no evento de submit
formElement.addEventListener("submit", handleProfileFormSubmit);
