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
  var urlRegEx = /^([a-z]+):\/\/([a-z\.]+)\/([^\?]+)\?(.+)$/i;

  function getMatch (str) {
    return str.match(urlRegEx);
  }

  function nth (n, array) {
    return (array || [])[n];
  }

  return {
    // a function that takes a URL and returns its protocol
    protocol: function getProtocol (url) {
      return nth(1, getMatch(url));
    },

    // a function that takes a URL and returns its domain
    domain: function getDomain (url) {
      return nth(2, getMatch(url));
    },

    // a function that takes a URL and returns its path
    path: function getPath (url) {
      return nth(3, getMatch(url));
    },

    // a function that takes a URL and returns its query string
    querystring: function getQueryString (url) {
      return nth(4, getMatch(url));
    },
  };
})();


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

  function queryObjectToString (query) {
    return Object.keys(query)
      .map(function (key) {
        return key + '=' + query[key];
      })
      .join('&');
  }

  function appendPath (base, path) {
    return base + '/' + path;
  }

  function appendQueryString (base, query) {
    return base + '?' + queryObjectToString(query);
  }

  var builder = function (config) {
    var url = host;

    if (config.path) {
      url = appendPath(url, config.path);
    }

    if (config.query) {
      url = appendQueryString(url, config.query);
    }

    return url;
  };

  builder.path = function (path) {
    return appendPath(host, path);
  };

  builder.query = function (query) {
    return appendQueryString(host, query);
  };

  return builder;
};


module.exports = {
  UrlParser,
  createUrlBuilder,
};
