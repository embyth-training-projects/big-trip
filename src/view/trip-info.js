import {formatMonthDate, createElement} from '../utils';
import {MAX_CITIES_DISPLAY, TEXT_DIVIDER} from '../const';

const getTripCitiesName = (events) => {
  let cities = events.map((item) => item.city.name);

  if (cities.length < MAX_CITIES_DISPLAY) {
    return `${cities.join(TEXT_DIVIDER)}`;
  } else {
    return `${cities[0]}${TEXT_DIVIDER}...${TEXT_DIVIDER}${cities[cities.length - 1]}`;
  }
};

const getTripDates = (events) => {
  let dates = events.map((item) => item.dateRange);
  const startDate = dates[0][0];
  const endDate = dates[dates.length - 1][1];

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${formatMonthDate(startDate)}${TEXT_DIVIDER}${endDate.getDate()}`;
  } else {
    return `${formatMonthDate(startDate)}${TEXT_DIVIDER}${formatMonthDate(endDate)}`;
  }
};

const getTotalTripCost = (events) => {
  return events.reduce((total, item) => total + item.price, 0);
};

const createTripInfoTemplate = (events) => {
  const route = getTripCitiesName(events);
  const dates = getTripDates(events);
  const totalCost = getTotalTripCost(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
  );
};

export default class TripInfo {
  constructor(events) {
    this._events = events;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._events);
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
