export default class UserInfo {
  constructor({nameselector, jobselector}) {
    this._nameElement = document.querySelector(nameselector);
    this._jobElement = document.querySelector(jobselector);
  }

  getUserInfo() {
    this.userData = {};
    this.userData.name = this._nameElement.textContent;
    this.userData.job = this._jobElement.textContent;

    return this.userData;

  }

  setUserInfo({name, job}) {
    this._nameElement.textContent = name;
    this._jobElement.textContent = job;
  }
}
