import {setWithInPretext} from './const';

export const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const formatEventType = (type) => {
  const typeText = type.charAt(0).toUpperCase() + type.slice(1);
  const label = setWithInPretext.has(type) ? `in` : `to`;
  return `${typeText} ${label} `;
};

export const formatTime = (date) => {
  return date.toLocaleString(`en-GB`, {hour: `2-digit`, minute: `2-digit`});
};

export const formatDate = (date) => {
  return date.toLocaleString(`en-US`, {day: `2-digit`, month: `2-digit`, year: `2-digit`});
};

export const formatDateTime = (date) => {
  return `${formatDate(date)} ${formatTime(date)}`;
};

export const formatMonthDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`});
};
