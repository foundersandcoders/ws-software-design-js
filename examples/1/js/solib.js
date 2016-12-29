/*
 * SO Module
 * Transforms user inputs into endpoints and performs the AJAX request
 *
 * Design notes:
 * > The `url` method has been exposed in the public API in order to test it.
 *   This is not ideal, but the majority of the code in this module is used to
 *   construct the correct URL, and the alternative would be either to actually
 *   make an AJAX request in the test (bad idea), or to mock the XMLHttpRequest
 *   object (increased complexity).
 * > The `url` method is pure and can be tested simply. The remaining public
 *   methods are not tested, since they simply wrap calls to the Fetch module,
 *   and are one-liners; for such a small app, it is reasonable to determine
 *   their correctness by inspection.
 */
var SO = (function () {
  'use strict';

  var BASE_URL = 'https://api.stackexchange.com/2.2';
  var OPTIONS = {site: 'stackoverflow'};

  function queryString (obj) {
    return Object.keys(obj).map(function (key) {
      return key + '=' + obj[key];
    }).join('&');
  }

  function merge (a, b) {
    return Object.keys(b).reduce(function (acc, key) {
      acc[key] = b[key];
      return acc;
    }, a);
  }

  function url (type, input) {
    switch (type) {
    case 'unanswered':
      return BASE_URL
            + '/questions/unanswered?'
            + queryString(
              merge({tagged: input.tags}, OPTIONS)
            );
    case 'answerers':
      return BASE_URL
            + '/tags/' + input.tags
            + '/top-answerers/all_time?'
            + queryString(OPTIONS);
    default:
      return;
    }
  }

  function unanswered (input, callback) {
    Fetch.get(
      url('unanswered', input),
      callback
    );
  }

  function answerers (input, callback) {
    Fetch.get(
      url('answerers', input),
      callback
    );
  }

  return {
    url: url,
    unanswered: unanswered,
    answerers: answerers,
  };
})();
