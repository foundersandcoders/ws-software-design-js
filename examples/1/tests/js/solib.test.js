/* global SO */

QUnit.module('SOLib', function () {

  QUnit.test('SOLib.url | unsupported case', function (assert) {
    assert.equal(
      typeof SO.url('foo', {}),
      'undefined',
      'Unsupported case returns undefined'
    );
  });

  QUnit.test('SOLib.url | unanswered case', function (assert) {
    assert.equal(
      SO.url('unanswered', {tags: 'HTML'}),
      'https://api.stackexchange.com/2.2/questions/unanswered?tagged=HTML&site=stackoverflow',
      'Unanswered case constructs correct URL'
    );
  });

  QUnit.test('SOLib.url | answerers case', function (assert) {
    assert.equal(
      SO.url('answerers', {tags: 'HTML'}),
      'https://api.stackexchange.com/2.2/tags/HTML/top-answerers/all_time?site=stackoverflow',
      'Answerers case constructs correct URL'
    );
  });

});
