import {nanoid} from 'nanoid';
import EventsModel from '../model/events';
import OffersModel from '../model/offers';

const createEventsStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

const getSyncedEvents = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.point);
};

export default class Provider {
  constructor(api, eventsStore, offersStore, destinationsStore) {
    this._api = api;
    this._eventsStore = eventsStore;
    this._offersStore = offersStore;
    this._destinationsStore = destinationsStore;
  }

  getEvents() {
    if (Provider.isOnline()) {
      return this._api.getEvents()
        .then((events) => {
          const items = createEventsStructure(events.map(EventsModel.adaptToServer));
          this._eventsStore.setItems(items);
          return events;
        });
    }

    const storeEvents = Object.values(this._eventsStore.getItems());
    return Promise.resolve(storeEvents.map(EventsModel.adaptToClient));
  }

  getOffers() {
    if (Provider.isOnline()) {
      return this._api.getOffers()
        .then((offers) => {
          const items = offers.map(OffersModel.adaptToServer);
          this._offersStore.setItems(items);
          return offers;
        });
    }

    const storeOffers = this._offersStore.getItems();
    return Promise.resolve(storeOffers.map(OffersModel.adaptToClient));
  }

  getDestinations() {
    if (Provider.isOnline()) {
      return this._api.getDestinations()
        .then((destinations) => {
          this._destinationsStore.setItems(destinations);
          return destinations;
        });
    }

    const storeDestination = this._destinationsStore.getItems();
    return Promise.resolve(storeDestination);
  }

  updateEvent(event) {
    if (Provider.isOnline()) {
      return this._api.updateEvent(event)
        .then((updatedEvent) => {
          this._eventsStore.setItem(updatedEvent.id, EventsModel.adaptToServer(updatedEvent));
          return updatedEvent;
        });
    }

    this._eventsStore.setItem(event.id, EventsModel.adaptToServer(Object.assign({}, event)));
    return Promise.resolve(event);
  }

  addEvent(event) {
    if (Provider.isOnline()) {
      return this._api.addEvent(event)
        .then((newEvent) => {
          this._eventsStore.setItem(newEvent.id, EventsModel.adaptToServer(newEvent));
          return newEvent;
        });
    }

    const localNewEventId = nanoid();
    const localNewEvent = Object.assign({}, event, {id: localNewEventId});
    this._eventsStore.setItem(localNewEvent.id, EventsModel.adaptToServer(localNewEvent));
    return Promise.resolve(localNewEvent);
  }

  deleteEvent(event) {
    if (Provider.isOnline()) {
      return this._api.deleteEvent(event)
        .then(() => this._eventsStore.removeItem(event.id));
    }

    this._eventsStore.removeItem(event.id);
    return Promise.resolve();
  }

  sync() {
    if (Provider.isOnline()) {
      const storeEvents = Object.values(this._eventsStore.getItems());

      return this._api.sync(storeEvents)
        .then((response) => {
          const createdEvents = response.created;
          const updatedEvents = getSyncedEvents(response.updated);

          const items = createEventsStructure([...createdEvents, ...updatedEvents]);
          this._eventsStore.setItems(items);
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }

  static isOnline() {
    return window.navigator.onLine;
  }
}
