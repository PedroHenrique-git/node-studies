module.exports = () => {
  return (req, _, next) => {
    console.log("Request received: ", req.method, req.url);
    next();
  };
};
