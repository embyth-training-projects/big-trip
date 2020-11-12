import {createElement} from '../utils';

const createTripControlsTemplate = () => {
  return (
    `<div class="trip-main__trip-controls  trip-controls">
      <h2 class="visually-hidden">Switch trip view</h2>
      <h2 class="visually-hidden">Filter events</h2>
    </div>`
  );
};

export default class Controls {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTripControlsTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
