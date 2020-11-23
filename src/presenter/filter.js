import FilterView from '../view/filter';
import {render, replace, remove} from '../utils/render';
import {UpdateType, RenderPosition} from '../const';

export default class Filter {
  constructor(filterContainer, filterModel, eventsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._eventsModel = eventsModel;

    this._currentFilter = null;
    this._isFiltersActive = false;

    this._filterComponent = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._eventsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(this._currentFilter);

    this.disableFilters();

    if (this._isFiltersActive) {
      this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);
      this.enableFilters();
    }

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTEREND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  enableFilters() {
    this._filterComponent.enableFilters();
  }

  disableFilters() {
    this._filterComponent.disableFilters();
  }

  _handleModelEvent(updateType) {
    if (updateType === UpdateType.INIT) {
      this._isFiltersActive = true;
    }

    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }
}
