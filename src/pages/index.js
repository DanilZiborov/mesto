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

import { buttonEdit } from '../scripts/utils/constants.js';
import { buttonAdd } from '../scripts/utils/constants.js';
import { avatarChangeButton } from '../scripts/utils/constants.js';

// функция создания карточки

function createCard(item) {
  const card = new Card({
    data: {
      name: item.name,
      link: item.link,
      likes: item.likes,
      id: item._id,
      owner: item.owner,
    },

    currentUserId: userInfo.currentUserId,

    templateSelector: '#card',

    handleCardClick: (name, link) => {
      popupTypeImage.open(name, link);
    },

    handleDeleteIconClick: (card) => {
      popupTypeDelete.setCard(card);
      popupTypeDelete.open();
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
  renderer: (data) => {
    cardsSection.addItem(createCard(data))
  }
}, '.cards');

// данные пользователя

const userInfo = new UserInfo({ nameSelector: '.profile__name', aboutSelector: '.profile__about', avatarSelector: '.profile__avatar' });

// попап-картинка

const popupTypeImage = new PopupWithImage({ selector: '.popup_type_image' });

// попап-добавление

const popupTypeAdd = new PopupWithForm({
  selector: '.popup_type_add', submitHandler: () => {
    popupTypeAdd.toggleLoader();
    api.addNewCard(popupTypeAdd.formValues)
    .then(res => {
      const card = createCard({name: res.name, link: res.link, likes: res.likes, _id: res._id, owner: res.owner});
      cardsSection.addItem(card);
      popupTypeAdd.toggleLoader();
      popupTypeAdd.close();
    })
    .catch(err => {
      popupTypeAdd.toggleLoader();
      console.log(`Не удалось добавить новую карточку, ${err}`);
    });
  }
});

// попап-изменение данных пользователя

const popupTypeEdit = new PopupWithForm({
  selector: '.popup_type_edit', submitHandler: () => {
    popupTypeEdit.toggleLoader();
    api.editUserInfo(popupTypeEdit.formValues)
    .then(res => {
      userInfo.setUserInfo({name: res.name, about: res.about});
      popupTypeEdit.toggleLoader();
      popupTypeEdit.close();
    })
    .catch(err => {
      console.log(`Не удалось отредактировать данные полььзователя, ${err}`);
      popupTypeEdit.toggleLoader();
    });
  }
})

// попап-подтверждение-удаления карточки

const popupTypeDelete = new PopupWithSubmit({
  selector: '.popup_type_delete', submitHandler: (card) => {
    api.deleteCard(card.id)
    .then(() => {
      card.remove();
      popupTypeDelete.close();
    })
    .catch(err => {
      console.log(`Не удалось удалить карточку, ${err}`);
    });
  }
})

// попап-изменение аватара

const popupTypeAvatar = new PopupWithForm({
  selector: '.popup_type_avatar-change', submitHandler: () => {
    popupTypeAvatar.toggleLoader();
    api.changeAvatar(popupTypeAvatar.formValues)
    .then(res => {
      userInfo.setUserAvatar({avatar: res.avatar});
      popupTypeAvatar.toggleLoader();
      popupTypeAvatar.close();
    })

    .catch(err => {
      console.error(`Не удалось загрузить новый аватар ${err}`);
      popupTypeAvatar.toggleLoader();
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

// Валидация

const formEditValidator = new FormValidator(validationConfig, popupEditForm);
const formAddValidator = new FormValidator(validationConfig, popupAddForm);
const avatarChangeFormValidator = new FormValidator(validationConfig, popupAvatarChangeForm);

// добавляем слушатели на экземпляры классов

popupTypeAdd.setEventListeners();
popupTypeImage.setEventListeners();
popupTypeEdit.setEventListeners();
popupTypeDelete.setEventListeners();
popupTypeAvatar.setEventListeners();

// добавляем слушатели на кнопки профиля

buttonAdd.addEventListener('click', () => {
  formAddValidator.clearErrorMessage();
  formAddValidator.disableSubmitButton();
  popupTypeAdd.open();
});

buttonEdit.addEventListener('click', () => {
  const info = userInfo.getUserInfo();
  popupTypeEdit.setInputValues(info);
  formEditValidator.clearErrorMessage();
  popupTypeEdit.open();
});

avatarChangeButton.addEventListener('click', () => {
  avatarChangeFormValidator.clearErrorMessage();
  popupTypeAvatar.setInputValues({avatar: userInfo.getUserInfo().avatar});
  popupTypeAvatar.open();
})

// включаем валидацию

formEditValidator.enableValidation();
formAddValidator.enableValidation();
avatarChangeFormValidator.enableValidation();

// подгружаем с сервера карточки и данные польлзователя

Promise.all([api.getUserInfo(), api.getInitialCards() ])
  .then(([user, items]) => {
    userInfo.setAllUserData({ name: user.name, about: user.about, avatar: user.avatar, currentUserId: user._id });
    cardsSection.renderItems(items);
  })
  .catch(err => {
    console.error(`Проблема c загрузкой начальных карточек или информации профиля, ${err}`);
  });

