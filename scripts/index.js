import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithconfirmation.js";

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1/",
  headers: {
    authorization: "615e1cfc-1d22-4c51-90e7-1a164d8c7a5a",
    "Content-Type": "application/json",
  },
});

api
  .getInitialCards()
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // registra o erro no console
  });

api
  .editCard(
    "Marie Skłodowska Curie",
    "Profissional de Física e Profissional de Química",
  )
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // registra o erro no console
  });

api
  .newCard(
    "novo nome",
    "https://therian-heaven.vercel.app/assets/therian14-Dfr_iaHX.png",
  )
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err); // registra o erro no console
  });

const editButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editForm = document.querySelector("#edit-profile-form");
const newCardForm = document.querySelector("#new-card-form");

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional da Vanoise ",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_active",
};

const userInfo = new UserInfo({
  userNameSelector: ".profile__title",
  userJobSelector: ".profile__description",
});

const imagePopup = new PopupWithImage("#image-popup");
imagePopup.setEventListeners();

function handleCardClick(name, link) {
  imagePopup.open(name, link);
}

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.link,
        "#card__template",
        handleCardClick,
      );
      cardsList.addItem(card.getCardElement());
    },
  },
  ".cards__list",
);
cardsList.renderItems();

const editPopup = new PopupWithForm((inputValues) => {
  userInfo.setUserInfo({
    name: inputValues.name,
    job: inputValues.description,
  });
  editPopup.close();
}, "#edit-popup");
editPopup.setEventListeners();

const newCardPopup = new PopupWithForm((inputValues) => {
  const card = new Card(
    inputValues["place-name"],
    inputValues.link,
    "#card__template",
    handleCardClick,
  );
  cardsList.addItem(card.getCardElement());
  newCardPopup.close();
}, "#new-card-popup");
newCardPopup.setEventListeners();

const editFormValidator = new FormValidator(validationConfig, editForm);
editFormValidator.setEventListeners();

const newCardFormValidator = new FormValidator(validationConfig, newCardForm);
newCardFormValidator.setEventListeners();

editButton.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  editForm.querySelector(".popup__input_type_name").value = name;
  editForm.querySelector(".popup__input_type_description").value = job;
  editPopup.open();
});

profileAddButton.addEventListener("click", () => {
  newCardPopup.open();
});

const confirmationPopup = new PopupWithConfirmation("#confirmation-popup");
confirmationPopup.setEventListeners();
