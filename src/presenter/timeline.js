import SortView from './view/sort';
import TripListView from './view/trip-list';
import TripDayView from './view/trip-item';
import TripEventView from './view/trip-event';
import TripFormView from './view/trip-form';
import NoEventView from './view/no-event';

export default class Timeline {
  constructor(timelineContainer) {
    this._timelineContainer = timelineContainer;

    this._timelineComponent = null;

    this._sortComponent = new SortView();
    this._noEventsComponent = new NoEventView();
  }

  init(events) {
    this._timelineEvents = events.slice();
  }

  _renderSort() {

  }

  _renderEvent() {

  }

  _renderEvents() {

  }

  _renderNoEvents() {

  }

  _renderTimeline() {

  }
}
