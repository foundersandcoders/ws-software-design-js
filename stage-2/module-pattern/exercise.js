/*
 * Exercise: Create some modules!
 *
 * When you think you have finished, run the command:
 *   npm run s2.modules
 * This will run a series of tests which should all pass.
 */
'use strict';

/*
 * Create a single module (using an IIFE) which contains functionality to parse
 * URLs.
 *
 * We have started you off with the basic structure.
 *
 *     https    ://   www.example.com  /   hello  ?  foo=1&bar=2
 * |          |     |                |   |      |  |             |
 * | protocol |     |    domain      |   | path |  | querystring |
 */
var UrlParser = (function () {
  // fill in ...

  return {
    // a function that takes a URL and returns its protocol
    protocol: null,

    // a function that takes a URL and returns its domain
    domain: null,

    // a function that takes a URL and returns its path
    path: null,

    // a function that takes a URL and returns its query string
    query: null,
  };
});


/*
 * Create a module that can support multiple instances (like in our example).
 * The module should be a function with several additional methods attached as
 * attributes.
 *
 * Example:
 * var exampleBuilder = createUrlBuilder('https://example.com');
 *
 * var url = exampleBuilder({ query: { foo: 1, bar: 2 }, path: 'hello' });
 *
 * console.log(url); // https://example.com/hello?foo=1&bar=2
 *
 * exampleBuilder.
 */
var createUrlBuilder = function (host) {
  // fill in ...

  var builder = function () {}

  return builder;
};


module.exports = {
  UrlParser,
  createUrlBuilder,
};
