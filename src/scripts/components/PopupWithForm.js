import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitHandler }) {
    super({ selector });
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this.formValues = {};
    this._inputsList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._inputsList.forEach(input => this.formValues[input.name] = input.value);

    return this.formValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }


  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitHandler();
    })
  }

}
