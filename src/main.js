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
import {render, getTripDays, filterEventsByDay} from './utils';
import {TRIP_EVENTS_COUNT, RenderPosition, KeyCode} from './const';

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`h2:nth-child(1)`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

render(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);
render(menuContainer, new MenuView().getElement(), RenderPosition.AFTEREND);
render(filterContainer, new FilterView().getElement(), RenderPosition.AFTEREND);
render(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFOREEND);

const addEventsActions = (eventContainer, eventComponent, eventEditComonent) => {
  const replacePointToForm = () => {
    eventContainer.replaceChild(eventEditComonent.getElement(), eventComponent.getElement());
  };

  const replaceFormToPoint = () => {
    eventContainer.replaceChild(eventComponent.getElement(), eventEditComonent.getElement());
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
    render(eventsListComponent.getElement(), tripDayComponent.getElement(), RenderPosition.BEFOREEND);
    const filteredEventsByDay = filterEventsByDay(events, day);

    filteredEventsByDay.forEach((event) => {
      const eventComponent = new TripEventView(event);
      const eventEditComonent = new TripFormView(event);

      const eventDayContainer = tripDayComponent.getElement().querySelector(`.trip-events__list[data-day="${day}"]`);
      render(eventDayContainer, eventComponent.getElement(), RenderPosition.BEFOREEND);
      addEventsActions(eventDayContainer, eventComponent, eventEditComonent);
    });
  });

  return eventsListComponent;
};

if (events.length) {
  render(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  render(tripEventsElement, createEventsList().getElement(), RenderPosition.BEFOREEND);
} else {
  render(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
}

