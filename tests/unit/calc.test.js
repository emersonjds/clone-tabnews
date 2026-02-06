import calc from "../../models/start/calc";

test("sum 2 + 2 should be 4 ", () => {
  const result = calc.sum(2, 2);
  expect(result).toBe(4);
});

test("if I put a string on first argument should return an Error", () => {
  const result = calc.sum("string", 2);
  expect(result).toBe("Error");
});
