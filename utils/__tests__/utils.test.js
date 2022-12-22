const countDown = require("../utils");

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
});
