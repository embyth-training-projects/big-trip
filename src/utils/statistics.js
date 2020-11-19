import {StatisticType, STATISTICS_LABELS} from '../const';
import moment from 'moment';

const LABELS = [...STATISTICS_LABELS.TRANSFER, ...STATISTICS_LABELS.ACTIVITY];

const getEventsUniqueTypes = (events) => {
  return [...new Set(events.map((event) => event.type.name))];
};

const getUniqueTransportTypes = (events) => {
  return getEventsUniqueTypes(events).filter((event) => STATISTICS_LABELS.TRANSFER.map((item) => item.name).includes(event));
};

const getTimeInterval = (event) => {
  return moment(event.dateRange[1]).diff(moment(event.dateRange[0]));
};

const getEventsTypesLabels = (events) => {
  return getEventsUniqueTypes(events).map((type) => LABELS.find((label) => label.name === type).label);
};

const getTransportLabels = (events) => {
  return getUniqueTransportTypes(events).map((type) => STATISTICS_LABELS.TRANSFER.find((label) => label.name === type).label);
};

const getMoneyData = (events) => {
  return getEventsUniqueTypes(events).map((type) => {
    return events.filter((event) => event.type.name === type).reduce((acc, event) => acc + +event.price, 0);
  });
};

const getTransportData = (events) => {
  return getUniqueTransportTypes(events).map((transport) => events.filter((event) => event.type.name === transport).length);
};

const getTimeSpentData = (events) => {
  return getEventsUniqueTypes(events).map((type) => {
    const filteredEventsByType = events.filter((event) => event.type.name === type);
    const interval = filteredEventsByType.reduce((acc, event) => acc + getTimeInterval(event), 0);
    return Math.trunc(moment.duration(interval).asHours());
  });
};

export const getChartLabelsByType = (events, statsType) => {
  switch (statsType) {
    case StatisticType.MONEY:
      return getEventsTypesLabels(events);
    case StatisticType.TRANSPORT:
      return getTransportLabels(events);
    case StatisticType.TIME_SPENT:
      return getEventsTypesLabels(events);
  }

  return [];
};

export const getChartDataByType = (events, statsType) => {
  switch (statsType) {
    case StatisticType.MONEY:
      return getMoneyData(events);
    case StatisticType.TRANSPORT:
      return getTransportData(events);
    case StatisticType.TIME_SPENT:
      return getTimeSpentData(events);
  }

  return [];
};
