import TripFormView from '../view/trip-form';
import {remove, render} from '../utils/render';
import {RenderPosition, UserAction, UpdateType, KeyCode, EVENT_TYPE} from '../const';

const BLANK_EVENT = {
  city: {
    name: ``,
    description: ``,
    photos: [],
  },
  type: {
    name: EVENT_TYPE.TRANSFER[0],
    offers: [],
  },
  price: 0,
  dateRange: [new Date(), new Date()],
  isFavorite: false
};

export default class NewEvent {
  constructor(eventListContainer, changeData) {
    this._eventListContainer = eventListContainer;
    this._changeData = changeData;
    this._isNewEvent = true;
    this._event = BLANK_EVENT;

    this._eventEditComponent = null;
    this._newEventButtonComponent = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback, offers, destinations) {
    if (this._eventEditComponent !== null) {
      return;
    }

    this._destroyCallback = callback;

    this._eventEditComponent = new TripFormView(this._event, offers, destinations, this._isNewEvent);
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

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    this._eventEditComponent.destroyDatepickers();
    remove(this._eventEditComponent);
    this._eventEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setSaving() {
    this._eventEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  _handleFormSubmit(event) {
    this._changeData(
        UserAction.ADD_EVENT,
        UpdateType.MINOR,
        event
    );
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
