// Импорты

// стили для вебпака

import '../pages/index.css';

// классы

import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';
import Api from '../scripts/components/Api.js';

// конфиг валидации

import { validationConfig } from '../scripts/utils/constants.js';

// формы попапов

import { popupAddForm } from '../scripts/utils/constants.js';
import { popupEditForm } from '../scripts/utils/constants.js';
import { popupAvatarChangeForm } from '../scripts/utils/constants.js';

// элементы профиля

import { editButton } from '../scripts/utils/constants.js';
import { addButton } from '../scripts/utils/constants.js';
import { avatarChangeButton } from '../scripts/utils/constants.js';

// функция создания карточки

function createCard(item, currentUserId) {
  const card = new Card({
    data: {
      name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      owner: item.owner,
      currentUserId: currentUserId
    },

    templateSelector: '#card',

    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },

    handleDeleteIconClick: (card) => {
      deletePopup.setCard(card);
      deletePopup.open();
    },

    // id текущей карточки и состояние лайка из класса

    handleLikeClick: ({cardId, isLiked}) => {

      if(isLiked) {
        api.deleteLike(cardId)
          .then(res => {
            card.updateLikeState(res.likes.length);
          })
          .catch(err => console.log(`Невозможно лайкнуть карточку, ${err}`));
      }

      else {
        api.putLike(cardId)
        .then(res => {
          card.updateLikeState(res.likes.length);
        })
        .catch(err => console.log(`Невозможно лайкнуть карточку, ${err}`));
      }
    }
  })

  const newCard = card.generateCard();
  return newCard
}

// инициализация классов

// секция карточек

const cardsSection = new Section({
  renderer: createCard
}, '.cards');

// данные пользователя

const userInfo = new UserInfo({ nameselector: '.profile__name', aboutselector: '.profile__about', avatarSelector: '.profile__avatar' });

// попап-картинка

const imagePopup = new PopupWithImage({ selector: '.popup_type_image' });

// попап-добавление

const addPopup = new PopupWithForm({
  selector: '.popup_type_add', submitHandler: () => {
    addPopup.toggleLoader();
    api.addNewCard(addPopup.formValues)
    .then(res => {
      cardsSection.renderCard({name: res.name, link: res.link, likes: res.likes, _id: res._id, owner: res.owner}, userInfo.currentUserId);
      addPopup.toggleLoader();
      addPopup.close();
    })
    .catch(err => {
      addPopup.toggleLoader();
      console.log(`Не удалось добавить новую карточку, ${err}`);
    });
  }
});

// попап-изменение данных пользователя

const editPopup = new PopupWithForm({
  selector: '.popup_type_edit', submitHandler: () => {
    editPopup.toggleLoader();
    api.editUserInfo(editPopup.formValues)
    .then(res => {
      userInfo.setUserInfo({name: res.name, about: res.about});
      editPopup.toggleLoader();
      editPopup.close();
    })
    .catch(err => {
      console.log(`Не удалось отредактировать данные полььзователя, ${err}`);
      editPopup.toggleLoader();
    });
  }
})

// попап-подтверждение-удаления карточки

const deletePopup = new PopupWithSubmit({
  selector: '.popup_type_delete', submitHandler: (card) => {
    api.deleteCard(card.id)
    .then(() => {
      card.remove();
    })
    .catch(err => {
      console.log(`Не удалось удалить карточку, ${err}`);
    });

    deletePopup.close();
  }
})

// попап-изменение аватара

const avatarChangePopup = new PopupWithForm({
  selector: '.popup_type_avatar-change', submitHandler: () => {
    avatarChangePopup.toggleLoader();
    api.changeAvatar(avatarChangePopup.formValues)
    .then(res => {
      userInfo.setUserAvatar({avatar: res.avatar});
      avatarChangePopup.toggleLoader();
      avatarChangePopup.close();
    })

    .catch(err => {
      console.error(`Не удалось загрузить новый аватар ${err}`);
      avatarChangePopup.toggleLoader();
    })
  }
})

// API

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-61',
  headers:
  {
    "Content-Type": "application/json",
    authorization: '9b21d05c-2df0-403f-90b6-aed7cbecb94d'
  }
});

// добавляем слушатели на экземпляры классов

addPopup.setEventListeners();
imagePopup.setEventListeners();
editPopup.setEventListeners();
deletePopup.setEventListeners();
avatarChangePopup.setEventListeners();

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

avatarChangeButton.addEventListener('click', () => {
  avatarChangeFormValidator.clearErrorMessage();
  avatarChangeFormValidator.disableSubmitButton();
  avatarChangePopup.open();
})

// включаем валидацию

const editFormValidator = new FormValidator(validationConfig, popupEditForm);
const addFormValidator = new FormValidator(validationConfig, popupAddForm);
const avatarChangeFormValidator = new FormValidator(validationConfig, popupAvatarChangeForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();
avatarChangeFormValidator.enableValidation();

// подгружаем с сервера карточки и данные польлзователя

Promise.all([api.getUserInfo(), api.getInitialCards() ])
  .then(([user, items]) => {
    userInfo.getAllUserData({ name: user.name, about: user.about, avatar: user.avatar, currentUserId: user._id });
    cardsSection.renderInitialCards(items, userInfo.currentUserId);
  })
  .catch(err => {
    console.error(`Проблема c загрузкой начальных карточек или информации профиля, ${err}`);
  });

