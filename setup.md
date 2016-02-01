# Setup #

Install the following NPM packages:

* `babel-cli` - the Babel command line interface, used to transpile from ES6 to ES5.
* `babel-preset-es2015` - the Babel settings for ES2015.
* `webpack` - Webpack, used for bundling.
* `qunitjs` - the QUnit NPM module with the JS and CSS files, used for the tests.
* `watch` - to detect changes on the source files and trigger the build process.
* `browser-sync` - to refresh the browser when any of the final artifacts changes. 

We're going to use the following folder layout:

* `src` contains the HTML source file.
* `src/js` contains the ES source files
* `lib` contains the transpiled javascript files
* `dist` contains the bundled javascript files, as well as additional files (QUnit javascript and CSS), ready for browser consuption

Create the babel configuration file to include the `es2015` preset.

~~~
`echo '{ "presets": ["es2015"] }' > .babelrc`
~~~

Create the webpack configuration

~~~
module.exports = {
  context: './lib', // the module location
  entry: './index.js',
  output: {
    path: './dist',
    filename: 'bundle.js'
  }  
};
~~~

Create the main HTML file `index.html`

~~~
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>QUnit basic example</title>
  <link rel="stylesheet" href="dist/qunit/qunit.css">
</head>
<body>
  <div id="qunit"></div>
  <div id="qunit-fixture"></div>
  <script src="dist/qunit/qunit.js"></script>
  <script src="dist/bundle.js"></script>
</body>
</html>
~~~

This file includes the QUnit CSS and JS files as well as the `bundle.js` with all the required javascript.


Create the main javascript file `src/index.js`. Add a `import` for any test file.

~~~
import * as tests from './test_modules'
~~~

In this example, the `./test_modules.js` contains all the module related tests. 

Add the following command to the `package.config` `scripts` property

~~~
"build": "cp -Rn ./node_modules/qunitjs/qunit ./dist/qunit && babel src -d lib && webpack",
~~~

This will:

* Copy the QUnit files to the `dist/qunit` folder.
* Transpile the ES6 files into ES5.
* Bundle all the ES5 files into `bundle.js`.

Add the following command to the `package.config` `scripts` property

~~~
"test": "watch 'npm run build' src & browser-sync start --server dist --files 'dist/*'"
~~~

This will:

* Start watching changes on the src folder that will trigger the build process.
* Launch the browser-sync static file server, serving from and watching changes on the `dist` folder.
