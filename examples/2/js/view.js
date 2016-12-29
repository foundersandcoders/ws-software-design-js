/*
 * View Module
 *
 * Design notes:
 * > Completely generic module, like `Fetch` and `Input`, exporting a simple API
 *   for updating the view.
 * > Currently implemented as a very simple `.innerHTML = ?`, but this could be
 *   changed to something more involved (and less dangerous) without the rest of
 *   the app needing to know, as long as the API remains the same.
 */
var View = (function () {
  var $ = function (s) {
    return document.querySelector(s);
  };
  var V = {};

  V.clear = function (selector) {
    $(selector).innerHTML = '';
  };

  V.update = function (selector, content) {
    $(selector).innerHTML = content;
  };

  V.render = function (markup, target) {
    V.clear(target);
    V.update(target, markup);
  };

  return V;
})();
