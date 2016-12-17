/*
 * View
 */
var View = (function (dom) {
  'use strict';

  var $ = function (s) {
    return dom.querySelector(s);
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
})(window.mockDOM || document);
