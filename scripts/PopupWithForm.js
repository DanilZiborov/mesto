import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(selector, submitHandler) {
    super(selector);
    this._submitHandler = submitHandler;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');

    const formValuesObject = {};
    this._inputList.forEach(input => formValuesObject[input.name] = input.value);
    this.formValues = [formValuesObject];

    return this.formValues;
  }

  close() {
    this._popupForm.reset();
    super.close();
  }


  setEventListeners() { //тут важно, чтобы вначале срабатывал set ev listeners родителя, т.к там инициализируется this._popup
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._getInputValues();
      this._submitHandler();
    })
// тут надо перезаписать родительский метод. добавлять не только обработчик клика, но и обработчик сабмита
  }

}
