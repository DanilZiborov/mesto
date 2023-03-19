export default class Section {
  constructor({ renderer }, selector) {
    this._renderer = renderer;

    this._container = document.querySelector(selector);
  }

  renderInitialCards(items, currentUserId) {
    items.forEach(item => {
      this.renderCard(item, currentUserId);
    });
  }

  renderCard(item, currentUserId) {
    const card = this._renderer(item, currentUserId);
    this._container.prepend(card);
  }

}