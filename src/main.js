import MenuView from './view/menu';
import FilterView from './view/filter';
import NewEventButtonView from './view/new-event-button';
import TripInfoView from './view/trip-info';
import TimelinePresenter from './presenter/timeline';
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
const menuContainer = tripMainElement.querySelector(`h2:nth-child(1)`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

const eventsModel = new EventsModel();
eventsModel.setEvents(events);

const filterModel = new FilterModel();

const timelinePresenter = new TimelinePresenter(tripEventsElement, eventsModel);

render(tripMainElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
render(menuContainer, new MenuView(), RenderPosition.AFTEREND);
render(filterContainer, new FilterView(`everything`), RenderPosition.AFTEREND);
render(tripMainElement, new NewEventButtonView(), RenderPosition.BEFOREEND);

timelinePresenter.init();
