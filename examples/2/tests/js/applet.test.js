/* global QUnit, Applet */

QUnit.module('Applet', {
  beforeEach: function createFixture () {
    document.querySelector('#qunit-fixture').innerHTML = [
      '<form id="source">',
      '<input type="text" name="foo" value="bar"/>',
      '</form>',
      '<div id="target">',
      '<div class="summary"></div>',
      '<div class="results"></div>',
      '</div>',
    ].join('');
  },
  afterEach: function teardownFixture () {
    document.querySelector('#qunit-fixture').innerHTML = '';
  },
}, function () {

  var dummyApplet = {
    url: function () {return '';},
    source: function () {return '#source';},
    summarySelector: function () {return '#target .summary';},
    resultsSelector: function () {return '#target .results';},
    generateResults: function () {return 'My Results';},
    generateSummary: function () {return 'My Summary';},
  };

  QUnit.test('Applet.init | sets up dummy applet', function (assert) {
    Applet.init(dummyApplet);
    assert.ok(true);
  });

  QUnit.test('Applet.init | throws for incorrect API', function (assert) {
    assert.throws(function () {
      Applet.init({});
    }, new Error('Provided applet has invalid API'), 'Throws for invalid API');
  });
});
