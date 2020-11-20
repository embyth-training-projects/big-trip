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

  updateEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      update,
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addEvent(updateType, update) {
    this._events = [
      update,
      ...this._events
    ];

    this._notify(updateType, update);
  }

  deleteEvent(updateType, update) {
    const index = this._events.findIndex((event) => event.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting event`);
    }

    this._events = [
      ...this._events.slice(0, index),
      ...this._events.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(event) {
    return {
      city: {
        name: event.destination.name,
        description: event.destination.description,
        photos: event.destination.pictures,
      },
      type: {
        name: event.type,
        offers: event.offers,
      },
      price: event.base_price,
      dateRange: [event.date_from, event.date_to],
      id: event.id,
      isFavorite: event.is_favorite
    };
  }

  static adaptToServer(event) {
    return {
      "base_price": event.price,
      "date_from": event.dateRange[0].toISOString(),
      "date_to": event.dateRange[1].toISOString(),
      "destination": {
        name: event.city.name,
        description: event.city.description,
        pictures: event.city.photos,
      },
      "id": event.id,
      "is_favorite": event.isFavorite,
      "offers": event.type.offers,
      "type": event.type.name
    };
  }
}
