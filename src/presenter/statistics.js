import StatisticsView from '../view/statistics';
import {remove, render} from '../utils/render';
import {RenderPosition} from '../const';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
    const BAR_HEIGHT = 55;
    const events = this._eventsModel.getEvents();

    const moneyCtx = this._statisticsComponent.getMoneyCtx();
    const transportCtx = this._statisticsComponent.getTransportCtx();
    const timeCtx = this._statisticsComponent.getTimeCtx();

    this._renderMoneyChart(moneyCtx);
    this._renderTransportChart(transportCtx);
    this._renderTimeChart(timeCtx);
  }

  _renderMoneyChart(ctx) {

  }

  _renderTransportChart(ctx) {

  }

  _renderTimeChart(ctx) {

  }

  _setChart(ctx) {

  }
}
