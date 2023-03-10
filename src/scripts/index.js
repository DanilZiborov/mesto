// Импорты

import '../pages/index.css'; // стили для вебпака

import Card from './components/Card.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import FormValidator from './components/FormValidator.js';
import Section from './components/Section.js';
import UserInfo from './components/UserInfo.js';

import { initialCards } from './utils/constants.js';
import { validationConfig } from './utils/constants.js';

import { popupAddForm } from './utils/constants.js';
import { popupEditForm } from './utils/constants.js';

import { nameInput } from './utils/constants.js';
import { jobInput } from './utils/constants.js';

import { editButton } from './utils/constants.js';
import { addButton } from './utils/constants.js';

// экземпляры классов

// дефолтные карточки

const initialCardsSection = new Section({
  items: initialCards, renderer: (item) => {
    const card = new Card({
      title: item.title, image: item.link, templateSelector: '.card', handleCardClick: (evt) => {
        imagePopup.open(evt);
      }
    });
    const newCard = card.generateCard();

    initialCardsSection.addItem(newCard);
  }
}, '.cards');

// данные пользователя

const userInfo = new UserInfo({ nameselector: '.profile__name', jobselector: '.profile__job' });

// попап-картинка

const imagePopup = new PopupWithImage({ selector: '.popup_type_image' });

// попап-добавление

const addPopup = new PopupWithForm({
  selector: '.popup_type_add', submitHandler: () => {
    const addByPopupCard = new Section({
      items: addPopup.formValues, renderer: (item) => {
        const card = new Card({
          title: item.title, image: item.link, templateSelector: '.card', handleCardClick: (evt) => {
            imagePopup.open(evt);
          }
        });
        const newCard = card.generateCard();
        addByPopupCard.addItem(newCard);
      }
    }, '.cards');
    addByPopupCard.renderItems();
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
  nameInput.value = info.name;
  jobInput.value = info.job;
  editFormValidator.clearErrorMessage();
  editFormValidator.disableSubmitButton();
  editPopup.open();
});

// подгружаем данные пользователя

userInfo.setUserInfo({ name: 'Жак-Ив Кусто', job: 'Исследователь океана' });

// показываем дефолтные карточки

initialCardsSection.renderItems();

// включаем валидацию

const editFormValidator = new FormValidator(validationConfig, popupEditForm);
const addFormValidator = new FormValidator(validationConfig, popupAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
