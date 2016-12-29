/*
 * Fetch
 * Module to perform get requests to given url
 *
 */
var Fetch = (function () {
  'use strict';

  var HTTP_RESP_OK = 200;

  function request (method, url, success, failure) {
    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function () {
      if (xhr.status === HTTP_RESP_OK)
        success(JSON.parse(xhr.responseText));
    });
    xhr.addEventListener('abort', failure);
    xhr.addEventListener('error', failure);

    xhr.open(method, url);
    xhr.send();
  }

  function get (url, success, failure) {
    request('GET', url, success, failure);
  }

  return {get: get};
})();
