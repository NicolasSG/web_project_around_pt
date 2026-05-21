function showInputError(inputElement, errorMessage, form) {
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  const button = form.querySelector(".popup__button");
  inputElement.classList.add("popup__input_type_error");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("popup__input-error_active");
  button.setAttribute("disabled", "");
}

function hideInputError(inputElement, form) {
  const errorElement = form.querySelector(`.${inputElement.id}-input-error`);
  inputElement.classList.remove("popup__input_type_error");
  errorElement.textContent = "";
  errorElement.classList.remove("popup__input-error_active");

  const button = form.querySelector(".popup__button");
  let allValid = true;

  form.querySelectorAll(".popup__input").forEach((input) => {
    if (!input.validity.valid) {
      allValid = false;
    }
  });

  if (allValid) {
    button.removeAttribute("disabled");
  }
}

function enableValidation(popup) {
  const inputs = popup.querySelectorAll(".popup__input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage, popup);
      } else {
        hideInputError(input, popup);
      }
    });
  });

  popup.addEventListener("submit", (event) => {
    let formValid = true;

    inputs.forEach((input) => {
      if (!input.validity.valid) {
        showInputError(input, input.validationMessage, popup);
        formValid = false;
      }
    });

    if (!formValid) {
      event.preventDefault();
    }
  });
}
