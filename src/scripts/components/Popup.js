export default class Popup {
  constructor({selector}) {
    this._popup = document.querySelector(selector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keyup', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    };
  }

  setEventListeners() {
    this._popup.querySelector('.popup__close-button')
      .addEventListener('click', () => {
        this.close();
      });

    this._popup
      .addEventListener('click', (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      })
  }
}
