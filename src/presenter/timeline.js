import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import TripDayView from '../view/trip-item';
import EventPresenter from './event';
import NoEventView from '../view/no-event';
import LoadingView from '../view/loading';
import NewEventPresenter from './new-event';
import {render, remove} from '../utils/render';
import {filter} from '../utils/filter';
import {getTripDays, filterEventsByDay, sortEventsByTime, sortEventsByPrice} from '../utils/trip';
import {RenderPosition, SortType, UserAction, UpdateType, FilterType} from '../const';

export default class Timeline {
  constructor(timelineContainer, filterModel, eventsModel, offersModel, destinationsModel, api) {
    this._timelineContainer = timelineContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._api = api;

    this._eventPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;

    this._sortComponent = null;
    this._newEventButtonComponent = null;

    this._timelineComponent = new TripListView(this._getEvents());
    this._noEventsComponent = new NoEventView();
    this._loadingComponent = new LoadingView();

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._newEventPresenter = new NewEventPresenter(this._timelineComponent, this._handleViewAction);
  }

  init() {
    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);

    this._renderTimeline();
  }

  destroy() {
    this._clearTimeline({resetSortType: true});

    this._eventsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createEvent(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._newEventPresenter.init(callback, this._getOffers(), this._getDestinations());
  }

  _getEvents() {
    const filterType = this._filterModel.getFilter();
    const events = this._eventsModel.getEvents();
    const filteredEvents = filter[filterType](events);

    switch (this._currentSortType) {
      case SortType.TIME:
        return filteredEvents.sort(sortEventsByTime);
      case SortType.PRICE:
        return filteredEvents.sort(sortEventsByPrice);
    }

    return filteredEvents;
  }

  _getOffers() {
    return this._offersModel.getOffers();
  }

  _getDestinations() {
    return this._destinationsModel.getDestinations();
  }

  _handleModeChange() {
    this._newEventPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this._api.updateEvent(update)
          .then((response) => this._eventsModel.updateEvent(updateType, response));
        break;
      case UserAction.ADD_EVENT:
        this._api.addEvent(update)
          .then((response) => this._eventsModel.addEvent(updateType, response));
        break;
      case UserAction.DELETE_EVENT:
        this._api.deleteEvent(update)
          .then(() => this._eventsModel.deleteEvent(updateType, update));
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._eventPresenter[data.id].init(data, this._getOffers(), this._getDestinations());
        break;
      case UpdateType.MINOR:
        this._clearTimeline();
        this._renderTimeline();
        break;
      case UpdateType.MAJOR:
        this._clearTimeline({resetSortType: true});
        this._renderTimeline();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        this._clearTimeline({resetSortType: true});
        this._renderTimeline();
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
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._timelineContainer, this._sortComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._timelineContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }

  _renderEvent(event, container) {
    const eventPresenter = new EventPresenter(container, this._handleViewAction, this._handleModeChange);
    eventPresenter.init(event, this._getOffers(), this._getDestinations());
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
    render(this._timelineContainer, this._timelineComponent, RenderPosition.BEFOREEND);
    this._renderEvents();
  }

  _renderNoEvents() {
    render(this._timelineContainer, this._noEventsComponent, RenderPosition.BEFOREEND);
  }

  _clearTimeline({resetSortType = false} = {}) {
    this._newEventPresenter.destroy();

    Object
      .values(this._eventPresenter)
      .forEach((presenter) => presenter.destroy());
    this._eventPresenter = {};

    remove(this._sortComponent);
    remove(this._noEventsComponent);
    remove(this._loadingComponent);
    remove(this._timelineComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderTimeline() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (!this._getEvents().length) {
      this._renderNoEvents();
      return;
    }

    this._renderSort();
    this._renderEventsList();
  }
}
