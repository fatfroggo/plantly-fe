const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");

var relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime, customParseFormat);

const daysToDate = (lastWatered, date = dayjs()) => {
  return dayjs(date).subtract(lastWatered, "day").format("YYYY/MM/DD");
};

const dateToDays = (dateLastWatered) => {
  const todaysDate = dayjs();

  return dayjs(todaysDate).diff(dateLastWatered, "day");
};

const countDown = (daysBetweenWaterings, dateLastWatered) => {
  const daysSinceWater = dateToDays(dateLastWatered);

  if (daysSinceWater >= daysBetweenWaterings) {
    return 0;
  } else {
    return daysBetweenWaterings - daysSinceWater;
  }
};

module.exports = { countDown, daysToDate, dateToDays };
