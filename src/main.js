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
import {renderElement, getTripDays, filterEventsByDay} from './utils';
import {TRIP_EVENTS_COUNT, RenderPosition} from './const';

const events = new Array(TRIP_EVENTS_COUNT)
  .fill()
  .map(generateTrip)
  .sort((a, b) => a.dateRange[0].getTime() - b.dateRange[0].getTime());

const tripMainElement = document.querySelector(`.trip-main`);
const menuContainer = tripMainElement.querySelector(`h2:nth-child(1)`);
const filterContainer = tripMainElement.querySelector(`h2:nth-child(2)`);
const tripEventsElement = document.querySelector(`.trip-events`);

renderElement(tripMainElement, new TripInfoView(events).getElement(), RenderPosition.AFTERBEGIN);
renderElement(menuContainer, new MenuView().getElement(), RenderPosition.AFTEREND);
renderElement(filterContainer, new FilterView().getElement(), RenderPosition.AFTEREND);
renderElement(tripMainElement, new NewEventButtonView().getElement(), RenderPosition.BEFOREEND);

const createEventsList = () => {
  const eventsListComponent = new TripListView(events);

  getTripDays(events).forEach((day, index) => {
    const tripDayComponent = new TripDayView(day, index + 1);
    renderElement(eventsListComponent.getElement(), tripDayComponent.getElement(), RenderPosition.BEFOREEND);
    const filteredEventsByDay = filterEventsByDay(events, day);

    filteredEventsByDay.forEach((event) => {
      const eventComponent = new TripEventView(event);
      const eventEditComonent = new TripFormView(event);

      renderElement(tripDayComponent.getElement().querySelector(`.trip-events__list[data-day="${day}"]`), eventComponent.getElement(), RenderPosition.BEFOREEND);
    });
  });

  return eventsListComponent;
};

if (events.length) {
  renderElement(tripEventsElement, new SortView().getElement(), RenderPosition.BEFOREEND);
  renderElement(tripEventsElement, createEventsList().getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(tripEventsElement, new NoEventView().getElement(), RenderPosition.BEFOREEND);
}

