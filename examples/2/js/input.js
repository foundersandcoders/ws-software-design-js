/*
 * Input Module
 * The simplest module in the app, exports a single function `serialise`
 *
 * Design notes:
 * > The `serialise` is pure. It takes a <Node> as input and builds it's output
 *   from it. This means it can be tested easily by passing any <Node> object to
 *   it.
 * > We haven't given this module any information about the environment in which
 *   we will use it, meaning it's not specifically looking at the DOM for a
 *   <form> element, but instead asking for one to be passed to it. This means
 *   it could have a use beyond the app we are currently building.
 */
var Input = (function () {
  'use strict';

  function toArray (arrayLike) {
    return Array.prototype.slice.call(arrayLike);
  }

  function serialise (node) {
    return toArray(node.querySelectorAll('input'))
      .reduce(function (acc, input) {
        acc[input.name] = input.value;
        return acc;
      }, {});
  }

  return {
    serialise: serialise,
  };
})();
