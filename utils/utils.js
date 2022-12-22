const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const daysToDate = (lastWatered, date = dayjs()) => {
  return dayjs(date).subtract(lastWatered, "day").format("YYYY/MM/DD");
};

const dateToDays = (dateLastWatered) => {};

const countDown = (daysBetweenWaterings, dateLastWatered) => {
  const daysSinceWatering = dayjs(dateLastWatered);

  if (lastWatered > daysBetweenWaterings) {
    return { days: 0 };
  } else {
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
    return timeLeft;
  }
};

module.exports = { countDown, daysToDate };
