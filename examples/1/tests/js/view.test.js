/* global UnansweredView, AnswerersView */

QUnit.module('View Module', function () {

  QUnit.test('View.generateSummary | generates expected markup from data', function (assert) {
    assert.equal(
      View.generateSummary({items: []}),
      '0 results found'
    );

    assert.equal(
      View.generateSummary({items: [1, 2, 3]}),
      '3 results found'
    );
  });
});


QUnit.module('UnansweredView Module', {
  beforeEach: function createFixture () {
    var fixture = document.querySelector('#qunit-fixture');
    fixture.innerHTML = [
      '<div>',
      '<h1 id="results-summary">Foo</h1>',
      '<span>Hello</span>',
      '<div id="results-body"></div>',
      '</div>',
    ].join('');
  },
  afterEach: function teardownFixture () {
    document.querySelector('#qunit-fixture').innerHTML = '';
  },
}, function () {
  QUnit.test('UnansweredView.generateResults | empty data', function (assert) {
    assert.equal(
      UnansweredView.generateResults({items: []}),
      '',
      'Empty results given empty markup'
    );
  });

  QUnit.test('UnansweredView.generateResults | non-empty data', function (assert) {
    var now = Date.now() / 1000;
    var data = {
      items: [{
        title: 'foo',
        creation_date: now,
        link: 'https://foo.bar',
        view_count: 3,
        owner: {display_name: 'baz', reputation: 132}
      }, {
        title: 'abx',
        creation_date: now,
        link: 'https://abx.bar',
        view_count: 5,
        owner: {display_name: 'pog', reputation: 101}
      }]
    };

    var expected = [
      '<div> Question: foo</div>',
      '<div> Asked: ' + new Date(1000 * now) + '</div>',
      '<div> Link: <a href="https://foo.bar"> https://foo.bar</a></div>',
      '<div> Views: 3</div>',
      '<div> Owner: baz</div>',
      '<div> Owner Reputation: 132</div>',
      '<br>',
      '<div> Question: abx</div>',
      '<div> Asked: ' + new Date(1000 * now) + '</div>',
      '<div> Link: <a href="https://abx.bar"> https://abx.bar</a></div>',
      '<div> Views: 5</div>',
      '<div> Owner: pog</div>',
      '<div> Owner Reputation: 101</div>',
      '<br>',
    ].join('');

    assert.equal(
      UnansweredView.generateResults(data),
      expected,
      'Generated markup from data as expected'
    );
  });

  QUnit.test('UnansweredView.render | empty data', function (assert) {
    UnansweredView.render({items: []});

    assert.equal(
      document.querySelector('#results-summary').innerHTML,
      '0 results found',
      'Empty data gives empty results'
    );

    assert.equal(
      document.querySelector('#results-body').innerHTML,
      '',
      'Empty data gives empty results'
    );
  });

  QUnit.test('UnansweredView.render | non-empty data', function (assert) {
    var now = Date.now() / 1000;
    var data = {
      items: [{
        title: 'foo',
        creation_date: now,
        link: 'https://foo.bar',
        view_count: 3,
        owner: {display_name: 'baz', reputation: 132}
      }, {
        title: 'abx',
        creation_date: now,
        link: 'https://abx.bar',
        view_count: 5,
        owner: {display_name: 'pog', reputation: 101}
      }]
    };

    var expected = [
      '<div> Question: foo</div>',
      '<div> Asked: ' + new Date(1000 * now) + '</div>',
      '<div> Link: <a href="https://foo.bar"> https://foo.bar</a></div>',
      '<div> Views: 3</div>',
      '<div> Owner: baz</div>',
      '<div> Owner Reputation: 132</div>',
      '<br>',
      '<div> Question: abx</div>',
      '<div> Asked: ' + new Date(1000 * now) + '</div>',
      '<div> Link: <a href="https://abx.bar"> https://abx.bar</a></div>',
      '<div> Views: 5</div>',
      '<div> Owner: pog</div>',
      '<div> Owner Reputation: 101</div>',
      '<br>',
    ].join('');

    UnansweredView.render(data);

    assert.equal(
      document.querySelector('#results-summary').innerHTML,
      '2 results found',
      'Summary markup as expected'
    );

    assert.equal(
      document.querySelector('#results-body').innerHTML,
      expected,
      'Results markup as expected'
    );
  });
});


QUnit.module('AnswerersView Module', {
  beforeEach: function createFixture () {
    var fixture = document.querySelector('#qunit-fixture');
    fixture.innerHTML = [
      '<div>',
      '<h1 id="results-summary">Foo</h1>',
      '<span>Hello</span>',
      '<div id="results-body"></div>',
      '</div>',
    ].join('');
  },
  afterEach: function teardownFixture () {
    document.querySelector('#qunit-fixture').innerHTML = '';
  },
}, function () {
  QUnit.test('AnswerersView.generateResults | empty data', function (assert) {
    assert.equal(
      AnswerersView.generateResults({items: []}),
      '',
      'Empty results given empty markup'
    );
  });

  QUnit.test('AnswerersView.generateResults | non-empty data', function (assert) {
    var data = {
      items: [{
        user: {
          display_name: 'baz',
          reputation: 23,
          link: 'https://baz.bar',
        },
        post_count: 11
      }, {
        user: {
          display_name: 'foo',
          reputation: 132,
          link: 'https://foo.bar',
        },
        post_count: 3
      }]
    };

    var expected = [
      '<div> Username: baz</div>',
      '<div> Reputation: 23</div>',
      '<div> Link: <a href="https://baz.bar"> https://baz.bar</a></div>',
      '<div> Post Count: 11</div>',
      '<br>',
      '<div> Username: foo</div>',
      '<div> Reputation: 132</div>',
      '<div> Link: <a href="https://foo.bar"> https://foo.bar</a></div>',
      '<div> Post Count: 3</div>',
      '<br>',
    ].join('');

    assert.equal(
      AnswerersView.generateResults(data),
      expected,
      'Empty results given empty markup'
    );
  });

  QUnit.test('AnswerersView.render | empty data', function (assert) {
    AnswerersView.render({items: []});

    assert.equal(
      document.querySelector('#results-summary').innerHTML,
      '0 results found',
      'Empty data gives empty results'
    );

    assert.equal(
      document.querySelector('#results-body').innerHTML,
      '',
      'Empty data gives empty results'
    );
  });

  QUnit.test('AnswerersView.render | non-empty data', function (assert) {
    var data = {
      items: [{
        user: {
          display_name: 'baz',
          reputation: 23,
          link: 'https://baz.bar',
        },
        post_count: 11
      }, {
        user: {
          display_name: 'foo',
          reputation: 132,
          link: 'https://foo.bar',
        },
        post_count: 3
      }]
    };

    var expected = [
      '<div> Username: baz</div>',
      '<div> Reputation: 23</div>',
      '<div> Link: <a href="https://baz.bar"> https://baz.bar</a></div>',
      '<div> Post Count: 11</div>',
      '<br>',
      '<div> Username: foo</div>',
      '<div> Reputation: 132</div>',
      '<div> Link: <a href="https://foo.bar"> https://foo.bar</a></div>',
      '<div> Post Count: 3</div>',
      '<br>',
    ].join('');

    AnswerersView.render(data);

    assert.equal(
      document.querySelector('#results-summary').innerHTML,
      '2 results found',
      'Summary markup as expected'
    );

    assert.equal(
      document.querySelector('#results-body').innerHTML,
      expected,
      'Results markup as expected'
    );
  });
});
