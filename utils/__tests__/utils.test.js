const { countDown, daysToDate } = require("../utils");

beforeEach(() => {
  jest.useFakeTimers().setSystemTime(new Date("2022-12-21"));
});
afterEach(() => {
  jest.useRealTimers();
});

const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

describe("daysToDate", () => {
  test("should return correct date when passed a number argument", () => {
    const staticDate = dayjs("2022-12-22T15:38:43.308Z").format("YYYY/MM/DD");

    expect(daysToDate(7, staticDate)).toBe("2022/12/15");
    expect(daysToDate(3)).toBe("2022/12/18");
  });
});

describe("dateToDays", () => {
  test("returns the correct number of days since last watering", () => {
    const date = dayjs("YYYY/MM/DD").format();

    expect(dateToDays(date)).toBe(4);
  });
});

describe("countDown", () => {
  test("should return an object ", () => {
    expect(typeof countDown()).toBe("object");
  });
  test("should return correct number of days until next water if last watered date is less than the days between waterings", () => {
    const timeLeft = {
      days: 2,
    };
    expect(countDown(5, 3)).toEqual(timeLeft);
  });

  test("should return 0 days until next water if last watered date is more than the days between waterings", () => {
    const timeLeft = {
      days: 0,
    };
    expect(countDown(5, 7)).toEqual(timeLeft);
  });
});
