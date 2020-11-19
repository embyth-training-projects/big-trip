import StatisticsView from '../view/statistics';
import {remove, render} from '../utils/render';
import {getChartLabelsByType, getChartDataByType} from '../utils/statistics';
import {RenderPosition, StatisticType} from '../const';

import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

const BAR_HEIGHT = 55;
export default class Statistics {
  constructor(statsContainer, eventsModel) {
    this._statsContainer = statsContainer;
    this._eventsModel = eventsModel;

    this._barHeight = BAR_HEIGHT;

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
    const events = this._eventsModel.getEvents();

    this._renderMoneyChart(events);
    this._renderTransportChart(events);
    this._renderTimeChart(events);
  }

  _renderMoneyChart(events) {
    const moneyCtx = this._statisticsComponent.getMoneyCtx();
    const labels = getChartLabelsByType(events, StatisticType.MONEY);
    const data = getChartDataByType(events, StatisticType.MONEY);
    const formatter = (val) => `${StatisticType.MONEY.FORMATTER}${val}`;
    const title = StatisticType.MONEY.TITLE;

    moneyCtx.height = this._barHeight * labels.length;

    this._setChart(moneyCtx, labels, data, formatter, title);
  }

  _renderTransportChart(events) {
    const transportCtx = this._statisticsComponent.getTransportCtx();
    const labels = getChartLabelsByType(events, StatisticType.TRANSPORT);
    const data = getChartDataByType(events, StatisticType.TRANSPORT);
    const formatter = (val) => `${val}${StatisticType.TRANSPORT.FORMATTER}`;
    const title = StatisticType.TRANSPORT.TITLE;

    transportCtx.height = this._barHeight * labels.length;

    this._setChart(transportCtx, labels, data, formatter, title);
  }

  _renderTimeChart(events) {
    const timeCtx = this._statisticsComponent.getTimeCtx();
    const labels = getChartLabelsByType(events, StatisticType.TIME_SPENT);
    const data = getChartDataByType(events, StatisticType.TIME_SPENT);
    const formatter = (val) => `${val}${StatisticType.TIME_SPENT.FORMATTER}`;
    const title = StatisticType.TIME_SPENT.TITLE;

    timeCtx.height = this._barHeight * labels.length;

    this._setChart(timeCtx, labels, data, formatter, title);
  }

  _setChart(ctx, labels, data, formatter, title) {
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels,
        datasets: [{
          data,
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`,
          barThickness: 44,
          minBarLength: 50,
        }]
      },
      options: {
        plugins: {
          datalabels: {
            font: {
              size: 13
            },
            color: `#000000`,
            anchor: `end`,
            align: `start`,
            formatter
          }
        },
        title: {
          display: true,
          text: title,
          fontColor: `#000000`,
          fontSize: 23,
          position: `left`
        },
        scales: {
          yAxes: [{
            ticks: {
              fontColor: `#000000`,
              padding: 5,
              fontSize: 13,
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            }
          }],
        },
        legend: {
          display: false
        },
        tooltips: {
          enabled: false,
        }
      }
    });
  }
}
