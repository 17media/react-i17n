export const TOKEN_PREFIX = '__I17N_';

export const getRandomID = () =>
  TOKEN_PREFIX +
  Math.random()
    .toString(36)
    .substr(2, 8);

export const getNextInterestingTick = relativeMS => {
  if (relativeMS < 10 * 1000) {
    // under 10 seconds, update every 1 second
    return 1000;
  } else if (relativeMS < 60 * 1000) {
    // under 1 minute, update every 10 seconds
    return 10 * 1000;
  } else if (relativeMS < 60 * 60 * 1000) {
    // under 1 hour, update every 1 minute
    return 60 * 1000;
  }

  // else update every 1 hour
  return 60 * 60 * 1000;
};
