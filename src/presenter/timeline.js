import SortView from './view/sort';
import TripListView from './view/trip-list';
import TripDayView from './view/trip-item';
import TripEventView from './view/trip-event';
import TripFormView from './view/trip-form';
import NoEventView from './view/no-event';
import {render, replace} from '../utils/render';
import {getTripDays, filterEventsByDay} from '../utils/trip';
import {RenderPosition, KeyCode} from '../const';

export default class Timeline {
  constructor(timelineContainer) {
    this._timelineContainer = timelineContainer;

    this._timelineEvents = null;
    this._timelineComponent = null;

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventView();
  }

  init(events) {
    this._timelineEvents = events.slice();

    this._timelineComponent = new TripListView(this._timelineEvents);
    render(this._timelineContainer, this._timelineComponent, RenderPosition.BEFOREEND);

    this._renderTimeline();
  }

  _renderSort() {
    render(this._timelineContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event, container) {
    const eventComponent = new TripEventView(event);
    const eventEditComonent = new TripFormView(event);

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

    render(container, eventComponent, RenderPosition.BEFOREEND);
  }

  _renderEvents() {
    getTripDays(this._timelineEvents).forEach((day, index) => {
      const tripDayComponent = new TripDayView(day, index + 1);
      render(this._timelineComponent, tripDayComponent, RenderPosition.BEFOREEND);
      const filteredEventsByDay = filterEventsByDay(this._timelineEvents, day);

      filteredEventsByDay.forEach((event) => {
        this._renderEvent(event, tripDayComponent.getContainerByDay(day));
      });
    });
  }

  _renderNoEvents() {
    render(this._timelineContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _renderTimeline() {
    if (!this._timelineEvents.length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEvents();
  }
}
