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
const profileAddButton = document.querySelector(".profile__add-button");
const editModal = document.querySelector("#edit-popup");

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
