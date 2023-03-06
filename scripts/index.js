//Импорты

import Card from './Card.js';
import FormValidator from './FormValidator.js';

import { initialCards } from './constants.js';

import PopupWithImage from './PopupWithImage.js';
import Section from './Section.js';
import PopupWithForm from './PopupWithForm.js';

import { popupAddForm } from './constants.js';
import { popupEditForm } from './constants.js';

import { validationConfig } from './constants.js';
import UserInfo from './UserInfo.js';





//Глобальные переменные

//Массив всех попапов

// const popups = Array.from(document.querySelectorAll('.popup'));

//Массив всех форм

// const forms = Array.from(document.forms);

//Кнопки закрытия всех попапов

// const closeButtons = document.querySelectorAll('.popup__close-button');

//Элементы попапа редкатирования личных данных


// Элементы профиля

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

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

// function showEditPopup() {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileJob.textContent;
//   editFormValidator.clearErrorMessage();
//   editFormValidator.disableSubmitButton();
//   openPopup(popupTypeEdit);
// }

//Сохранить изменения из попапа редактирования

// function saveProfileChanges(evt) {
//   evt.preventDefault();
//   profileName.textContent = nameInput.value;
//   profileJob.textContent = jobInput.value;
//   hidePopup(evt);
// }

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
  const card = new Card({title: item.name, image: item.link, templateSelector: '.card', handleCardClick: (evt) => { // переписать приём аргументов через деструктуризацию, как в классе Section, чтоб было понятнее
    testImagePopup.open(evt);
  }});
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


//данные пользователя

const userInfo = new UserInfo({nameselector: '.profile__name', jobselector: '.profile__job'});


//попап-картинка

const testImagePopup = new PopupWithImage({selector: '.popup_type_image'});



//попап-добавление

// это просто пиздец, нужна общая функция рендерера карточки для section

const testAddPopup = new PopupWithForm({selector: '.popup_type_add', submitHandler: () => {
  const addByPopupCard = new Section ({items: testAddPopup.formValues, renderer: (item) => {
    const card = new Card({title: item.title, image: item.link, templateSelector: '.card', handleCardClick: (evt) => {
      testImagePopup.open(evt);
    }});
    const newCard = card.generateCard();
    addByPopupCard.addItem(newCard);
  }}, '.cards');
  addByPopupCard.renderItems();
  testAddPopup.close();
}});



// попап-изменение

const testEditPopup = new PopupWithForm({selector: '.popup_type_edit', submitHandler: () => {
  userInfo.setUserInfo(testEditPopup.formValues);
  testEditPopup.close();
}})





// навешиваем слушатели на классы

testAddPopup.setEventListeners();
testImagePopup.setEventListeners();
testEditPopup.setEventListeners();


//глобальные слышатели событий


addButton.addEventListener('click', () => {
  testAddPopup.open();
});

// перебираем список инпутов у попапа редактирования (этот список у нас уже есть, просто сделал метод публичным)
// через switch/case присваиваем значения из метода getUserInfo инпутам
// это единственное решение без глобальных переменных, до которого я дошёл
// скорее всего, есть другое, более элегантное

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  testEditPopup.inputList.forEach(input => {
    switch(input.name) {
      case 'name':
        input.value = info.name;
        break;
      case 'job':
        input.value = info.job;
    }
  })
  testEditPopup.open();
});

// подгружаем данные пользователя

userInfo.setUserInfo({name: 'Жак-Ив Кусто', job: 'Исследователь океана'});




