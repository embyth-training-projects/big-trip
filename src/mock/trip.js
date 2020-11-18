import {getRandomInteger} from '../utils/common';
import {DESTINATIONS, EVENT_TYPE, OffersNameToLabel} from '../const';

const OFFERS = [
  {name: `seats`, label: `Choose seats`, price: getRandomInteger(5, 200), types: [`flight`, `train`]},
  {name: `meal`, label: `Add meal`, price: getRandomInteger(5, 200), types: [`flight`, `train`, `ship`]},
  {name: `uber`, label: `Order Uber`, price: getRandomInteger(5, 200), types: [`taxi`]},
  {name: `luggage`, label: `Add luggage`, price: getRandomInteger(5, 200), types: [`flight`, `train`, `ship`, `bus`, `transport`, `taxi`]},
  {name: `lunch`, label: `Lunch in city`, price: getRandomInteger(5, 200), types: [`sightseeing`, `check-in`]},
  {name: `train`, label: `Travel by train`, price: getRandomInteger(5, 200), types: [`check-in`]},
  {name: `tickets`, label: `Book tickets`, price: getRandomInteger(5, 200), types: [`sightseeing`, `bus`]},
  {name: `breakfast`, label: `Add breakfast`, price: getRandomInteger(5, 200), types: [`sightseeing`, `check-in`]},
  {name: `comfort`, label: `Switch to comfort`, price: getRandomInteger(5, 200), types: [`flight`, `train`, `ship`, `taxi`]},
  {name: `rent`, label: `Rent a car`, price: getRandomInteger(5, 200), types: [`drive`]},
];

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

export const generateDescription = () => {
  const MAX_DESCRIPTION_SENTENCES = 5;

  const randomLength = getRandomInteger(0, MAX_DESCRIPTION_SENTENCES);
  const randomDescription = [];
  for (let i = 0; i < randomLength; i++) {
    const randomIndex = getRandomInteger(0, SENTENCES.length - 1);
    randomDescription.push(SENTENCES[randomIndex]);
  }

  return randomDescription.join(` `);
};

const generateType = () => {
  const tripTypes = [...EVENT_TYPE.TRANSFER, ...EVENT_TYPE.ACTIVITY];
  const randomIndex = getRandomInteger(1, tripTypes.length - 1);
  return tripTypes[randomIndex];
};

const generateCity = () => {
  const randomIndex = getRandomInteger(1, DESTINATIONS.length - 1);
  return DESTINATIONS[randomIndex];
};

export const generateOffers = () => {
  const offers = [];

  [...EVENT_TYPE.TRANSFER, ...EVENT_TYPE.ACTIVITY].forEach((item) => {
    const generatedOffers = OFFERS.filter((offer) => offer.types.includes(item)).map((offer) => {
      return {
        label: OffersNameToLabel[offer.name],
        price: offer.price,
      };
    });

    const structure = {
      type: item,
      offers: generatedOffers
    };

    offers.push(structure);
  });

  return offers;
};

export const generateOffersByType = (type) => {
  const typeOffers = generateOffers().find((item) => item.type === type).offers;
  const index = getRandomInteger(0, typeOffers.length - 1);
  const item = typeOffers[index];
  return item ? [item] : [];
};

export const generatePhotos = () => {
  const MAX_PHOTOS_COUNT = 5;

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
  const PRICE = {
    MIN: 10,
    MAX: 500,
  };

  return getRandomInteger(PRICE.MIN, PRICE.MAX);
};

const generateDate = () => {
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + getRandomInteger(-2, 2));

  const hour = getRandomInteger(0, 23);
  const minutes = getRandomInteger(0, 59);
  const seconds = getRandomInteger(0, 59);

  currentDate.setHours(hour, minutes, seconds, 999);

  currentDate = new Date(currentDate);

  return currentDate;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
      offers: generateOffersByType(type),
    },
    price: generatePrice(),
    dateRange: [generateDate(), generateDate()].sort((a, b) => a.getTime() - b.getTime()),
    id: generateId(),
    isFavorite: Boolean(getRandomInteger()),
  };
};
