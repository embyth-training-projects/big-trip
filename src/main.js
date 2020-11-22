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

import {UpdateType} from './const';

const AUTHORIZATION = `Basic 249u1jnlknijvfg=`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const api = new Api(END_POINT, AUTHORIZATION);

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const infoPresenter = new InfoPresenter(tripMainElement, eventsModel);
const timelinePresenter = new TimelinePresenter(tripEventsElement, filterModel, eventsModel, offersModel, destinationsModel, api);
const statisticsPresenter = new StatisticsPresenter(tripEventsElement, eventsModel);
const menuPresenter = new MenuPresenter(menuContainer, timelinePresenter, statisticsPresenter, eventsModel);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, eventsModel);

infoPresenter.init();
menuPresenter.init();
filterPresenter.init();
timelinePresenter.init();

Promise.all([
  api.getEvents(),
  api.getOffers(),
  api.getDestinations()
]).then((response) => {
  const [events, offers, destinations] = response;

  offersModel.setOffers(offers);
  destinationsModel.setDestinations(destinations);
  eventsModel.setEvents(UpdateType.INIT, events);
}).catch((error) => {
  throw new Error(`Something went wrong! ${error.status}: ${error.statusText}`);
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => console.log(`ServiceWorker available!`)) // eslint-disable-line
    .catch(() => console.log(`ServiceWorker isn't available!`)); // eslint-disable-line
});
