import {createElement, formatMonthDate} from '../utils';

const createTripItemTemplate = (day, index) => {
  if (day.length) {
    const formattedDate = formatMonthDate(new Date(day));

    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${index}</span>
          <time class="day__date" datetime="${day}">${formattedDate}</time>
        </div>

        <ul class="trip-events__list" data-day="${day}"></ul>
      </li>`
    );
  } else {
    return ``;
  }
};

export default class TripDay {
  constructor(day, index) {
    this._day = day;
    this._index = index;
    this._element = null;
  }

  getTemplate() {
    return createTripItemTemplate(this._day, this._index);
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
