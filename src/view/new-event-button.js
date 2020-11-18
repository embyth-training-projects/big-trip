import AbstractView from './abstract';

const createNewEventButtonTemplate = () => {
  return (
    `<button class="trip-main__event-add-btn btn btn--big btn--yellow" type="button">New event</button>`
  );
};

export default class NewEventButton extends AbstractView {
  constructor() {
    super();

    this._newEventButtonClickHandler = this._newEventButtonClickHandler.bind(this);
  }

  getTemplate() {
    return createNewEventButtonTemplate();
  }

  _newEventButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.newEventClick();
  }

  setNewEventButtonClick(callback) {
    this._callback.newEventClick = callback;
    this.getElement().addEventListener(`click`, this._newEventButtonClickHandler);
  }

  disableButton() {
    this.getElement().disabled = true;
  }

  enableButton() {
    this.getElement().disabled = false;
  }
}
