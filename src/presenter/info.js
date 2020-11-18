import TripInfoView from '../view/trip-info';
import {render, replace, remove} from '../utils/render';
import {RenderPosition} from '../const';

export default class Info {
  constructor(infoContainer, eventsModel) {
    this._infoContainer = infoContainer;
    this._eventsModel = eventsModel;

    this._infoComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._eventsModel.addObserver(this._handleModelEvent);
  }

  init() {
    const events = this._eventsModel.getEvents();

    const prevInfoComponent = this._infoComponent;
    this._infoComponent = new TripInfoView(events);

    if (prevInfoComponent === null) {
      render(this._infoContainer, this._infoComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._infoComponent, prevInfoComponent);
    remove(prevInfoComponent);
  }

  _handleModelEvent() {
    this.init();
  }
}
