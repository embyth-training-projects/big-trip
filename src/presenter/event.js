import TripEventView from '../view/trip-event';
import TripFormView from '../view/trip-form';
import {render, replace, remove} from '../utils/render';
import {isDatesChanged, isPriceChanged} from '../utils/trip';
import {RenderPosition, KeyCode, Mode, UserAction, UpdateType} from '../const';

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
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormClose = this._handleFormClose.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(event, offers) {
    this._event = event;

    const prevEventComponent = this._eventComponent;
    const prevEventEditComponent = this._eventEditComponent;

    this._eventComponent = new TripEventView(event);
    this._eventEditComponent = new TripFormView(event, offers);

    this._eventComponent.setEditClickHandler(this._handleEditClick);
    this._eventEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._eventEditComponent.setDeleteClickHandler(this._handleDeleteClick);
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
    this._eventEditComponent.setDatepickers();
    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToPoint() {
    replace(this._eventComponent, this._eventEditComponent);
    this._eventEditComponent.destroyDatepickers();
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
    const isMinorUpdate =
      isDatesChanged(this._event.dateRange, event.dateRange) ||
      isPriceChanged(this._event.price, event.price);

    this._changeData(
        UserAction.UPDATE_EVENT,
        isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
        event
    );
    this._replaceFormToPoint();
  }

  _handleDeleteClick(event) {
    this._changeData(
        UserAction.DELETE_EVENT,
        UpdateType.MINOR,
        event
    );
  }

  _handleFormClose() {
    this._eventEditComponent.reset(this._event);
    this._replaceFormToPoint();
  }
}
