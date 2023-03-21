import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitHandler }) {
    super({ selector });
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this.formValues = {};
    this._inputList.forEach(input => this.formValues[input.name] = input.value);

    return this.formValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  // универсальный метод показа уведомления о процессе загрузки для всех попапов
  // сохраняем значение дефолтного текста кнопки заранее в блоке setEventListeners

  toggleLoader() {
    if (!this._submitButton.textContent.includes('...')) {
      this._submitButton.textContent = 'Сохранение...';
    }
    
    else this._submitButton.textContent = this._defaultsSubmitButtonText;
  }


  setEventListeners() {
    super.setEventListeners();
    this._inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button');
    this._defaultsSubmitButtonText = this._submitButton.textContent;
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitHandler();
    })
  }

}
