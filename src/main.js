import EventsModel from './model/events';
import FilterModel from './model/filter';
import OffersModel from './model/offers';
import DestinationsModel from './model/destinations';

import InfoPresenter from './presenter/info';
import MenuPresenter from './presenter/menu';
import TimelinePresenter from './presenter/timeline';
import FilterPresenter from './presenter/filter';
import StatisticsPresenter from './presenter/statistics';

import Api from './api/index';
import Store from './api/store';
import Provider from './api/provider';

import {UpdateType, StoreType} from './const';

const AUTHORIZATION = `Basic 249u1jnlk55nijvfg=`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;
const STORE_PREFIX = `big-trip-localstorage`;
const STORE_VER = `v1`;
const STORE_EVENTS_NAME = `${STORE_PREFIX}-${StoreType.EVENTS}-${STORE_VER}`;
const STORE_OFFERS_NAME = `${STORE_PREFIX}-${StoreType.OFFERS}-${STORE_VER}`;
const STORE_DESTINATIONS_NAME = `${STORE_PREFIX}-${StoreType.DESTINATIONS}-${STORE_VER}`;

const api = new Api(END_POINT, AUTHORIZATION);
const eventsStore = new Store(STORE_EVENTS_NAME, window.localStorage);
const offersStore = new Store(STORE_OFFERS_NAME, window.localStorage);
const destinationsStore = new Store(STORE_DESTINATIONS_NAME, window.localStorage);
const apiWithProvider = new Provider(api, eventsStore, offersStore, destinationsStore);

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const infoPresenter = new InfoPresenter(tripMainElement, eventsModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, eventsModel);
const timelinePresenter = new TimelinePresenter(tripEventsElement, filterModel, eventsModel, offersModel, destinationsModel, apiWithProvider);
const statisticsPresenter = new StatisticsPresenter(tripEventsElement, eventsModel);
const menuPresenter = new MenuPresenter(menuContainer, timelinePresenter, statisticsPresenter, filterPresenter, eventsModel);

infoPresenter.init();
menuPresenter.init();
filterPresenter.init();
timelinePresenter.init();

Promise.all([
  apiWithProvider.getEvents(),
  apiWithProvider.getOffers(),
  apiWithProvider.getDestinations()
]).then((response) => {
  const [events, offers, destinations] = response;

  offersModel.setOffers(offers);
  destinationsModel.setDestinations(destinations);
  eventsModel.setEvents(UpdateType.INIT, events);
}).catch(() => {
  throw new Error(`Something went wrong!`);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => console.log(`ServiceWorker available!`)) // eslint-disable-line
    .catch(() => console.log(`ServiceWorker isn't available!`)); // eslint-disable-line
});

window.addEventListener(`online`, () => {
  document.title = document.title.replace(` [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += ` [offline]`;
});
