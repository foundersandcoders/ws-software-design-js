var Applet = (function (doc) {
  'use strict';

  function $ (s) {
    return doc.querySelector(s);
  }

  function init (app) {
    $(app.source()).addEventListener('submit', function (e) {
      e.preventDefault();

      var input = Input.serialise(e.target);

      Fetch.get(app.url(input), function (response) {
        var results = app.generateResults(response);
        var summary = app.generateSummary(response);

        View.render(results, app.resultsSelector());
        View.render(summary, app.summarySelector());
      });
    });
  }

  return {init: init};
})(document);
