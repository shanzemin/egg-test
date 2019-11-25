/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1573808992336_1342';

  // add your middleware config here
  config.middleware = [];

  config.mongoose = {
    client: {
      url: 'mongodb://localhost/egg_db',
      options: {
        useNewUrlParser: true,
        // useUnifiedTopology: true
      }
    },
    loadModel: false
  };

  config.cluster = {
    listen: {
      port: 7654,
      hostname: '0.0.0.0'
    },
  };

  config.security = {
    csrf: false
  };

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
