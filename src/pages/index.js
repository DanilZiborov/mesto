// Импорты

import '../pages/index.css'; // стили для вебпака

import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import { initialCards } from '../scripts/utils/constants.js';
import { validationConfig } from '../scripts/utils/constants.js';

import { popupAddForm } from '../scripts/utils/constants.js';
import { popupEditForm } from '../scripts/utils/constants.js';

import { editButton } from '../scripts/utils/constants.js';
import { addButton } from '../scripts/utils/constants.js';


// функция создания карточки

function createCard(item) {
  const card = new Card({
    title: item.title, image: item.link, templateSelector: '.card', handleCardClick: (title, link) => {
      imagePopup.open(title, link);
    }
  });
  const newCard = card.generateCard();
  return newCard;
}

// экземпляры классов
// секция карточек

const cardsSection = new Section({
  items: initialCards, renderer: createCard
}, '.cards');

// данные пользователя

const userInfo = new UserInfo({ nameselector: '.profile__name', jobselector: '.profile__job' });

// попап-картинка

const imagePopup = new PopupWithImage({ selector: '.popup_type_image' });

// попап-добавление

const addPopup = new PopupWithForm({
  selector: '.popup_type_add', submitHandler: () => {
    cardsSection.renderCard(addPopup.formValues);
    addPopup.close();
  }
});

// попап-изменение данных полльзвателя

const editPopup = new PopupWithForm({
  selector: '.popup_type_edit', submitHandler: () => {
    userInfo.setUserInfo(editPopup.formValues);
    editPopup.close();
  }
})

// добавляем слушатели на экземпляры классов

addPopup.setEventListeners();
imagePopup.setEventListeners();
editPopup.setEventListeners();

// добавляем слушатели на кнопки профиля

addButton.addEventListener('click', () => {
  addFormValidator.clearErrorMessage();
  addFormValidator.disableSubmitButton();
  addPopup.open();
});

editButton.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  editPopup.setInputValues(info);
  editFormValidator.clearErrorMessage();
  editFormValidator.disableSubmitButton();
  editPopup.open();
});

// подгружаем данные пользователя

userInfo.setUserInfo({ name: 'Жак-Ив Кусто', job: 'Исследователь океана' });

// показываем дефолтные карточки

cardsSection.renderInitialCards();

// включаем валидацию

const editFormValidator = new FormValidator(validationConfig, popupEditForm);
const addFormValidator = new FormValidator(validationConfig, popupAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
