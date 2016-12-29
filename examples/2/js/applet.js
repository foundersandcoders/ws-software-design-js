var Applet = (function (doc) {
  'use strict';

/*
 * Applet
 * Module used to setup/initialise our "applets".
 *
 * Design notes:
 * > `Applet` is perhaps a misnomer, in that this module itself is not an applet
 *   but instead is the module that consumes applets. Naming is hard.
 * > This module doesn't care about what is passed as an argument to the `init`
 *   method, as long as it is compatible with the expected API.
 * > The module performs some simple validation to make sure this is the case.
 * > There is nothing here that is specific to the StackOverflow API. The
 *   assumptions that are, however, made, are:
 *   > A single AJAX request is made
 *   > The response is used to form two quantities, the 'summary' & 'results'
 *   > The UI is re-renders each of these components (the 'summary' & 'results')
 *   Therefore any 'applet' that fits this model may be registered with the
 *   module.
 * > With a little work, this module might be made more generic, if required by
 *   changing requirements.
 */
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
