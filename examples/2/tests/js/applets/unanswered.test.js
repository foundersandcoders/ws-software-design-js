/* global QUnit, Unanswered */

QUnit.module('Unanswered Applet', function () {
  'use strict';

  QUnit.test('Unanswered.url | no input | throws', function (assert) {
    assert.throws(function () {
      Unanswered.url();
    }, 'Calling with no input throws error');
  });

  QUnit.test('Unanswered.url | object input | wrong fields', function (assert) {
    var url = Unanswered.url({});
    assert.equal(
      url,
      'https://api.stackexchange.com/2.2/'
      + 'questions/unanswered?tagged=undefined&site=stackoverflow'
    );
  });

  QUnit.test('Unanswered.url | object input | correct fields', function (assert) {
    var url = Unanswered.url({tags: 'HTML'});
    assert.equal(
      url,
      'https://api.stackexchange.com/2.2/'
      + 'questions/unanswered?tagged=HTML&site=stackoverflow'
    );
  });

  QUnit.test('Unanswered.source | get form id', function (assert) {
    assert.equal(Unanswered.source(), '#form-unanswered', 'Selector matches');
  });

  QUnit.test('Unanswered.summarySelector | get summary div id', function (assert) {
    assert.equal(Unanswered.summarySelector(), '#results-summary', 'Selector matches');
  });

  QUnit.test('Unanswered.resultsSelector | get summary div id', function (assert) {
    assert.equal(Unanswered.resultsSelector(), '#results-body', 'Selector matches');
  });

  QUnit.test('Unanswered.generateSummary | empty items', function (assert) {
    var data = {items: []};
    var summary = Unanswered.generateSummary(data);
    var expected = data.items.length + ' results found';
    assert.equal(summary, expected, 'Summary markup matches');
  });

  QUnit.test('Unanswered.generateSummary | populated items', function (assert) {
    var data = {items: [{}, {}, {}]};
    var summary = Unanswered.generateSummary(data);
    var expected = data.items.length + ' results found';
    assert.equal(summary, expected, 'Summary markup matches');
  });

  QUnit.test('Unanswered.generateResults | empty items', function (assert) {
    var data = {items: []};
    var summary = Unanswered.generateResults(data);
    var expected = '';
    assert.equal(summary, expected, 'Results markup should be empty');
  });

  QUnit.test('Unanswered.generateResults | single item', function (assert) {
    var data = {items: [
      {
        title: 'foo',
        creation_date: 0,
        link: 'google.com',
        view_count: 0,
        owner: {display_name: 'jim', reputation: 0}
      }
    ]};

    var summary = Unanswered.generateResults(data);

    var expected = [
      '<div> Question: ' + data.items[0].title + '</div>',
      '<div> Asked: ' + new Date(1000 * data.items[0].creation_date) + '</div>',
      '<div> Link: <a href="' + data.items[0].link + '"> ' + data.items[0].link + '</a></div>',
      '<div> Views: ' + data.items[0].view_count + '</div>',
      '<div> Owner: ' + data.items[0].owner.display_name + '</div>',
      '<div> Owner Reputation:' + data.items[0].owner.reputation + '</div>',
      '<br>',
    ].join('');

    assert.equal(summary, expected, 'Results markup should be empty');
  });
});
