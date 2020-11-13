import AbstractView from './abstract';

const createTripListTemplate = () => {
  return (
    `<ul class="trip-days"></ul>`
  );
};

export default class TripList extends AbstractView {
  constructor(events) {
    super();

    this._events = events;
  }

  getTemplate() {
    return createTripListTemplate(this._events);
  }
}
