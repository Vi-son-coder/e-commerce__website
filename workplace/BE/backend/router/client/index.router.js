const productRouter = require("./product.router");
const homeRouter = require("./home.router");

module.exports = (app) => {
  app.use("/", homeRouter);

  app.use("/products", productRouter);

};
