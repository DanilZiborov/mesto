export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() {
    // если вход метод принимает массив(для отрисовки начальных карточек), то используем перебор
    // если объект, то просто отправляем его в рендерер

    if (Array.isArray(this._renderedItems)) {
      this._renderedItems.forEach(item => this._renderer(item));
    }
    else {
      this._renderer(this._renderedItems);
    }
  }

  addItem(element) {
    this._container.prepend(element);
  }

}
