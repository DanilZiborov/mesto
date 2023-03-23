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

export const buttonEdit = document.querySelector('.profile__edit-button');
export const buttonAdd = document.querySelector('.profile__add-button');
export const avatarChangeButton = document.querySelector('.profile__avatar-change-button');

// формы

export const popupEditForm = document.forms.edit;
export const popupAddForm = document.forms.add;
export const popupAvatarChangeForm = document.forms.avatar;
