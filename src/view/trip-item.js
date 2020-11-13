import AbstractView from './abstract';
import {formatMonthDate} from '../utils/trip';

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

export default class TripDay extends AbstractView {
  constructor(day, index) {
    super();

    this._day = day;
    this._index = index;
  }

  getTemplate() {
    return createTripItemTemplate(this._day, this._index);
  }
}
