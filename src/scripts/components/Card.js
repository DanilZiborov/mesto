export default class Card {
  constructor({data, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick}) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._owner = data.owner;
    this._currentUserId = data.currentUserId;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._handleLikeClick = handleLikeClick;

    this._handleDeleteIconClick = this._handleDeleteIconClick.bind(this);
    this._handleLikeClick = this._handleLikeClick.bind(this);
  }

  _getTemplate() {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.querySelector(this._templateSelector).cloneNode(true);
    return cardElement;
  }

  _checkLike() {
    this._isLiked = this._likes.some(item => item._id === this._currentUserId);
  }

  toggleLike() {
    this._isLiked = !this._isLiked;
    this._likeButton.classList.toggle('card__like-button_active');
  }

  _addEventListeners() {
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._likeButton = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._deleteButton = this._element.querySelector('.card__delete-button');

    this._cardImage
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });

    this._likeButton
      .addEventListener('click', () => {
        // в качестве аргументов передаю в обработчик лайка элемент счётчика лайков, айди текущей карточки и состояние лайка
        this._handleLikeClick({likeCounter: this._likeCounter, cardId: this._id, isLiked: this._isLiked});
      });

    this._deleteButton
      .addEventListener('click', () => {
        this._handleDeleteIconClick(this._element);
      });
  }

  generateCard() {
    this._element = this._getTemplate();

    this._addEventListeners();
    this._element.id = this._id;

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeCounter.textContent = this._likes.length;

    this._checkLike();

    if (this._isLiked) {
      this._likeButton.classList.add('card__like-button_active');
    }

    if (this._currentUserId !== this._owner._id) {
      this._deleteButton.classList.add('card__delete-button_hidden');
    }
    //  debugger

    return this._element;
  }

}
