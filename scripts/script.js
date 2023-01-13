
//Массив изначальных карточек

const initialCards = [
  {
    name: 'Железноводск',
    link: 'images/zhl.png'
  },
  {
    name: 'Архыз',
    link: 'images/arh.png'
  },
  {
    name: 'Бермамыт',
    link: 'images/berm.png'
  },
  {
    name: 'Лермонтов',
    link: 'images/lerm.png'
  },
  {
    name: 'Новотерский',
    link: 'images/nvtr.png'
  },
  {
    name: 'Пятигорск',
    link: 'images/ptg.png'
  },
];

//Общие элементы для трех попапов

const popup = document.querySelector('.popup');
const closeButton = popup.querySelector('.popup__close-button');

//Элементы попапа редкатирования личных данных

const popupTypeEdit = document.querySelector('.popup_type_edit');
const popupEditForm = popupTypeEdit.querySelector('.form_type_edit')
const nameInput = popupTypeEdit.querySelector('.popup__input_type_name');
const jobInput = popupTypeEdit.querySelector('.popup__input_type_job');

//Элементы попапа добавления карточки

const popupTypeAdd = document.querySelector('.popup_type_add');
const popupAddForm = popupTypeAdd.querySelector('.form_type_add')
const placeTitleInput = popupTypeAdd.querySelector('.popup__input_type_place-title');
const placeLinkInput = popupTypeAdd.querySelector('.popup__input_type_place-link');

// Элементы профиля

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Элементы карточек

const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;


//Общие функции закрытия и открытия для трех попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt, popup) {
  evt ? evt.currentTarget.parentElement.parentElement.classList.remove('popup_opened') : popup.classList.remove('popup_opened');
}

//Функции показа и сохранения изменений попапа редактирования

function showEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupTypeEdit);
}


function saveProfileChanges(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(undefined, popupTypeEdit);
}

//Функция показа попапа редактирования

function showAddPopup() {
  openPopup(popupTypeAdd);
}



//Функции показа и сохранения изменений попапа добавления карточек

// тут будет код



// Логика добавления дефолтных карточек

function showInitialCards() {
  initialCards.forEach(item => {
    const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardsSection.append(cardElement);
  });
};



// Слушатели событий

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
popupEditForm.addEventListener('submit', saveProfileChanges);
closeButton.addEventListener('click', closePopup);



// Показываем дефолтные карточки при открытии страницы

showInitialCards();


