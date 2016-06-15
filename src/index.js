const isBrowser = require('is-client')();

module.exports = function(path) {
  /**
   * On the server we need to use
   * node-sass to compile sass
   * to css (webpack format supported by style-loader)
   */
  let styles;

  if (!isBrowser) {
    const sass = require('node-sass');

    styles = sass.renderSync({
      file: path
    }).css.toString();
  }

  return styles;
};
