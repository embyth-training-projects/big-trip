import {createSiteMenuTemplate} from './view/site-menu';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripSortTemplate} from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import {createTripItemTemplate} from './view/trip-item';
import {createTripFormTemplate} from './view/trip-form';

const DAYS_COUNT = 3;

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
for (let i = 0; i < DAYS_COUNT; i++) {
  render(tripListElement, createTripItemTemplate(), `beforeend`);
}
