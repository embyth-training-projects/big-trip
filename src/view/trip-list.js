import {createTripItemTemplate} from './trip-item';
import {formatDate} from '../utils';

const getTripDays = (events) => {
  const dates = events.map((day) => formatDate(day.dateRange[0]));
  return [...new Set(dates)];
};

const filterEventsByDay = (events, day) => {
  return events.filter((event) => formatDate(event.dateRange[0]) === day);
};

export const createTripListTemplate = (events) => {
  const days = getTripDays(events);

  if (days.length) {
    return (
      `<ul class="trip-days">
        ${days
          .map((day, index) => {
            const filteredEventsByDay = filterEventsByDay(events, day);
            return createTripItemTemplate(filteredEventsByDay, day, index + 1);
          })
          .join(``)}
      </ul>`
    );
  } else {
    return `<p class="trip-events__msg">Click New Event to create your first point</p>`;
  }
};
