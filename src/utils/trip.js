import {EVENT_TYPE} from '../const';
import moment from 'moment';

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const formatEventType = (type) => {
  const typeText = type.charAt(0).toUpperCase() + type.slice(1);
  const label = EVENT_TYPE.ACTIVITY.includes(type) ? `in` : `to`;
  return `${typeText} ${label} `;
};

export const formatTime = (date) => {
  return moment(date).format(`HH:mm`);
};

export const formatDate = (date) => {
  return moment(date).format(`L`);
};

export const formatDateTime = (date) => {
  return moment(date).format(`DD/MM/YY HH:mm`);
};

export const formatMonthDate = (date) => {
  return moment(date).format(`MMM DD`);
};

export const getTripDays = (events) => {
  const dates = events.map((day) => formatDate(day.dateRange[0]));
  return [...new Set(dates)];
};

export const filterEventsByDay = (events, day) => {
  return events.filter((event) => formatDate(event.dateRange[0]) === day);
};

export const sortEventsByTime = (eventA, eventB) => {
  return new Date(eventB.dateRange[1] - eventB.dateRange[0]).getTime() - new Date(eventA.dateRange[1] - eventA.dateRange[0]).getTime();
};

export const sortEventsByPrice = (eventA, eventB) => {
  return eventB.price - eventA.price;
};

export const isDatesChanged = (dateRangeA, dateRangeB) => {
  return !(moment(dateRangeA[0]).isSame(dateRangeB[0]) && moment(dateRangeA[1]).isSame(dateRangeB[1]));
};

export const isPriceChanged = (priceA, priceB) => {
  return !(priceA === priceB);
};

export const isEventPassed = (date) => {
  if (date === null) {
    return false;
  }

  const currentDate = moment();

  return moment(date).isBefore(currentDate);
};
