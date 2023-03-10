// импорты картинок для вебпака

import zhlImage from '../../images/zhl.jpg';
import arkhImage from '../../images/arkh.jpg';
import bermImage from '../../images/berm.jpg';
import lermImage from '../../images/lerm.jpg';
import nvtrImage from '../../images/nvtr.jpg';
import ptgImage from '../../images/ptg.jpg';

//Массив изначальных карточек

export const initialCards = [
  {
    title: 'Железноводск',
    link: zhlImage
  },
  {
    title: 'Архыз',
    link: arkhImage
  },
  {
    title: 'Бермамыт',
    link: bermImage
  },
  {
    title: 'Лермонтов',
    link: lermImage
  },
  {
    title: 'Новотерский',
    link: nvtrImage
  },
  {
    title: 'Пятигорск',
    link: ptgImage
  },
];

// параметры валидации

export const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

// элементы профиля

export const editButton = document.querySelector('.profile__edit-button');
export const addButton = document.querySelector('.profile__add-button');

// формы

export const popupEditForm = document.forms.edit;
export const popupAddForm = document.forms.add;

// инпуты попапа изменения данных

export const nameInput = popupEditForm.elements.name;
export const jobInput = popupEditForm.elements.job;
