const MAX_DESCRIPTION_SENTENCES = 5;
const MAX_PHOTOS_COUNT = 5;
const OFFER = {
  MIN_PRICE: 5,
  MAX_PRICE: 200,
  MAX_COUNT: 5
};
const PRICE = {
  MIN: 200,
  MAX: 3000,
};

const SENTENCES = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
  const randomLength = getRandomInteger(0, MAX_DESCRIPTION_SENTENCES);
  const randomDescription = [];
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, SENTENCES.length);
    randomDescription.push(SENTENCES[randomIndex]);
  }

  return randomDescription.join(` `);
};

const generateType = () => {
  const tripTypes = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
  const randomIndex = getRandomInteger(0, tripTypes.length);
  return tripTypes[randomIndex];
};

const generateCity = () => {
  const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Berlin`, `Paris`, `Monaco`, `London`];
  const randomIndex = getRandomInteger(0, cities.length);
  return cities[randomIndex];
};

const generateOffers = () => {
  const offerTitles = [
    `Upgrade to a business class`,
    `Choose the radio station`,
    `Order Uber`,
    `Add luggage`,
    `Switch to comfort`,
    `Rent a car`,
    `Add breakfast`,
    `Book tickets`,
    `Lunch in city`,
  ];

  const randomLength = getRandomInteger(0, OFFER.MAX_COUNT);
  const randomOffers = [];

  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, offerTitles.length);
    randomOffers.push({
      title: offerTitles[randomIndex],
      price: getRandomInteger(OFFER.MIN_PRICE, OFFER.MAX_PRICE),
    });
  }

  return randomOffers;
};

const generatePhotos = () => {
  const randomLength = getRandomInteger(0, MAX_PHOTOS_COUNT);
  const randomPhotos = [];

  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, SENTENCES.length);
    randomPhotos.push({
      src: `https://picsum.photos/248/152?r=${Math.random()}`,
      description: SENTENCES[randomIndex],
    });
  }

  return randomPhotos;
};

const generatePrice = () => {
  return getRandomInteger(PRICE.MIN, PRICE.MAX);
};

const generateDate = (dateFrom = null) => {
  let currentDate = new Date();

  if (dateFrom) {
    currentDate = new Date(dateFrom);
    currentDate.setDate(dateFrom.getDate() + getRandomInteger(0, 7));
  } else {
    currentDate.setDate(currentDate.getDate() + getRandomInteger(0, 365));
  }

  const hour = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  const seconds = getRandomInteger(0, 59);

  currentDate.setHours(hour, minutes, seconds, 999);

  currentDate = new Date(currentDate);

  return currentDate;
};

export const generateTrip = () => {
  const dateFrom = generateDate();
  const dateTo = generateDate(dateFrom);

  return {
    description: generateDescription(),
    type: generateType(),
    destinationPoint: generateCity(),
    offers: generateOffers(),
    photos: generatePhotos(),
    price: generatePrice(),
    dateFrom,
    dateTo,
    id: null,
    isFavorite: Boolean(getRandomInteger()),
  };
};
