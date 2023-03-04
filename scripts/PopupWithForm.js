export default class PopupWithForm extends Popup {
  constructor(selector) { //кроме конструктора должен принимать колбэк сабмита формы
    super(selector);
  }

  _getInputValues() {

  }

  open() {
    //тут надо перезаписать родительский open
  }

  close() {
// перезаписать родительский метод. не только закрытие попапа, но и сброс формы
  }


  setEventListeners() {
// тут надо перезаписать родительский метод. добавлять не только обработчик клика, но и обработчик сабмита
  }

}
