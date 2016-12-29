/* global QUnit, Input */

QUnit.module('Input Module', function () {

  QUnit.test('Input.serialise | empty form', function (assert) {
    var form = document.createElement('form');
    var result = Input.serialise(form);
    assert.deepEqual(result, {}, 'empty form -> empty object');
  });

  QUnit.test('Input.serialise | populated form', function (assert) {
    var form = document.createElement('form');
    form.innerHTML = [
      '<input name="foo" value="bar" placeholder="..."/>',
      '<input name="abc" value="def" placeholder="..."/>',
      '<input name="xyz" value="ijk" placeholder="..."/>',
    ].join();

    var result = Input.serialise(form);
    var expected = {foo: 'bar', abc: 'def', xyz: 'ijk'};
    assert.deepEqual(result, expected, 'key-value pairs reflect name-value attributes');
  });
});
