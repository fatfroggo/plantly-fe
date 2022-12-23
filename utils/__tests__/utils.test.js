const { countDown, daysToDate, dateToDays } = require("../utils");

const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

describe("daysToDate", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-12-21"));
  });
  afterAll(() => {
    jest.useRealTimers();
  });
  test("should return correct date format when passed a number of days", () => {
    const staticDate = dayjs("2022-12-22T15:38:43.308Z").format("YYYY/MM/DD");

    expect(daysToDate(7, staticDate)).toBe("2022/12/15");
    expect(daysToDate(3)).toBe("2022/12/18");
  });
});

describe("dateToDays", () => {
  test("returns the correct number of days since last watering", () => {
    const date = dayjs("2022/12/20").format();

    expect(dateToDays(date)).toBe(2);
  });
});

describe("countDown", () => {
  beforeAll(() => {
    jest.useFakeTimers().setSystemTime(new Date("2022-12-21"));
  });
  afterAll(() => {
    jest.useRealTimers();
  });

  test("should return an number ", () => {
    expect(typeof countDown()).toBe("number");
  });

  test("return correct number of days until next watering", () => {
    const date = dayjs(daysToDate(3)).format();

    expect(countDown(5, date)).toBe(2);
    expect(countDown(8, date)).toBe(5);
  });

  test("return 0 if last watered date is more than the days between waterings", () => {
    const date = dayjs(daysToDate(3)).format();

    expect(countDown(5, date)).toEqual(2);
  });
});
