const DIVIDER = `&nbsp;&mdash;&nbsp;`;
const MAX_CITIES_DISPLAY = 3;

const getTripCitiesName = (events) => {
  let cities = events.map((item) => item.city.name);

  if (cities.length < MAX_CITIES_DISPLAY) {
    return `${cities.join(DIVIDER)}`;
  } else {
    return `${cities[0]}${DIVIDER}...${DIVIDER}${cities[cities.length - 1]}`;
  }
};

const formatMonthDate = (date) => {
  return date.toLocaleString(`en-US`, {month: `short`, day: `2-digit`});
};

const getTripDates = (events) => {
  let dates = events.map((item) => item.dateRange);
  const startDate = dates[0][0];
  const endDate = dates[dates.length - 1][1];

  if (startDate.getMonth() === endDate.getMonth()) {
    return `${formatMonthDate(startDate)}${DIVIDER}${endDate.getDate()}`;
  } else {
    return `${formatMonthDate(startDate)}${DIVIDER}${formatMonthDate(endDate)}`;
  }
};

const getTotalTripCost = (events) => {
  return events.reduce((total, item) => total + item.price, 0);
};

export const createTripInfoTemplate = (events) => {
  const route = getTripCitiesName(events);
  const dates = getTripDates(events);
  const totalCost = getTotalTripCost(events);

  return (
    `<section class="trip-main__trip-info  trip-info">
      <div class="trip-info__main">
        <h1 class="trip-info__title">${route}</h1>

        <p class="trip-info__dates">${dates}</p>
      </div>

      <p class="trip-info__cost">
        Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalCost}</span>
      </p>
    </section>`
  );
};
