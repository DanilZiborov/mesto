//Импорты

import Card from './Card.js';
import FormValidator from './FormValidator.js';

import { openPopup, closePopup } from './utils/utils.js';
import { initialCards } from './constants.js';

import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

// Параметры валидации

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

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

// Элементы профиля

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');

//Элементы шаблона карточки

// const cardsSection = document.querySelector('.cards');

//Закрыть попап при сабмите формы

// function hidePopup(evt) {
//   closePopup(evt.currentTarget.closest('.popup'));
// }

//Очистить поля в попапе добавления карточки

// function clearPopupForm(evt) {
//   evt.currentTarget.reset();
// }

//Показать попап редактирования

function showEditPopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  editFormValidator.clearErrorMessage();
  editFormValidator.disableSubmitButton();
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

// function showAddPopup() {
//   addFormValidator.clearErrorMessage();
//   addFormValidator.disableSubmitButton();
//   openPopup(popupTypeAdd);
// }

//Отрисовать карточку в DOM

// function renderCard(title, image, templateSelector) {
//   const card = new Card(title, image, templateSelector, (evt) => {
//     testImagePopup.open(evt);
//   }).generateCard(); //переписать по-нормальному с деструктуризацией
//   cardsSection.prepend(card);
// }

// //Показать карточку, добавленную через попап

// function addNewCard(evt) {
//   evt.preventDefault();
//   renderCard(placeTitleInput.value, placeLinkInput.value, '.card');
//   clearPopupForm(evt);
//   hidePopup(evt);
// };





//Делаем загрузку дефолтных карточек через секцию

const initialCardsSection = new Section({items: initialCards, renderer: (item) => {
  const card = new Card(item.name, item.link, '.card', (evt) => { // переписать приём аргументов через деструктуризацию, как в классе Section, чтоб было понятнее
    testImagePopup.open(evt);
  });
  const newCard = card.generateCard();

  initialCardsSection.addItem(newCard);
}}, '.cards');



//показываем дефолтные карточки

initialCardsSection.renderItems();


// Включаем валидацию

const editFormValidator = new FormValidator(validationConfig, popupEditForm);
const addFormValidator = new FormValidator(validationConfig, popupAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

//зона теста классов попапов

const testImagePopup = new PopupWithImage('.popup_type_image');

testImagePopup.setEventListeners();

// это просто пиздец, нужна общая функция рендерера карточки для section

const testAddPopup = new PopupWithForm('.popup_type_add', () => {
  const addByPopupCard = new Section ({items: testAddPopup.formValues, renderer: (item) => {
    const card = new Card(item.title, item.link, '.card', (evt) => {
      testImagePopup.open(evt);
    });
    const newCard = card.generateCard();
    addByPopupCard.addItem(newCard);
  }}, '.cards');
  addByPopupCard.renderItems();
  testAddPopup.close(); 
});

testAddPopup.setEventListeners();








//глобальные слышатели событий

// Слушатели событий

// editButton.addEventListener('click', );
addButton.addEventListener('click', () => {
  testAddPopup.open();
});
popupEditForm.addEventListener('submit', saveProfileChanges);



