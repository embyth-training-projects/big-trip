export const TRIP_EVENTS_COUNT = 20;

export const MAX_OFFERS_DISPLAY = 3;

export const MAX_CITIES_DISPLAY = 3;

export const TEXT_DIVIDER = `&nbsp;&mdash;&nbsp;`;

export const DESTINATIONS = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Berlin`, `Paris`, `Monaco`, `London`];

export const EVENT_TYPE = {
  TRANSFER: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  ACTIVITY: [`sightseeing`, `restaurant`, `check-in`],
  NAMES: {
    TRANSFER: `Transfer`,
    ACTIVITY: `Activity`
  }
};

export const setWithInPretext = new Set([`sightseeing`, `restaurant`, `check-in`]);

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
};

export const KeyCode = {
  ESC: 27
};

export const SortType = {
  DEFAULT: `event`,
  TIME: `time`,
  PRICE: `price`,
};

export const Mode = {
  DEFAULT: `DEFAULT`,
  EDITING: `EDITING`,
};

export const DateType = {
  START: `START`,
  END: `END`,
};
