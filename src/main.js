import {createSiteMenuTemplate} from './view/site-menu';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripSortTemplate} from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import {createTripFormTemplate} from './view/trip-form';
import {generateTrip} from './mock/trip';

const TRIP_EVENTS_COUNT = 20;

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
render(tripMainElement, createTripInfoTemplate(events), `beforeend`);
render(tripMainElement, createSiteMenuTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripFormTemplate(events[0]), `beforeend`);
render(tripEventsElement, createTripListTemplate(events.slice(1)), `beforeend`);
