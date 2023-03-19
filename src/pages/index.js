// Импорты

import '../pages/index.css'; // стили для вебпака

import Card from '../scripts/components/Card.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import PopupWithSubmit from '../scripts/components/PopupWithSubmit.js';
import FormValidator from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import UserInfo from '../scripts/components/UserInfo.js';

import Api from '../scripts/components/Api.js';

import { validationConfig } from '../scripts/utils/constants.js';

import { popupAddForm } from '../scripts/utils/constants.js';
import { popupEditForm } from '../scripts/utils/constants.js';

import { editButton } from '../scripts/utils/constants.js';
import { addButton } from '../scripts/utils/constants.js';


// глобальная переменная с id текущего пользователя



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

    templateSelector: '.card',

    handleCardClick: (name, link) => {
      imagePopup.open(name, link);
    },

    handleDeleteIconClick: (card) => {
      deletePopup.getCard(card);
      deletePopup.open();
    },

    // обработчик лайка принимает счётчик лайков, id текущей карточки и состояние лайка из класса

    handleLikeClick: ({likeCounter, cardId, isLiked}) => {
      console.log(isLiked);
      console.log(cardId);
      if(isLiked) {
        api.deleteLike(cardId)
          .then(res => {
            likeCounter.textContent = res.likes.length;
            card.toggleLike();
            console.log('убрал лайк');
          })
          .catch(err => console.log(err));

      }
      else {
        api.putLike(cardId)
        .then(res => {
          likeCounter.textContent = res.likes.length;
          card.toggleLike();
          console.log('поставил лайк');
        })
        .catch(err => console.log(err));
      }
    }

  });

  const newCard = card.generateCard();
  return newCard
}

// экземпляры классов
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
    api.addNewCard(addPopup.formValues)
    .then(res => {
      cardsSection.renderCard({name: res.name, link: res.link, likes: res.likes, _id: res._id, owner: res.owner}, userInfo.currentUserId);
      console.log(res._id);
    })
    .catch(err => {
      console.log(`Не удалось добавить новую карточку, ${err}`);
    });

    addPopup.close();
  }
});

// попап-изменение данных полльзвателя

const editPopup = new PopupWithForm({
  selector: '.popup_type_edit', submitHandler: () => {
    api.editUserInfo(editPopup.formValues)
    .catch(err => {
      console.log(`Не удалось отредактировать данные полььзователя, ${err}`);
    });
    userInfo.setUserInfo(editPopup.formValues);
    editPopup.close();
  }
})

// попап-подтверждение-удаления карточки

const deletePopup = new PopupWithSubmit({
  selector: '.popup_type_delete', submitHandler: (card) => {
    console.log(card);
    api.deleteCard(card)
    .catch(err => {
      console.log(`Не удалось удалить карточку, ${err}`);
    });
    card.remove();

    deletePopup.close();
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

// включаем валидацию

const editFormValidator = new FormValidator(validationConfig, popupEditForm);
const addFormValidator = new FormValidator(validationConfig, popupAddForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// подгружаем с сервера карточки и данные польлзователя


Promise.all([api.getUserInfo(), api.getInitialCards() ])
  .then(([user, items]) => {
    userInfo.setUserInfo({ name: user.name, about: user.about, avatar: user.avatar, currentUserId: user._id });
    cardsSection.renderInitialCards(items, userInfo.currentUserId);
  })
  .catch(err => {
    console.log(`Проблема c загрузкой начальных карточек или информации профиля, ${err}`);
  });

