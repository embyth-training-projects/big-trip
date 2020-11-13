import AbstractView from './abstract';
import {formatEventType, formatTime} from '../utils';
import {MAX_OFFERS_DISPLAY} from '../const';

const createOfferItemTemplate = (offer) => {
  const {label, price} = offer;

  return (
    `<li class="event__offer">
      <span class="event__offer-title">${label}</span>
      &plus;
      &euro;&nbsp;<span class="event__offer-price">${price}</span>
    </li>`
  );
};

const createOffersTemplate = (offers) => {
  if (offers.length) {
    return (
      `<h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers
          .filter((offer) => offer.isChecked)
          .slice(0, MAX_OFFERS_DISPLAY)
          .map(createOfferItemTemplate)
          .join(``)}
      </ul>`
    );
  } else {
    return ``;
  }
};

const getDuration = (dateRange) => {
  const [d1, d2] = dateRange;
  const interval = new Date(d2 - d1);

  const diffDay = interval.getUTCDate() - 1 ? `${interval.getUTCDate() - 1}D` : ``;
  const diffHour = interval.getUTCHours() ? `${interval.getUTCHours()}H` : ``;
  const diffMinutes = interval.getUTCMinutes() ? `${interval.getUTCMinutes()}M` : ``;

  return `${diffDay} ${diffHour} ${diffMinutes}`;
};

const createTripEventTemplate = (event) => {
  const {city, type, price, dateRange} = event;
  const {name: cityName} = city;
  const {name: typeName, offers} = type;

  const startTime = formatTime(dateRange[0]);
  const endTime = formatTime(dateRange[1]);
  const formattedStartTime = dateRange[0].toISOString();
  const formattedEndTime = dateRange[1].toISOString();
  const typeWithLabel = formatEventType(typeName);
  const duration = getDuration(dateRange);

  const offersTemplate = createOffersTemplate(offers);

  return (
    `<li class="trip-events__item">
      <div class="event">
        <div class="event__type">
          <img class="event__type-icon" width="42" height="42" src="img/icons/${typeName}.png" alt="Event type icon">
        </div>
        <h3 class="event__title">${typeWithLabel} ${cityName}</h3>

        <div class="event__schedule">
          <p class="event__time">
            <time class="event__start-time" datetime="${formattedStartTime}">${startTime}</time>
            &mdash;
            <time class="event__end-time" datetime="${formattedEndTime}">${endTime}</time>
          </p>
          <p class="event__duration">${duration}</p>
        </div>

        <p class="event__price">
          &euro;&nbsp;<span class="event__price-value">${price}</span>
        </p>

        ${offersTemplate}

        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </div>
    </li>`
  );
};

export default class TripEvent extends AbstractView {
  constructor(event) {
    super();

    this._event = event;

    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createTripEventTemplate(this._event);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._editClickHandler);
  }
}
