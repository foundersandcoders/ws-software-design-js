/*
 * View
 *
 * Design notes:
 * > This design requires an understanding of Javascript's prototype inheritance
 *   model
 * > `View` is the base-module, implementing the common behaviour like `render`
 * > `UnansweredView` and `AnswerersView` are the child-modules, responsible
 *   only for implementing the specific behaviour (in this case
 *   `generateResults`).
 * > Benefits of this design:
 *   > all common behaviour lives in one place, so you needn't repeat code
 *     unnecessarily
 *   > if there are bugs or changes, they only need to be made in one module
 *   > It is easy to see
 * > Disadvantages of this design:
 *   > if changes arise that don't fit into the breakdown of responsibility
 *     assumed here, it will either require workarounds, breaking the pattern,
 *     or refactoring/redesigning entirely.
 */
var View = (function () {
  var $ = function (s) {
    return document.querySelector(s);
  };
  var SELECTOR_SUMMARY = '#results-summary';
  var SELECTOR_RESULTS = '#results-body';

  var V = {};

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
    this.update(SELECTOR_SUMMARY, this.generateSummary(data));
    this.update(SELECTOR_RESULTS, this.generateResults(data));
  };

  return V;
})();


var UnansweredView = (function (V) {
  var UV = Object.create(V);

  UV.generateResults = function (data) {
    var MS_PER_S = 1000;

    return data.items.map(function (item) {
      return (
        '<div> Question: ' + item.title + '</div>' +
        '<div> Asked: ' + new Date(MS_PER_S * item.creation_date) + '</div>' +
        '<div> Link: <a href="' + item.link + '"> ' + item.link + '</a></div>' +
        '<div> Views: ' + item.view_count + '</div>' +
        '<div> Owner: ' + item.owner.display_name + '</div>' +
        '<div> Owner Reputation: ' + item.owner.reputation + '</div>' +
        '<br>'
      );
    }).join('');
  };

  return UV;
})(View);


var AnswerersView = (function (V) {
  var AV = Object.create(V);

  AV.generateResults = function (data) {
    return data.items.map(function (item) {
      return (
        '<div> Username: ' + item.user.display_name + '</div>' +
        '<div> Reputation: ' + item.user.reputation + '</div>' +
        '<div> Link: <a href="' + item.user.link + '"> ' + item.user.link + '</a></div>' +
        '<div> Post Count: ' + item.post_count + '</div>' +
        '<br>'
      );
    }).join('');
  };

  return AV;
})(View);
