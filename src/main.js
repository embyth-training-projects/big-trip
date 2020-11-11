import SiteMenuView from './view/site-menu';
import TripInfoView from './view/trip-info';
import SortView from './view/sort';
import {createTripListTemplate} from './view/trip-list';
import TripFormView from './view/trip-form';
import {generateTrip} from './mock/trip';
import {renderTemplate, renderElement} from './utils';
import {TRIP_EVENTS_COUNT, RenderPosition} from './const';

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const siteHeaderElement = document.querySelector(`.page-header`);
const tripMainElement = siteHeaderElement.querySelector(`.trip-main`);
renderElement(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.BEFOREEND);
renderElement(tripMainElement, new SiteMenuView().getElement(), RenderPosition.BEFOREEND);

const siteMainElement = document.querySelector(`.page-main`);
const tripEventsElement = siteMainElement.querySelector(`.trip-events`);
renderElement(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
renderElement(tripEventsElement, new TripFormView(events[0]).getElement(), RenderPosition.BEFOREEND);
renderTemplate(tripEventsElement, createTripListTemplate(events.slice(1)), `beforeend`);
