/*
 * Answerers
 *
 * Design notes:
 * > Conforms to the API required of an 'applet'
 */
var Answerers = (function () {
  'use strict';

  var BASE_URL = 'https://api.stackexchange.com/2.2';
  var SOURCE = '#form-answerers';
  var SELECTOR_RESULTS = '#results-body';
  var SELECTOR_SUMMARY = '#results-summary';
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

  function source () {
    return SOURCE;
  }

  function summarySelector () {
    return SELECTOR_SUMMARY;
  }

  function resultsSelector () {
    return SELECTOR_RESULTS;
  }

  function url (input) {
    return BASE_URL
          + '/tags/'
          + input.tags
          + '/top-answerers/all_time?'
          + queryString(merge({tagged: input.tags}, OPTIONS));
  }

  function generateResults (data) {
    return data.items.map(function (item) {
      return (
        '<div> Username: ' + item.user.display_name + '</div>' +
        '<div> Reputation: ' + item.user.reputation + '</div>' +
        '<div> Link: <a href=' + item.user.link + '> ' + item.user.link + '</a></div>' +
        '<div> Post Count: ' + item.post_count + '</div>' +
        '</br>'
      );
    }).join();
  }

  function generateSummary (data) {
    return data.items.length + ' results found';
  }

  return {
    url: url,
    source: source,
    resultsSelector: resultsSelector,
    summarySelector: summarySelector,
    generateResults: generateResults,
    generateSummary: generateSummary,
  };
})();
