/*
 * Fetch
 * Module to perform get requests to given url
 *
 * Design notes:
 * > This module provides a simplified API to deal with all AJAX requests. In
 *   this way, a great deal of the heavily side-effectful code is contained in a
 *   single ~30 line module, instead of several places throughout the app.
 * > A single generic `request` function provides a flexible-enough
 */
var Fetch = (function () {
  var HTTP_RESP_OK = 200;

  function request (method, url, body, success, failure) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_RESP_OK)
        success(JSON.parse(xhr.responseText));
    });
    xhr.addEventListener('abort', failure);
    xhr.addEventListener('error', failure);

    xhr.open(method, url);
    xhr.send(body);
  }

  function get (url, success, failure) {
    request('GET', url, null, success, failure);
  }

  return {
    get: get,
  };
})();
