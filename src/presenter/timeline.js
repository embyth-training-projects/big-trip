import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import TripDayView from '../view/trip-item';
import EventPresenter from './event';
import NoEventView from '../view/no-event';
import {render, remove} from '../utils/render';
import {getTripDays, filterEventsByDay, sortEventsByTime, sortEventsByPrice} from '../utils/trip';
import {RenderPosition, SortType, UserAction, UpdateType} from '../const';

export default class Timeline {
  constructor(timelineContainer, eventsModel) {
    this._timelineContainer = timelineContainer;
    this._eventsModel = eventsModel;

    this._currentSortType = SortType.DEFAULT;

    this._timelineComponent = null;

    this._eventPresenter = {};

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderTimeline();
  }

  _getEvents() {
    switch (this._currentSortType) {
      case SortType.TIME:
        return this._eventsModel.getEvents().sort(sortEventsByTime);
      case SortType.PRICE:
        return this._eventsModel.getEvents().sort(sortEventsByPrice);
    }

    return this._eventsModel.getEvents();
  }

  _handleModeChange() {
    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._eventsModel.updateEvent(updateType, update);
        break;
      case UserAction.ADD_EVENT:
        this._eventsModel.addEvent(updateType, update);
        break;
      case UserAction.DELETE_EVENT:
        this._eventsModel.deleteEvent(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // обновить список
        break;
      case UpdateType.MAJOR:
        // обновить весю ленту
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTimeline();
    this._renderTimeline();
  }

  _renderSort() {
    this._sortComponent.updateCurrentSortType(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._timelineContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event, container) {
    const eventPresenter = new EventPresenter(container, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event);
    this._eventPresenter[event.id] = eventPresenter;
  }

  _renderEvents() {
    // Если сортировка по умолчанию (Event) отрисовываем список с датами
    if (this._currentSortType === SortType.DEFAULT) {
      getTripDays(this._getEvents()).forEach((day, index) => {
        const tripDayComponent = new TripDayView(day, index + 1);

        render(this._timelineComponent, tripDayComponent, RenderPosition.BEFOREEND);
        const filteredEventsByDay = filterEventsByDay(this._getEvents(), day);

        filteredEventsByDay.forEach((event) => {
          this._renderEvent(event, tripDayComponent.getContainer(day));
        });
      });
    } else { // В противном случаем список отрисовывается без дат
      const tripDayComponent = new TripDayView();
      this._getEvents().forEach((event) => {
        render(this._timelineComponent, tripDayComponent, RenderPosition.BEFOREEND);
        this._renderEvent(event, tripDayComponent.getContainer());
      });
    }
  }

  _renderEventsList() {
    this._timelineComponent = new TripListView(this._getEvents());
    render(this._timelineContainer, this._timelineComponent, RenderPosition.BEFOREEND);
    this._renderEvents();
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
    if (!this._getEvents().length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
  }
}
