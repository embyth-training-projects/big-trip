import AbstractView from './abstract';
import {FilterType} from '../const';

const createFilterTemplate = (currentFilter) => {
  return (
    `<form class="trip-filters" action="#" method="get">
      ${Object
        .values(FilterType)
        .map((type) => {
          return (
            `<div class="trip-filters__filter">
              <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${type}" ${type === currentFilter ? `checked` : ``}>
              <label class="trip-filters__filter-label" for="filter-${type}">${type}</label>
            </div>`
          );
        })
        .join(``)}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`
  );
};

export default class Filter extends AbstractView {
  constructor(currentFilterType) {
    super();

    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createFilterTemplate(this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement()
      .querySelectorAll(`.trip-filters__filter-input`)
      .forEach((item) => item.addEventListener(`change`, this._filterTypeChangeHandler));
  }

  enableFilters() {
    this.getElement()
      .querySelectorAll(`.trip-filters__filter-input`)
      .forEach((item) => item.removeAttribute(`disabled`));
  }

  disableFilters() {
    this.getElement()
      .querySelectorAll(`.trip-filters__filter-input`)
      .forEach((item) => item.setAttribute(`disabled`, `disabled`));
  }
}
