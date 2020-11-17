import Observer from './observer';

export default class Events extends Observer {
  constructor() {
    super();

    this._events = [];
  }

  setEvents(events) {
    this._events = events.slice();
  }

  getEvents() {
    return this._events;
  }
}
