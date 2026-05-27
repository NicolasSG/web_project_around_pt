let currentOpenModal = null;

function openModal(element) {
  element.classList.add("popup_is-opened");
  enableEscBtn(element);
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

export {
  openModal,
  closeModal,
  addOverlayCloseHandler,
  resetFormError,
  enableEscBtn,
  disableEscBtn,
};
