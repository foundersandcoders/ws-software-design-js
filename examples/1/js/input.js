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
