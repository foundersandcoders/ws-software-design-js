/* global Input, Fetch, View */

var Applet = (function () {
  'use strict';

  function $ (s) {
    return document.querySelector(s);
  }

  function init (app) {
    $(app.source()).addEventListener('submit', function (e) {
      e.preventDefault();

      var input = Input.serialise(e.target);

      Fetch.get(app.url(input.tags), function (response) {
        var results = app.generateResults(response);
        var summary = app.generateSummary(response);

        View.render(results, app.resultsSelector());
        View.render(summary, app.summarySelector());
      });
    });
  }

  return {init: init};
})();

(function () {
  'use strict';

  ['Unanswered', 'Answerers']
    .forEach(function (applet) {
      if (window[applet])
        Applet.init(window[applet]);
    });
})();
