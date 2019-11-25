'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  require('./router/user')(app)

  const { router, controller } = app;

  router.get('/list', controller.home.list);
  router.get('/generateAuthUrl', controller.home.generateAuthUrl);
  router.get('/authorize', controller.home.authorize);
};
