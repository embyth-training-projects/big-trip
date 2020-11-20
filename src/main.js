import EventsModel from './model/events';
import FilterModel from './model/filter';
import OffersModel from './model/offers';

import InfoPresenter from './presenter/info';
import MenuPresenter from './presenter/menu';
import TimelinePresenter from './presenter/timeline';
import FilterPresenter from './presenter/filter';
import StatisticsPresenter from './presenter/statistics';

import Api from './api';

import {generateTrip, generateOffers} from './mock/trip';
import {TRIP_EVENTS_COUNT} from './const';

const AUTHORIZATION = `Basic 249u1jnlknijvfg=`;
const END_POINT = `https://12.ecmascript.pages.academy/big-trip`;

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());
const offers = generateOffers();

const api = new Api(END_POINT, AUTHORIZATION);

api.getEvents().then((responseEvents) => console.log(responseEvents));

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();
const offersModel = new OffersModel();

eventsModel.setEvents(events);
offersModel.setOffers(offers);

const infoPresenter = new InfoPresenter(tripMainElement, eventsModel);
const timelinePresenter = new TimelinePresenter(tripEventsElement, filterModel, eventsModel, offersModel);
const statisticsPresenter = new StatisticsPresenter(tripEventsElement, eventsModel);
const menuPresenter = new MenuPresenter(menuContainer, timelinePresenter, statisticsPresenter);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, eventsModel);

infoPresenter.init();
menuPresenter.init();
filterPresenter.init();
timelinePresenter.init();
