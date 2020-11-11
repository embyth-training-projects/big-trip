import SiteMenuView from './view/site-menu';
import {createTripInfoTemplate} from './view/trip-info';
import {createTripSortTemplate} from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import {createTripFormTemplate} from './view/trip-form';
import {generateTrip} from './mock/trip';
import {renderTemplate, renderElement} from './utils';
import {TRIP_EVENTS_COUNT, RenderPosition} from './const';

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const siteHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
renderTemplate(tripMainElement, createTripInfoTemplate(events), `beforeend`);
renderElement(tripMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
renderTemplate(tripEventsElement, createTripSortTemplate(), `beforeend`);
renderTemplate(tripEventsElement, createTripFormTemplate(events[0]), `beforeend`);
renderTemplate(tripEventsElement, createTripListTemplate(events.slice(1)), `beforeend`);
