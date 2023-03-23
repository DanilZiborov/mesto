export default class Card {
  constructor({ data, templateSelector, handleCardClick, handleDeleteIconClick, handleLikeClick }) {
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
    const cardTemplate = document.querySelector(this._templateSelector).content;
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _checkLike() {
    this._isLiked = this._likes.some(item => item._id === this._currentUserId);
  }

  updateLikeState(likes) {
    this._likeCounter.textContent = likes;
    this._isLiked = !this._isLiked;
    this._buttonLike.classList.toggle('card__like-button_active');
  }

  _addEventListeners() {
    this._cardTitle = this._element.querySelector('.card__title');
    this._cardImage = this._element.querySelector('.card__image');
    this._buttonLike = this._element.querySelector('.card__like-button');
    this._likeCounter = this._element.querySelector('.card__like-counter');
    this._buttonDelete = this._element.querySelector('.card__delete-button');

    this._cardImage
      .addEventListener('click', () => {
        this._handleCardClick(this._name, this._link);
      });

    this._buttonLike
      .addEventListener('click', () => {
        // в качестве аргументов передаю в обработчик лайка элемент счётчика лайков, айди текущей карточки и состояние лайка
        this._handleLikeClick({ cardId: this._id, isLiked: this._isLiked });
      });

    this._buttonDelete
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
      this._buttonLike.classList.add('card__like-button_active');
    }

    if (this._currentUserId !== this._owner._id) {
      this._buttonDelete.classList.add('card__delete-button_hidden');
    }

    return this._element;
  }
}
