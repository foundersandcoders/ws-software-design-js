/*
 * View
 */
var View = (function (dom) {
  'use strict';

  var $ = function (s) {
    return dom.querySelector(s);
  };
  var SELECTOR_SUMMARY = '#results-summary';
  var SELECTOR_RESULTS = '#results-body';

  var V = {};

  V.clear = function (selector) {
    $(selector).innerHTML = '';
  };

  V.update = function (selector, content) {
    $(selector).innerHTML = content;
  };

  V.generateResults = function () {
    throw new Error('Function must be overwritten');
  };

  V.generateSummary = function (data) {
    return data.items.length + ' results found';
  };

  V.render = function (data) {
    this.clear(SELECTOR_SUMMARY);
    this.clear(SELECTOR_RESULTS);
    this.update(SELECTOR_SUMMARY, this.generateSummary(data));
    this.update(SELECTOR_RESULTS, this.generateResults(data));
  };

  return V;
})(window.mockDOM || document);


var UnansweredView = (function (V) {
  'use strict';

  var UV = Object.create(V);

  UV.generateResults = function (data) {
    var MS_PER_S = 1000;

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
  };

  return UV;
})(View);


var AnswerersView = (function (V) {
  'use strict';

  var AV = Object.create(V);

  AV.generateResults = function (data) {
    return data.items.map(function (item) {
      return (
        '<div> Username: ' + item.user.display_name + '</div>' +
        '<div> Reputation: ' + item.user.reputation + '</div>' +
        '<div> Link: <a href=' + item.user.link + '> ' + item.user.link + '</a></div>' +
        '<div> Post Count: ' + item.post_count + '</div>' +
        '</br>'
      );
    }).join();
  };

  return AV;
})(View);
