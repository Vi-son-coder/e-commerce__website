const homeRouter = require('./home.router');
const productRouter = require('./product.router');
const usersRouter = require('./user.router');
const trackingRouter = require('./tracking.router')
module.exports = (app) => {
    app.use('/',homeRouter);
    app.use('/products',productRouter);
    app.use('/users',usersRouter);
    app.use('/api',trackingRouter);
}
