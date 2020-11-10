import {createTripEventTemplate} from './trip-event';
import {formatMonthDate} from '../utils';

export const createTripItemTemplate = (events, day, index) => {
  if (day.length) {
    const formattedDate = formatMonthDate(new Date(day));

    return (
      `<li class="trip-days__item day">
        <div class="day__info">
          <span class="day__counter">${index}</span>
          <time class="day__date" datetime="${day}">${formattedDate}</time>
        </div>

        <ul class="trip-events__list">
          ${events
            .map((event) => createTripEventTemplate(event))
            .join(``)}
        </ul>
      </li>`
    );
  } else {
    return ``;
  }
};
