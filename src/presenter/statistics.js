import StatisticsView from '../view/statistics';
import {remove, render} from '../utils/render';
import {RenderPosition} from '../const';

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

    this._setChart(moneyCtx);
  }

  _renderTransportChart(events) {
    const transportCtx = this._statisticsComponent.getTransportCtx();

    this._setChart(transportCtx);
  }

  _renderTimeChart(events) {
    const timeCtx = this._statisticsComponent.getTimeCtx();

    this._setChart(timeCtx);
  }

  _setChart(ctx) {
    return new Chart(ctx, {
      plugins: [ChartDataLabels],
      type: `horizontalBar`,
      data: {
        labels: [`FLY`, `STAY`, `DRIVE`, `LOOK`, `RIDE`], // изменить лейблы
        datasets: [{
          data: [400, 300, 200, 160, 100], // изменить данные
          backgroundColor: `#ffffff`,
          hoverBackgroundColor: `#ffffff`,
          anchor: `start`
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
            formatter: (val) => `€ ${val}` // изменить форматтер
          }
        },
        title: {
          display: true,
          text: `MONEY`, // изменить заголовок
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
            },
            barThickness: 44,
          }],
          xAxes: [{
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false
            },
            minBarLength: 50
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
