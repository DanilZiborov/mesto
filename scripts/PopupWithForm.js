import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ selector, submitHandler }) {
    super({ selector });
    this._submitHandler = submitHandler;
  }

  _getInputValues() {

    this.formValues = {};
    this.inputList.forEach(input => this.formValues[input.name] = input.value);

    return this.formValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }


  setEventListeners() { //тут важно, чтобы вначале срабатывал set ev listeners родителя, т.к там инициализируется this._popup
    super.setEventListeners();
    this.inputList = Array.from(this._popup.querySelectorAll('.popup__input'));
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitHandler();
    })
  }

}
