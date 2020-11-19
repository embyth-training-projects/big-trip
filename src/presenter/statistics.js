import StatisticsView from '../view/statistics';
import {remove, render} from '../utils/render';
import {RenderPosition} from '../const';

export default class Statistics {
  constructor(statsContainer, eventsModel) {
    this._statsContainer = statsContainer;
    this._eventsModel = eventsModel;

    this._statisticsComponent = null;
  }

  init() {
    if (this._statisticsComponent !== null) {
      this.destroy();
    }

    this._statisticsComponent = new StatisticsView();
    render(this._statsContainer, this._statisticsComponent, RenderPosition.BEFOREEND);

    this._renderCharts();
  }

  destroy() {
    if (this._statisticsComponent === null) {
      return;
    }

    remove(this._statisticsComponent);
    this._statisticsComponent = null;
  }

  _renderCharts() {
    // Отрисовка статистики
  }
}
