/*
 * Unanswered
 *
 * Design notes:
 * > Conforms to the API required of an 'applet'
 */
var Unanswered = (function () {
  'use strict';

  var BASE_URL = 'https://api.stackexchange.com/2.2';
  var SOURCE = '#form-unanswered';
  var SELECTOR_RESULTS = '#results-body';
  var SELECTOR_SUMMARY = '#results-summary';
  var OPTIONS = {site: 'stackoverflow'};
  var MS_PER_S = 1000;

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
          + '/questions/unanswered?'
          + queryString(merge({tagged: input.tags}, OPTIONS));
  }

  function generateResults (data) {
    return data.items.map(function (item) {
      return (
        '<div> Question: ' + item.title + '</div>' +
        '<div> Asked: ' + new Date(MS_PER_S * item.creation_date) + '</div>' +
        '<div> Link: <a href=' + item.link + '> ' + item.link + '</a></div>' +
        '<div> Views: ' + item.view_count + '</div>' +
        '<div> Owner: ' + item.owner.display_name + '</div>' +
        '<div> Owner Reputation:' + item.owner.reputation + '</div>' +
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
