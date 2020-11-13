import MenuView from './view/menu';
import FilterView from './view/filter';
import NewEventButtonView from './view/new-event-button';
import TripInfoView from './view/trip-info';
import SortView from './view/sort';
import TripListView from './view/trip-list';
import TripDayView from './view/trip-item';
import TripEventView from './view/trip-event';
import TripFormView from './view/trip-form';
import NoEventView from './view/no-event';
import {generateTrip} from './mock/trip';
import {getTripDays, filterEventsByDay} from './utils/trip';
import {render, replace} from './utils/render';
import {TRIP_EVENTS_COUNT, RenderPosition, KeyCode} from './const';

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`h2:nth-child(1)`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, new TripInfoView(events), RenderPosition.AFTERBEGIN);
render(menuContainer, new MenuView(), RenderPosition.AFTEREND);
render(filterContainer, new FilterView(), RenderPosition.AFTEREND);
render(tripMainElement, new NewEventButtonView(), RenderPosition.BEFOREEND);

const addEventsActions = (eventComponent, eventEditComonent) => {
  const replacePointToForm = () => {
    replace(eventEditComonent, eventComponent);
  };

  const replaceFormToPoint = () => {
    replace(eventComponent, eventEditComonent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.keyCode === KeyCode.ESC || evt.key === `Esc` || evt.code === `Escape`) {
      evt.preventDefault();
      replaceFormToPoint();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replacePointToForm();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComonent.setFormSubmitHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  eventEditComonent.setFormResetHandler(() => {
    replaceFormToPoint();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });
};

const createEventsList = () => {
  const eventsListComponent = new TripListView(events);

  getTripDays(events).forEach((day, index) => {
    const tripDayComponent = new TripDayView(day, index + 1);
    render(eventsListComponent, tripDayComponent, RenderPosition.BEFOREEND);
    const filteredEventsByDay = filterEventsByDay(events, day);

    filteredEventsByDay.forEach((event) => {
      const eventComponent = new TripEventView(event);
      const eventEditComonent = new TripFormView(event);

      const eventDayContainer = tripDayComponent.getElement().querySelector(`.trip-events__list[data-day="${day}"]`);
      render(eventDayContainer, eventComponent, RenderPosition.BEFOREEND);
      addEventsActions(eventComponent, eventEditComonent);
    });
  });

  return eventsListComponent;
};

if (events.length) {
  render(tripEventsElement, new SortView(), RenderPosition.BEFOREEND);
  render(tripEventsElement, createEventsList(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new NoEventView(), RenderPosition.BEFOREEND);
}

