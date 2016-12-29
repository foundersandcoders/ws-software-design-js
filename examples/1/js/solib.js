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
