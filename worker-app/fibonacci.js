module.exports = (n) => {
  let a = 0,
    b = 1,
    next = 1;

  for (let i = 0; i < n; i++) {
    next = a + b;
    a = b;
    b = next;
  }

  return next;
};
