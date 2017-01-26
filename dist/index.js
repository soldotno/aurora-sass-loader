'use strict';

var isBrowser = require('is-client')();

module.exports = function (path) {
  /**
   * On the server we need to use
   * node-sass to compile sass
   * to css (webpack format supported by style-loader)
   */
  var styles = void 0;

  if (!isBrowser) {
    var sass = require('node-sass');

    styles = sass.renderSync({
      file: path
    }).css.toString();
  }

  return styles;
};