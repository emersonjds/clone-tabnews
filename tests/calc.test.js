const calc = require("../models/calc");

test("sum 2 + 2 should be 4 ", ()=> {
  const result = calc.sum(2,2);
  expect(result).toBe(4);
})