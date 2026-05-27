class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  setEventListeners() {
    const inputs = this._formElement.querySelectorAll(
      this._config.inputSelector,
    );

    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
        } else {
          this._hideInputError(input, this._formElement);
        }
      });
    });

    this._formElement.addEventListener("submit", (event) => {
      let formValid = true;

      inputs.forEach((input) => {
        if (!input.validity.valid) {
          this._showInputError(input, input.validationMessage);
          formValid = false;
        }
      });

      if (!formValid) {
        event.preventDefault();
      }
    });
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );
    const button = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
    button.setAttribute("disabled", "");
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `.${inputElement.id}-input-error`,
    );
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(this._config.errorClass);

    const button = this._formElement.querySelector(
      this._config.submitButtonSelector,
    );
    let allValid = true;

    this._formElement
      .querySelectorAll(this._config.inputSelector)
      .forEach((input) => {
        if (!input.validity.valid) {
          allValid = false;
        }
      });

    if (allValid) {
      button.removeAttribute("disabled");
    }
  }
}

export { FormValidator };
