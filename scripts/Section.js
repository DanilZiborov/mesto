export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderItems() { // если на входе у нас массив, как при создании начальных карточек, то используем перебор
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
