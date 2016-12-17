/* global Fetch */

var SO = (function () {
  'use strict';

  var BASE_URL = 'https://api.stackexchange.com/';
  var VERSION = '2.2';
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

  function unanswered (tags, callback) {
    var opts = merge({tagged: tags}, OPTIONS);
    var url = BASE_URL
            + VERSION
            + '/questions/unanswered?'
            + queryString(opts);
    Fetch.get(url, callback);
  }

  function answerers (tag, callback) {
    var url = BASE_URL
            + VERSION
            + 'tags/'
            + tag
            + '/top-answerers/all_time?'
            + queryString(OPTIONS);
    Fetch.get(url, callback);
  }

  function version (v) {
    if (v)
      VERSION = v;

    return VERSION;
  }

  function options (opt) {
    if (opt)
      OPTIONS = merge(opt, OPTIONS);

    return OPTIONS;
  }

  return {
    unanswered: unanswered,
    answerers: answerers,
    version: version,
    options: options,
  };
})();
