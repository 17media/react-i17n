export const TOKEN_PREFIX = '__I17N_';

export const getRandomID = () =>
  TOKEN_PREFIX +
  Math.random()
    .toString(36)
    .substr(2, 8);
