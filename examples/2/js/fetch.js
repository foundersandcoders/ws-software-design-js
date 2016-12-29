/*
 * Fetch
 * Module to perform get requests to given url
 *
 * Design notes:
 * > This module provides a simplified API to deal with all AJAX requests. In
 *   this way, a great deal of the heavily side-effectful code is contained in a
 *   single ~30 line module, instead of several places throughout the app.
 * > This implementation assumes that all responses will be JSON. If we wish to
 *   make requests that return some other content type, we need to inspect the
 *   "Content-Type" header of the request to infer what we should do.
 * > A single generic `request` function provides a flexible-enough
 *   implementation of an AJAX request, then other functions call `request` with
 *   some of the parameters hard-coded to provide convenient shortcuts for
 *   common call patterns. For example, we know we'll make GET requests, so
 *   `Fetch` provides a `.get` method. But now this module can easily be
 *   extended to provide shortcuts for POST, PUT, etc. requests, or other common
 *   usage patterns, depending on the app.
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
