import TripEventView from '../view/trip-event';
import TripFormView from '../view/trip-form';
import {render, replace} from '../utils/render';
import {RenderPosition, KeyCode} from '../const';

export default class Event {
  constructor(eventContainer) {
    this._eventContainer = eventContainer;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
  }

  init(event) {
    this._event = event;

    this._eventComponent = new TripEventView(event);
    this._eventEditComponent = new TripFormView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormResetHandler(this._handleFormReset);

    render(this._eventContainer, this._eventComponent, RenderPosition.BEFOREEND);
  }

  _replacePointToForm() {
    replace(this._eventEditComonent, this._eventComponent);
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._eventEditComonent);
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === KeyCode.ESC || evt.key === `Esc` || evt.code === `Escape`) {
      evt.preventDefault();
      this._replaceFormToPoint();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormSubmit() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormReset() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
