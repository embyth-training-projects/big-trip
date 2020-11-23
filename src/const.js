export const MAX_OFFERS_DISPLAY = 3;

export const MAX_CITIES_DISPLAY = 3;

export const SHAKE_ANIMATION_TIMEOUT = 600;

export const TEXT_DIVIDER = `&nbsp;&mdash;&nbsp;`;

export const EVENT_TYPE = {
  TRANSFER: [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`],
  ACTIVITY: [`sightseeing`, `restaurant`, `check-in`],
  NAMES: {
    TRANSFER: `Transfer`,
    ACTIVITY: `Activity`
  }
};

export const STATISTICS_LABELS = {
  TRANSFER: [
    {name: `taxi`, label: `🚕 TAXI`},
    {name: `bus`, label: `🚌 BUS`},
    {name: `train`, label: `🚂 TRAIN`},
    {name: `ship`, label: `🛳 SHIP`},
    {name: `transport`, label: `🚊 TRANSPORT`},
    {name: `drive`, label: `🚗 DRIVE`},
    {name: `flight`, label: `✈️ FLIGHT`}
  ],
  ACTIVITY: [
    {name: `check-in`, label: `🏨 CHECK-IN`},
    {name: `sightseeing`, label: `🏛 SIGHTSEEING`},
    {name: `restaurant`, label: `🍴 RESTAURANT`}
  ],
};

export const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREEND: `beforeend`,
  BEFOREBEGIN: `beforebegin`,
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

export const UserAction = {
  UPDATE_EVENT: `UPDATE_EVENT`,
  ADD_EVENT: `ADD_EVENT`,
  DELETE_EVENT: `DELETE_EVENT`,
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  INIT: `INIT`,
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`,
};

export const MenuItem = {
  TABLE: `Table`,
  STATS: `Stats`,
};

export const StatisticType = {
  MONEY: {
    TITLE: `MONEY`,
    FORMATTER: `€ `,
  },
  TRANSPORT: {
    TITLE: `TRANSPORT`,
    FORMATTER: `x`,
  },
  TIME_SPENT: {
    TITLE: `TIME SPENT`,
    FORMATTER: `H`,
  },
};

export const State = {
  SAVING: `SAVING`,
  DELETING: `DELETING`,
  ABORTING: `ABORTING`,
};

export const StoreType = {
  EVENTS: `events`,
  OFFERS: `offers`,
  DESTINATIONS: `destinations`,
};
