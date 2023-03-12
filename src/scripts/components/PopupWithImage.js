import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({selector}) {
    super({selector});
    this._popupImage = this._popup.querySelector('.popup__image');
    this._popupImageCaption = this._popup.querySelector('.popup__image-caption');
  }

  open(title, link) {
    this._popupImage.src = link;
    this._popupImage.alt = title;
    this._popupImageCaption.textContent = title; 
    super.open();
  }

}
