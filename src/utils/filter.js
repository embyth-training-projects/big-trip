import {FilterType} from '../const';
import {isEventPassed} from './trip';

export const filter = {
  [FilterType.EVERYTHING]: (events) => events,
  [FilterType.FUTURE]: (events) => events.filter((event) => !(isEventPassed(event.dateRange[0]))),
  [FilterType.PAST]: (events) => events.filter((event) => isEventPassed(event.dateRange[1])),
};
