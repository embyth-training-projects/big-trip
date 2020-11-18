import TripInfoView from './view/trip-info';
import MenuPresenter from './presenter/menu';
import TimelinePresenter from './presenter/timeline';
import FilterPresenter from './presenter/filter';
import EventsModel from './model/events';
import FilterModel from './model/filter';
import {generateTrip} from './mock/trip';
import {render} from './utils/render';
import {TRIP_EVENTS_COUNT, RenderPosition} from './const';

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`.trip-main__trip-controls`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
const filterModel = new FilterModel();

eventsModel.setEvents(events);

const timelinePresenter = new TimelinePresenter(tripEventsElement, filterModel, eventsModel);
const menuPresenter = new MenuPresenter(menuContainer, timelinePresenter);
const filterPresenter = new FilterPresenter(filterContainer, filterModel, eventsModel);

render(tripMainElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);

menuPresenter.init();
filterPresenter.init();
timelinePresenter.init();
