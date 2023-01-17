
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

//Общие элементы для трех попапов

const closeButtons = document.querySelectorAll('.popup__close-button');

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

//Элементы попапа картинки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-caption');

// Элементы профиля

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Элементы карточек

const cardsSection = document.querySelector('.cards');
const cardTemplate = document.querySelector('#card').content;
let cardElement = cardTemplate.querySelector('.card').cloneNode(true);
const cardLikeButton = cardElement.querySelector('.card__like-button');



//Общие функции закрытия и открытия для трех попапов

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(evt, popup) {
  evt ? evt.currentTarget.closest('.popup').classList.remove('popup_opened') : popup.classList.remove('popup_opened');
}

//Функция очистки полей в попапе добавления карточки

function clearPopupForm() {
  placeTitleInput.value = '';
  placeLinkInput.value = '';
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



//Функции показа и сохранения изменений попапа добавления карточек

function showAddPopup() {
  openPopup(popupTypeAdd);
}

function addNewCard(evt) {
  evt.preventDefault();
  cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = placeTitleInput.value;
  cardElement.querySelector('.card__image').src = placeLinkInput.value;
  cardElement.querySelector('.card__image').addEventListener('click', showImagePopup);
  cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
  cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  cardsSection.prepend(cardElement);
  clearPopupForm();
  closePopup(undefined, popupTypeAdd);

};

//Функция показа попапа с картинкой

function showImagePopup(evt) {
  popupImage.src = evt.currentTarget.src;
  popupImageCaption.textContent = evt.currentTarget.closest('.card').querySelector('.card__title').textContent;
  openPopup(popupTypeImage);
}

//Функция лайков карточек

function likeCard(evt) {
  evt.currentTarget.classList.toggle('card__like-button_active');
}

//Функция удаления карточки

function deleteCard(evt) {
  evt.currentTarget.closest('.card').remove();
}



// Логика добавления дефолтных карточек

function showInitialCards() {
  initialCards.forEach(item => {
    cardElement = cardTemplate.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__title').textContent = item.name;
    cardElement.querySelector('.card__image').src = item.link;
    cardElement.querySelector('.card__image').addEventListener('click', showImagePopup);
    cardElement.querySelector('.card__like-button').addEventListener('click', likeCard);
    cardElement.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    cardsSection.append(cardElement);
  });
};



// Слушатели событий

editButton.addEventListener('click', showEditPopup);
addButton.addEventListener('click', showAddPopup);
popupEditForm.addEventListener('submit', saveProfileChanges);
popupAddForm.addEventListener('submit', addNewCard);
closeButtons.forEach(item => {
  item.addEventListener('click', closePopup);
});
cardLikeButton.addEventListener('click', likeCard);



// Показываем дефолтные карточки при открытии страницы

showInitialCards();
