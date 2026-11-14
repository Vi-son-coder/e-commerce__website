const dashboardRouter = require("./dashboard.router");
const systemConfig = require("../../config/system");
const productsRouter = require('./product.router');
module.exports = (app) => {
  const PATH_ADMIN = systemConfig.prefixAdmin;
  app.use(PATH_ADMIN + "/dashboard", dashboardRouter);
  app.use(PATH_ADMIN + '/products', productsRouter);
};
