import TripFormView from '../view/trip-form';
import {remove, render} from '../utils/render';
import {RenderPosition, UserAction, UpdateType, KeyCode, EVENT_TYPE} from '../const';
import {generateId, generateOffers} from '../mock/trip';

const BLANK_EVENT = {
  city: {
    name: ``,
    description: ``,
    photos: [],
  },
  type: {
    name: EVENT_TYPE.TRANSFER[0],
    offers: generateOffers(EVENT_TYPE.TRANSFER[0]),
  },
  price: 0,
  dateRange: [new Date(), new Date()].sort((a, b) => a.getTime() - b.getTime()),
  isFavorite: false,
};

export default class NewEvent {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._isNewEvent = true;
    this._event = BLANK_EVENT;

    this._eventEditComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init() {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._eventEditComponent = new TripFormView(this._event, this._isNewEvent);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._eventEditComponent.setDatepickers();

    render(this._eventListContainer, this._eventEditComponent, RenderPosition.BEFOREBEGIN);

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._eventEditComponent === null) {
      return;
    }

    this._eventEditComponent.destroyDatepickers();
    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        Object.assign({id: generateId()}, event)
    );

    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.keyCode === KeyCode.ESC || evt.key === `Esc` || evt.code === `Escape`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
