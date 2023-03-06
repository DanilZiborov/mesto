export default class Card {
  constructor({title, image, templateSelector, handleCardClick}) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector(this._templateSelector).cloneNode(true);
    return cardElement;
  }

  _toggleLike() {
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _deleteCard() {
    this._element.remove();
  };

  _addEventListeners() {
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._cardImage
      .addEventListener('click', (evt) => {
        this._handleCardClick(evt);
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

    this._cardImage.src = this._image;
    this._cardImage.alt = this._title;
    this._element.querySelector('.card__title').textContent = this._title;

    return this._element;
  }

}
