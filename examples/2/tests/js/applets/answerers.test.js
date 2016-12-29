/* global QUnit, Answerers */

QUnit.module('Answerers Applet', function () {
  'use strict';

  QUnit.test('Answerers.url | no input | throws', function (assert) {
    assert.throws(function () {
      Answerers.url();
    }, 'Calling with no input throws error');
  });

  QUnit.test('Answerers.url | object input | wrong fields', function (assert) {
    var url = Answerers.url({});
    assert.equal(
      url,
      'https://api.stackexchange.com/2.2/'
      + 'tags/undefined/top-answerers/all_time?tagged=undefined&site=stackoverflow'
    );
  });

  QUnit.test('Answerers.url | object input | correct fields', function (assert) {
    var url = Answerers.url({tags: 'HTML'});
    assert.equal(
      url,
      'https://api.stackexchange.com/2.2/'
      + 'tags/HTML/top-answerers/all_time?tagged=HTML&site=stackoverflow'
    );
  });

  QUnit.test('Answerers.source | get form id', function (assert) {
    assert.equal(Answerers.source(), '#form-answerers', 'Selector matches');
  });

  QUnit.test('Answerers.summarySelector | get summary div id', function (assert) {
    assert.equal(Answerers.summarySelector(), '#results-summary', 'Selector matches');
  });

  QUnit.test('Answerers.resultsSelector | get summary div id', function (assert) {
    assert.equal(Answerers.resultsSelector(), '#results-body', 'Selector matches');
  });

  QUnit.test('Answerers.generateSummary | empty items', function (assert) {
    var data = {items: []};
    var summary = Answerers.generateSummary(data);
    var expected = data.items.length + ' results found';
    assert.equal(summary, expected, 'Summary markup matches');
  });

  QUnit.test('Answerers.generateSummary | populated items', function (assert) {
    var data = {items: [{}, {}, {}]};
    var summary = Answerers.generateSummary(data);
    var expected = data.items.length + ' results found';
    assert.equal(summary, expected, 'Summary markup matches');
  });

  QUnit.test('Answerers.generateResults | empty items', function (assert) {
    var data = {items: []};
    var summary = Answerers.generateResults(data);
    var expected = '';
    assert.equal(summary, expected, 'Results markup should be empty');
  });

  QUnit.test('Answerers.generateResults | single item', function (assert) {
    var data = {items: [
      {
        post_count: 0,
        user: {display_name: 'jim', reputation: 0, link: 'google.com'}
      }
    ]};

    var summary = Answerers.generateResults(data);

    var expected = [
      '<div> Username: ' + data.items[0].user.display_name + '</div>',
      '<div> Reputation: ' + data.items[0].user.reputation + '</div>',
      '<div> Link: <a href="' + data.items[0].user.link + '"> ' +
          data.items[0].user.link +
      '</a></div>',
      '<div> Post Count: ' + data.items[0].post_count + '</div>',
      '<br>',
    ].join('');

    assert.equal(summary, expected, 'Results markup should be empty');
  });
});
