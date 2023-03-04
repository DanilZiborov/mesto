export default class Popup {
  constructor(selector) {
    this._selector = selector;
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      const popupActive = document.querySelector('.popup_opened');
      popupActive.classList.remove('popup_opened');
    };
  }

  setEventListeners() {
    //записываем нужный нам попап в this._popup тут, т.к это метод, который мы по-любому будем вызывать первым в index.js

    this._popup = document.querySelector(this._selector);

    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.close();
      })

    this._popup
      .addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      })
  }

}
