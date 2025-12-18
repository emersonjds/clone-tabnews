function sum(arg1, arg2) {
  if (typeof arg1 !== "number") {
    return "Error";
  }
  return arg1 + arg2
}

exports.sum = sum;