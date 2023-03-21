import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor({ selector, submitHandler }) {
    super({ selector });
    this._submitHandler = submitHandler;
  }

  getCard(card) {
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm = this._popup.querySelector('.popup__form');
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitHandler(this._card);
    })
  }

}
