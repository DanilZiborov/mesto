export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.add(this._config.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
    inputElement.classList.remove(this._config.inputErrorClass);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  }

  _hasInvalidInput() {
    return this._inputsList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableSubmitButton()
    }
    else {
      this._enableSubmitButton()
    }
  }

  _setEventListeners() {
    this._inputsList = Array.from(this._formElement.querySelectorAll(this._config.inputSelector));
    this._inputsList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  };

  disableSubmitButton() {
    this._buttonElement = this._formElement.querySelector(this._config.submitButtonSelector);
    this._buttonElement.classList.add(this._config.inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', '');
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._config.inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled', '');
  }

  // Создаю публичный универсальный метод очистки ошибок валидации
  clearErrorMessage() {
    const allinputs = this._formElement.querySelectorAll('.popup__input');
    allinputs.forEach(input => {
      this._hideInputError(input);
    });
  }

  enableValidation() {
    this.disableSubmitButton();
    this._setEventListeners();
  }
}
