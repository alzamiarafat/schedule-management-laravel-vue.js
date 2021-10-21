// Register your controllers routes here

const userController = require('./controller');

const registerRoutes = (app) => {
  app.use('/', userController);
};

module.exports = {
  registerRoutes,
};