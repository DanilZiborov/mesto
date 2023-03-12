export default class Section {
  constructor({ items, renderer }, selector) {
    this._renderedItems = items;
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderInitialCards() {
    this._renderedItems.forEach(item => {
      this.renderCard(item);
    });
  }

  renderCard(item) {
    const card = this._renderer(item);
    this._container.prepend(card);
  }

}
