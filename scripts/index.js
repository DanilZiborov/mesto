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


// Элементы профиля

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');


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




