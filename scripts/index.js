
//Массив изначальных карточек

const initialCards = [
  {
    name: 'Железноводск',
    link: 'images/zhl.jpg'
  },
  {
    name: 'Архыз',
    link: 'images/arkh.jpg'
  },
  {
    name: 'Бермамыт',
    link: 'images/berm.jpg'
  },
  {
    name: 'Лермонтов',
    link: 'images/lerm.jpg'
  },
  {
    name: 'Новотерский',
    link: 'images/nvtr.jpg'
  },
  {
    name: 'Пятигорск',
    link: 'images/ptg.jpg'
  },
];


//Глобальные переменные

//Массив всех попапов

const popups = Array.from(document.querySelectorAll('.popup'));

//Массив всех форм

const forms = Array.from(document.forms);

//Кнопки закрытия всех попапов

const closeButtons = document.querySelectorAll('.popup__close-button');

//Элементы попапа редкатирования личных данных

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms.edit;
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_job');

//Элементы попапа добавления карточки

const popupTypeAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.forms.add;
const placeTitleInput = popupTypeAdd.querySelector('.popup__input_type_title');
const placeLinkInput = popupTypeAdd.querySelector('.popup__input_type_link');

//Элементы попапа-картинки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = popupTypeImage.querySelector('.popup__image');
const popupImageCaption = popupTypeImage.querySelector('.popup__image-caption');

// Элементы профиля

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Элементы шаблона карточки

const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


//ПОПАПЫ

//Общие функции закрытия и открытия для попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscape);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscape);
}

function hidePopup(evt) {
  closePopup(evt.currentTarget.closest('.popup'));
}

// Закрыть открытый попап клавишей Esc

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
};

//Очистить поля в попапе добавления карточки

function clearPopupForm(evt) {
  const submitButton = evt.currentTarget.querySelector('.popup__button');
  submitButton.setAttribute('disabled', '');
  submitButton.classList.add('popup__button_disabled');
  evt.currentTarget.reset();
}


//Показать попап редактирования

function showEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupTypeEdit);
}

//Сохранить изменения из попапа редактирования

function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  hidePopup(evt);
}

//Показать попап добавления карточки

function showAddPopup() {
  openPopup(popupTypeAdd);
}


//КАРТОЧКИ

//Тут делаем класс (с Божьей помощью)

class Card {
  constructor(title, image, templateSelector) {
    this._title = title;
    this._image = image;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
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

}

//Отрисовать карточку в DOM

function renderCard(title, image, templateSelector) {
  const card = new Card(title, image, templateSelector).generateCard();
  cardsSection.prepend(card);
}


//Показать карточку, добавленную через попап

function addNewCard(evt) {
  evt.preventDefault();
  renderCard(placeTitleInput.value, placeLinkInput.value, '.card');
  clearPopupForm(evt);
  hidePopup(evt);
};


//Показать карточки по умолчанию

function showInitialCards() {
  initialCards.reverse().forEach(item => {
    renderCard(item.name, item.link, '.card');
  });
};

// Слушатели событий

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
popupEditForm.addEventListener('submit', saveProfileChanges);
popupAddForm.addEventListener('submit', addNewCard);
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});
popups.forEach(popup => {
  popup.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closePopup(popup);
    };
  });
});



// Показываем дефолтные карточки при открытии страницы

showInitialCards();


