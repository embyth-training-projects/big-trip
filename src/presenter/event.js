import TripEventView from '../view/trip-event';
import TripFormView from '../view/trip-form';
import {render, replace, remove} from '../utils/render';
import {RenderPosition, KeyCode, Mode} from '../const';

export default class Event {
  constructor(eventContainer, changeData, changeMode) {
    this._eventContainer = eventContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._eventComponent = null;
    this._eventEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(event) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new TripEventView(event);
    this._eventEditComponent = new TripFormView(event);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setFormResetHandler(this._handleFormReset);
    this._eventEditComponent.setFormCloseClickHandler(this._handleFormClose);

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this._eventContainer, this._eventComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._eventComponent, prevEventComponent);
    }

    if (this._mode === Mode.EDITING) {
      replace(this._eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToPoint();
    }
  }

  destroy() {
    remove(this._eventComponent);
    remove(this._eventEditComponent);
  }

  _replacePointToForm() {
    replace(this._eventEditComponent, this._eventComponent);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._eventEditComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.DEFAULT;
  }

  _onEscKeyDown(evt) {
    if (evt.keyCode === KeyCode.ESC || evt.key === `Esc` || evt.code === `Escape`) {
      evt.preventDefault();
      this._eventEditComponent.reset(this._event);
      this._replaceFormToPoint();
    }
  }

  _handleEditClick() {
    this._replacePointToForm();
  }

  _handleFormSubmit(event) {
    this._changeData(event);
    this._replaceFormToPoint();
  }

  _handleFormReset() {
    this._replaceFormToPoint();
  }

  _handleFormClose() {
    this._eventEditComponent.reset(this._event);
    this._replaceFormToPoint();
  }
}
