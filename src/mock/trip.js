const MAX_DESCRIPTION_SENTENCES = 5;
const MAX_PHOTOS_COUNT = 5;
const PRICE = {
  MIN: 10,
  MAX: 500,
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
    const randomIndex = getRandomInteger(0, SENTENCES.length - 1);
    randomDescription.push(SENTENCES[randomIndex]);
  }

  return randomDescription.join(` `);
};

const generateType = () => {
  const tripTypes = [`taxi`, `bus`, `train`, `ship`, `transport`, `drive`, `flight`, `check-in`, `sightseeing`, `restaurant`];
  const randomIndex = getRandomInteger(1, tripTypes.length - 1);
  return tripTypes[randomIndex];
};

const generateCity = () => {
  const cities = [`Amsterdam`, `Geneva`, `Chamonix`, `Saint Petersburg`, `Berlin`, `Paris`, `Monaco`, `London`];
  const randomIndex = getRandomInteger(1, cities.length - 1);
  return cities[randomIndex];
};

const generateOffers = (type) => {
  const offers = [
    {name: `seats`, label: `Choose seats`, price: 5, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`]},
    {name: `meal`, label: `Add meal`, price: 15, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`, `ship`]},
    {name: `uber`, label: `Order Uber`, price: 20, isChecked: Boolean(getRandomInteger(0, 1)), types: [`taxi`]},
    {name: `luggage`, label: `Add luggage`, price: 30, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`, `ship`, `bus`, `transport`, `taxi`]},
    {name: `lunch`, label: `Lunch in city`, price: 30, isChecked: Boolean(getRandomInteger(0, 1)), types: [`sightseeing`, `check-in`]},
    {name: `train`, label: `Travel by train`, price: 40, isChecked: Boolean(getRandomInteger(0, 1)), types: [`check-in`]},
    {name: `tickets`, label: `Book tickets`, price: 40, isChecked: Boolean(getRandomInteger(0, 1)), types: [`sightseeing`, `bus`]},
    {name: `breakfast`, label: `Add breakfast`, price: 50, isChecked: Boolean(getRandomInteger(0, 1)), types: [`sightseeing`, `check-in`]},
    {name: `comfort`, label: `Switch to comfort`, price: 100, isChecked: Boolean(getRandomInteger(0, 1)), types: [`flight`, `train`, `ship`, `taxi`]},
    {name: `rent`, label: `Rent a car`, price: 200, isChecked: Boolean(getRandomInteger(0, 1)), types: [`drive`]},
  ];

  return offers.filter((offer) => offer.types.includes(type));
};

const generatePhotos = () => {
  const randomLength = getRandomInteger(0, MAX_PHOTOS_COUNT);
  const randomPhotos = [];

  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, SENTENCES.length - 1);
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

const generateDate = () => {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + getRandomInteger(0, 5));

  const hour = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  const seconds = getRandomInteger(0, 59);

  currentDate.setHours(hour, minutes, seconds, 999);

  currentDate = new Date(currentDate);

  return currentDate;
};

export const generateTrip = () => {
  const type = generateType();

  return {
    city: {
      name: generateCity(),
      description: generateDescription(),
      photos: generatePhotos(),
    },
    type: {
      name: type,
      offers: generateOffers(type),
    },
    price: generatePrice(),
    dateRange: [generateDate(), generateDate()].sort((a, b) => a.getTime() - b.getTime()),
    id: null,
    isFavorite: Boolean(getRandomInteger()),
  };
};
