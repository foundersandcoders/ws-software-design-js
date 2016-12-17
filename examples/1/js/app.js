/* global SO, Input, UnansweredView, AnswerersView */

(function () {
  'use strict';

  var $ = function (selector) {
    return document.querySelector(selector);
  };

  $('#form-unanswered').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = Input.serialise(e.target);

    SO.unanswered(input.tags, function (response) {
      UnansweredView.render(response);
    });
  });

  $('#form-answerers').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = Input.serialise(e.target);

    SO.answerers(input.tags, function (response) {
      AnswerersView.render(response);
    });
  });
})();
