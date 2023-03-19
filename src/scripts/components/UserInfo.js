export default class UserInfo {
  constructor({nameselector, aboutselector, avatarSelector}) {
    this._nameElement = document.querySelector(nameselector);
    this._aboutElement = document.querySelector(aboutselector);
    this._avatarElement = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    this.userData = {};
    this.userData.name = this._nameElement.textContent;
    this.userData.about = this._aboutElement.textContent;

    return this.userData;

  }

  setUserInfo({name, about, avatar, currentUserId}) {
    this._nameElement.textContent = name;
    this._aboutElement.textContent = about;
    this._avatarElement.src = avatar;

    // публичное свойство с айдишником
    this.currentUserId = currentUserId;
  }
}
