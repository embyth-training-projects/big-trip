import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import TripDayView from '../view/trip-item';
import EventPresenter from './event';
import NoEventView from '../view/no-event';
import {updateItem} from '../utils/common';
import {render, remove} from '../utils/render';
import {getTripDays, filterEventsByDay, sortEventsByTime, sortEventsByPrice} from '../utils/trip';
import {RenderPosition, SortType} from '../const';

export default class Timeline {
  constructor(timelineContainer) {
    this._timelineContainer = timelineContainer;

    this._currentSortType = SortType.DEFAULT;

    this._timelineEvents = null;
    this._timelineComponent = null;

    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventView();

    this._handleEventChange = this._handleEventChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(events) {
    this._timelineEvents = events.slice();
    this._sourcedEvents = events.slice();

    this._timelineComponent = new TripListView(this._timelineEvents);

    this._renderTimeline();
  }

  _handleEventChange(updatedEvent) {
    this._timelineEvents = updateItem(this._timelineEvents, updatedEvent);
    this._sourcedEvents = updateItem(this._sourcedEvents, updatedEvent);
    this._eventPresenter[updatedEvent.id].init(updatedEvent);
  }

  _sortEvents(sortType) {
    switch (sortType) {
      case SortType.TIME:
        this._timelineEvents.sort(sortEventsByTime);
        break;
      case SortType.PRICE:
        this._timelineEvents.sort(sortEventsByPrice);
        break;
      default:
        this._timelineEvents = this._sourcedEvents.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortEvents(sortType);
    this._clearTimeline();
    this._renderTimeline();
  }

  _renderSort() {
    this._sortComponent.updateCurrentSortType(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._timelineContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event, container) {
    const eventPresenter = new EventPresenter(container);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    if (this._currentSortType === SortType.DEFAULT) {
      getTripDays(this._timelineEvents).forEach((day, index) => {
        const tripDayComponent = new TripDayView(day, index + 1);

        render(this._timelineComponent, tripDayComponent, RenderPosition.BEFOREEND);
        const filteredEventsByDay = filterEventsByDay(this._timelineEvents, day);

        filteredEventsByDay.forEach((event) => {
          this._renderEvent(event, tripDayComponent.getContainer(day));
        });
      });
    }

    const tripDayComponent = new TripDayView();
    this._timelineEvents.forEach((event) => {
      render(this._timelineComponent, tripDayComponent, RenderPosition.BEFOREEND);
      this._renderEvent(event, tripDayComponent.getContainer());
    });
  }

  _renderEventsList() {
    render(this._timelineContainer, this._timelineComponent, RenderPosition.BEFOREEND);
  }

  _renderNoEvents() {
    render(this._timelineContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _clearTimeline() {
    remove(this._sortComponent);
    remove(this._timelineComponent);
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};
  }

  _renderTimeline() {
    if (!this._timelineEvents.length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
    this._renderEvents();
  }
}
