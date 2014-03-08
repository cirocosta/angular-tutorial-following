'use strict';
/**
 * This is the configuration file for the protractor e2e testing
 * framework, which runs our tests in a real browser. For running the
 * tests execute the script file that will take care of everything to
 * take a selenium standalone server up and whatsoever.
 */


exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    '../test/e2e/*.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:8000/app/',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
