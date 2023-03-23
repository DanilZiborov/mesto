export default class UserInfo {
  constructor({ nameSelector, aboutSelector, avatarSelector }) {
    this._nameElement = document.querySelector(nameSelector);
    this._aboutElement = document.querySelector(aboutSelector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this.userData = {};
    this.userData.name = this._nameElement.textContent;
    this.userData.about = this._aboutElement.textContent;
    this.userData.avatar = this._avatarElement.src;

    return this.userData;
  }

// отдельные методы для установки аватара и информации о пользователе,
// чтоб не перезаписывать те поля, которые не изменились

// все данные, которые нужны для изменний в DOM, приходят от сервера, а не напрямую из полей формы

  setUserAvatar({ avatar }) {
    this._avatarElement.src = avatar;
  }

  setUserInfo({ name, about }) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
  }

// метод получения всей инфы профиля и айди текущего пользователя

  setAllUserData({ name, about, avatar, currentUserId }) {
    this.setUserInfo({name, about})
    this.setUserAvatar({avatar});

    // публичное свойство с айдишником
    this.currentUserId = currentUserId;
  }
}
