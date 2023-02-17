export default class Card {
  constructor(title, image, templateSelector) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector(this._templateSelector).cloneNode(true);
    return cardElement;
  }

  _showImagePopup() {
    popupImage.src = this._image;
    popupImage.alt = this._title;
    popupImageCaption.textContent = this._title;
    openPopup(popupTypeImage);
  }

  _toggleLike() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  };

  _addEventListeners() {

    //Создаю ещё два приватных свойства и очищаю обработчики лайка и удаления карточки от event
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._element
      .querySelector('.card__image')
      .addEventListener('click', () => {
        this._showImagePopup()
      });

    this._likeButton
      .addEventListener('click', () => {
        this._toggleLike()
      });

    this._deleteButton
      .addEventListener('click', () => {
        this._deleteCard()
      });
  }


  generateCard() {
    this._element = this._getTemplate();
    this._addEventListeners();

    this._element.querySelector('.card__title').textContent = this._title;
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._title;


    return this._element;
  }

  logGlobalconst() {
    console.log(popups);
  }

}


