
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

//Кнопки закрытия всех попапов

const closeButtons = document.querySelectorAll('.popup__close-button');

//Элементы попапа редкатирования личных данных

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditForm = document.forms['edit'];
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_job');

//Элементы попапа добавления карточки

const popupTypeAdd = document.querySelector('.popup_type_add');
const popupAddForm = document.forms['add'];
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

//Элементы карточек

const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


//Функции

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

//Очистить поля в попапе добавления карточки

function clearPopupForm(evt) {
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

//Создать карточку

function getCard(title, image) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  const cardTitle = cardElement.querySelector('.card__title');
  cardTitle.textContent = title;
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = image;
  cardImage.alt = title;
  cardImage.addEventListener('click', () => showImagePopup(title, image));
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  cardLikeButton.addEventListener('click', toggleLike);
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  cardDeleteButton.addEventListener('click', deleteCard);
  return cardElement;
}


function createCard(title, image) {
  const cardElement = getCard(title, image);
  cardsSection.prepend(cardElement);
}


//Показать карточку, добавленную через попап

function addNewCard(evt) {
  evt.preventDefault();
  createCard(placeTitleInput.value, placeLinkInput.value);
  clearPopupForm(evt);
  hidePopup(evt);
};


//Показать попап-картинку

function showImagePopup(title, image) {
  popupImage.src = image;
  popupImageCaption.textContent = title;
  openPopup(popupTypeImage);
}

//Лайкнуть карточку

function toggleLike(evt) {
  evt.target.classList.toggle('card__like-button_active');
}

//Удалить карточку

function deleteCard(evt) {
  evt.target.closest('.card').remove();
};

//Показать карточки по умолчанию

function showInitialCards() {
  initialCards.reverse().forEach(item => {
    createCard(item.name, item.link);
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



//ВАЛИДАЦИЯ

//Показываем сообщение об ошибке

function showInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
};


//Скрываем сообщение об ошибке

function hideInputError(formElement, inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};

// Проверяем инпут на валидность

function checkInputValidity(formElement, inputElement, { ...rest }) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, rest);
  } else {
    hideInputError(formElement, inputElement, rest);
  }
};


// Проверяем, есть ли невалидный инпут

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Переключаем кнопку сабмита

function toggleButtonState(inputList, buttonElement, { inactiveButtonClass, ...rest }) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.setAttribute('disabled', '');
  }
  else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.removeAttribute('disabled', '');
  }
}



// Навешиваем слушатели на каждый инпут

function setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest }) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(inputList, buttonElement, rest);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
};

//Финальная функция включения валидации

function enableValidation({ formSelector, ...rest }) {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, rest);
  });
};



//Запускаем валидацию

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});


// Закрыть открытый попап клавишей Esc

function handleEscape(evt) {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup(popupActive);
  };
}


// Показываем дефолтные карточки при открытии страницы

showInitialCards();
