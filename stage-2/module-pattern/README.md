# The Module Pattern

## What is a Module?
Many languages have the concept of a 'module', or a self-contained bundle of code, built in. This makes it much easier to achieve a modular, robust design. In the browser, Javascript doesn't have this. Any variable or function defined in the global scope of a script file is also in the global scope of any script loaded after it. However, there is a way to avoid this ([without any](https://www.npmjs.com/package/browserify) [additional tooling](https://www.npmjs.com/package/webpack)), and it's called the _module pattern_.

We will briefly outline the idea here, but for more detail, the following articles are strongly recommend:
* [Mastering the module pattern](https://toddmotto.com/mastering-the-module-pattern/)
* [The module pattern in depth](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)

## How to create a Module?
The module pattern exploits the technique of creating a [closure](../../stage-1/closures-and-scope) to create variables which can by used by the module, but not directly by any of the code outside it.

This can be used as a way to build [abstractions](../../stage-1/abstraction-with-functions) which present simple interfaces to the developer and hides away implementation details and complexity.

We can illustrate this with an example creating a simple calculator:

```js
function createCalculator () {
  var result = 0;

  function add (n) {
    result += n;
  }

  function subtract (n) {
    result -= n;
  }

  function read () {
    return result;
  }

  function clear () {
    result = 0;
  }

  return {
    add: add,
    subtract: subtract,
    read: read,
    clear: clear,
  };
}

var calculator = createCalculator();
var anotherCalculator = createCalculator();

calculator.add(3);
calculator.subtract(1);
calculator.read();        // returns 2;

anotherCalculator.read(); // returns 0;

calculator.clear();
calculator.read();        // returns 0;
```

Note that the above form of the module pattern allows for the creation of several instances of the module, but each instance needs to be explicitly created. If multiple instances are not necessary, it is also possible to exploit the **IIFE** (_immediately-invoked-function-expression_) technique to instantiate the module immediately:

```js
var Calculator = (function createCalculator () {
  // ... module code
})();

Calculator.add(3);
Calculator.read(); // returns 3;
```

## When should I use the module pattern?
The module pattern may be appropriate if you wish to create an abstraction that has the ability to do the following:
* hide complex implementations
* present a simpler interface to the developer than the underlying code
* maintain an internal private state
* keep variables which are irrelevant to the rest of the code within the private scope of the module

## When shouldn't I use the module pattern?
If the abstraction you wish to create has no internal state, and the implementation is not too complex, it may often be simpler (and therefore better) to simply write a function.

## Exercises
Attempt `./exercise.js` in this directory.

You can check your code by running the test suite for this exercise with `npm run s2`
