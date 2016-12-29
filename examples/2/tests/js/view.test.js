/* global QUnit, View */

QUnit.module('View Module', {
  beforeEach: function createFixture () {
    var fixture = document.querySelector('#qunit-fixture');
    fixture.innerHTML = [
      '<div>',
      '<h1>Foo</h1>',
      '<span>Hello</span>',
      '<div></div>',
      '</div>',
    ].join('');
  },
  afterEach: function teardownFixture () {
    document.querySelector('#qunit-fixture').innerHTML = '';
  },
}, function () {

  QUnit.test('View.render | inject markup into target | overwrite', function (assert) {
    var markup = '<p>Injected</p>';
    var target = '#qunit-fixture div';

    View.render(markup, target);

    assert.equal(document.querySelector(target).innerHTML, markup, 'Markup overwritten');
  });

  QUnit.test('View.render | inject markup into target | append', function (assert) {
    var markup = '<p>Injected</p>';
    var target = '#qunit-fixture div div';

    View.render(markup, target);

    assert.equal(document.querySelector(target).innerHTML, markup, 'Markup overwritten');
  });
});
