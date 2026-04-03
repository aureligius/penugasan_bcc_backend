const logger = (req: any, res: any, next: any) => {
  console.log("LOGGER HIT");
  console.log(`${req.method} ${req.url}`);
  next();
};

module.exports = { logger };