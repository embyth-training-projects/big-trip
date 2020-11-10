import {createSiteMenuTemplate} from './view/site-menu';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripSortTemplate} from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import {createTripItemTemplate} from './view/trip-item';
import {createTripFormTemplate} from './view/trip-form';
import {generateTrip} from './mock/trip';

const TRIP_EVENTS = 20;

const events = new Array(TRIP_EVENTS).fill().map(generateTrip);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
render(tripMainElement, createTripInfoTemplate(), `beforeend`);
render(tripMainElement, createSiteMenuTemplate(), `beforeend`);

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
render(tripEventsElement, createTripSortTemplate(), `beforeend`);
render(tripEventsElement, createTripFormTemplate(), `beforeend`);
render(tripEventsElement, createTripListTemplate(), `beforeend`);

const tripListElement = siteMainElement.querySelector(`.trip-days`);
for (let i = 0; i < TRIP_EVENTS; i++) {
  render(tripListElement, createTripItemTemplate(events[i]), `beforeend`);
}
