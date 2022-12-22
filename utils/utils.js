import useState from "react";

const countDown = (daysBetweenWaterings, lastWatered) => {
  const nextWater = daysBetweenWaterings - lastWatered;

  let nextWaterDate = new Date(
    Date.now() + nextWater * 24 * 60 * 60 * 1000
  ).getTime();

  const difference = +new Date(nextWaterDate) - +new Date();
  let timeLeft = {};

  if (difference > 0) {
    timeLeft = {
      days: Math.floor(difference / (24 * 60 * 60 * 1000)),
    };
  }
  console.log(timeLeft);
  return timeLeft;
};

module.exports = countDown;
