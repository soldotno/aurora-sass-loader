Aurora Sass Styles Loader
=========================

[![Greenkeeper badge](https://badges.greenkeeper.io/soldotno/aurora-sass-loader.svg)](https://greenkeeper.io/)

A helper function/module for loading universal/isomorphic styles in Aurora

#### Usage

__You need to have this webpack setup__

```js
{
  test: /\.scss$/,
  loader: !isProduction ? 'style!css!autoprefixer!sass' : 'css!autoprefixer!sass'
}
```

Meaning: You only use the `style-loader` in production mode (with server-side rendering) and omit it in development mode

__You use the styles in your components like this__

```js
// Component.jsx

/**
 * This is where you load the styles
 */
const styles = require('aurora-sass-loader')(__dirname + '../styles/my-component-styles.scss');

/**
 * This is a required helper to inject styles
 * that we're 'borrowing' from webpack style-loader
 */
const injectStyles = require('style-loader/addStyles');

const AwesomeModule = React.createClass({
  /**
   * You have to implement this
   * static method so that Aurora
   * can pull the component styles
   * and include it for dynamic
   * server-side rendering
   */
  statics: {
    getStyles() {
      return styles;
    }
  },

  /**
   * This is the code used for
   * dynamically injection styles
   * when the page is loaded on
   * the client
   */
  componentWillMount() {
    if (isBrowser && !__DEVELOPMENT__) {
      injectStyles(styles);
    }
  },

  render() {
    // ....
  }
});
```
