var store = null;

QUnit.module('Fetch Module', {
  before: function () {
    store = window.XMLHttpRequest;
    window.__requests = {};

    window.XMLHttpRequest = function LOL () {
      this.status = null;
      this.responseText = null;

      this.__listeners = {};

      this.addEventListener = function (evnt, fn) {
        this.__listeners[evnt] = fn;
      };

      this.open = function (method, url) {
        window.__requests[method + ' ' + url] = this;
      };

      this.send = function () {};

      this.trigger = function (response, evnt) {
        this.status = evnt === 'load' ? 200 : 400;
        this.responseText = JSON.stringify(response);
        this.__listeners[evnt]();
      };
    };
  },
  after: function () {
    window.XMLHttpRequest = store;
    delete window.__requests;
  }
}, function () {

  QUnit.test('Fetch.get | success', function (assert) {
    var response = {data: 'bar'};
    var url = 'https://foo.com';

    Fetch.get(url, function (result) {
      assert.deepEqual(response, result, 'Response as expected');
    });

    window.__requests['GET ' + url].trigger(response, 'load');
  });

  QUnit.test('Fetch.get | failure', function (assert) {
    var response = {error: 'baz'};
    var url = 'https://foo.com';

    Fetch.get(
      url,
      function success () {assert.ok(false);},
      function error () {assert.ok(true);}
    );

    window.__requests['GET ' + url].trigger(response, 'error');
  });
});
