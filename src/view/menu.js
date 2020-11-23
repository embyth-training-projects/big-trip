import AbstractView from './abstract';
import {MenuItem} from '../const';

const createSiteMenuTemplate = () => {
  return (
    `<nav class="trip-controls__trip-tabs  trip-tabs">
      ${Object
        .values(MenuItem)
        .map((type) => {
          return `<a class="trip-tabs__btn" href="#" data-menu-item="${type}">${type}</a>`;
        })
        .join(``)}
    </nav>`
  );
};

export default class Menu extends AbstractView {
  constructor() {
    super();

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate();
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    this.setActiveMenuItem(evt.target.dataset.menuItem);
    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setActiveMenuItem(menuItem) {
    this.getElement()
      .querySelectorAll(`.trip-tabs__btn`)
      .forEach((item) => item.classList.remove(`trip-tabs__btn--active`));

    const item = this.getElement().querySelector(`.trip-tabs__btn[data-menu-item="${menuItem}"]`);

    if (item !== null) {
      item.classList.add(`trip-tabs__btn--active`);
    }
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement()
      .querySelectorAll(`.trip-tabs__btn`)
      .forEach((item) => item.addEventListener(`click`, this._menuClickHandler));
  }

  enableMenu() {
    this.getElement()
    .querySelectorAll(`.trip-tabs__btn`)
    .forEach((item) => item.classList.remove(`trip-tabs__btn--disable`));
  }

  disableMenu() {
    this.getElement()
    .querySelectorAll(`.trip-tabs__btn`)
    .forEach((item) => item.classList.add(`trip-tabs__btn--disable`));
  }
}
