/* global SO, UnansweredView, AnswerersView */

(function () {
  'use strict';

  var $ = function (selector) {
    return document.querySelector(selector);
  };

  $('#form-unanswered').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = Input.serialise(e.target);

    SO.unanswered(input, function (response) {
      UnansweredView.render(response);
    });
  });

  $('#form-answerers').addEventListener('submit', function (e) {
    e.preventDefault();
    var input = Input.serialise(e.target);

    SO.answerers(input, function (response) {
      AnswerersView.render(response);
    });
  });
})();
