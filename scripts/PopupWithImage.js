import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({selector}) {
    super({selector});
  }

  open(evt) {
    const popupImage = this._popup.querySelector('.popup__image');
    const popupImageCaption = this._popup.querySelector('.popup__image-caption');
    popupImage.src = evt.target.src;
    popupImage.alt = evt.target.parentElement.querySelector('.card__title').textContent;
    popupImageCaption.textContent = evt.target.parentElement.querySelector('.card__title').textContent;
    super.open();
  }


}
