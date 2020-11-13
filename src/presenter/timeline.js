import SortView from './view/sort';
import TripListView from './view/trip-list';
import TripDayView from './view/trip-item';
import TripEventView from './view/trip-event';
import TripFormView from './view/trip-form';
import NoEventView from './view/no-event';
import {render} from '../utils/render';
import {RenderPosition} from '../const';

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

  _renderEvent() {

  }

  _renderEvents() {

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
