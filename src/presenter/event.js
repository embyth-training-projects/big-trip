import TripEventView from '../view/trip-event';
import TripFormView from '../view/trip-form';
import {render, replace, remove} from '../utils/render';
import {RenderPosition, KeyCode} from '../const';

export default class Event {
  constructor(eventContainer, changeData) {
    this._eventContainer = eventContainer;
    this._changeData = changeData;

    this._eventComponent = null;
    this._eventEditComponent = null;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new TripEventView(event);
    this._eventEditComponent = new TripFormView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormResetHandler(this._handleFormReset);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._eventContainer.contains(prevEventComponent.getElement())) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._eventContainer.contains(prevEventEditComponent.getElement())) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replacePointToForm() {
    replace(this._eventEditComponent, this._eventComponent);
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._eventEditComponent);
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

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._event,
            {
              isFavorite: !this._event.isFavorite
            }
        )
    );
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleFormReset() {
    this._replaceFormToPoint();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
