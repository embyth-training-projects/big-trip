export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const capitalizeFirstLetter = (string) => {
  return string
    .toLowerCase()
    .charAt(0).toUpperCase() + string.slice(1);
};
