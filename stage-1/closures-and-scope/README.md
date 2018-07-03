# Closures and Scope

## Learning Outcomes
* Understand the term 'scope'
* Understand what a closure is and how to create one

## What is meant by scope in JavaScript?
The idea of 'scope' refers to what the _execution context_ of a particular piece of code is. One of the most important things this context determines is what variables are available to that piece of code.

In ES5 JavaScript, scope is exclusively delimited by functions. In ES6 JavaScript, block-scoping has been introduced via the `let` and `const` keywords. Both these things will be explained further on.

## Function Scope
The global scope is the default scope for all JavaScript in the browser. Any JavaScript executed by the browser can access variables defined in global scope.

```js
// global scope
var foo = 'bar';
```

Creating a new scope is as simple as creating a new function:

```js
// global scope (scope A)
var foo = 'foo';

function bar () {
  // local scope (scope B)

  var pam = 'pam';   // pam is now available in scope B, but not scope A
  var a = foo + pam; // foo is available in scope B, because it was defined in global scope
  return a;
}

console.log(bar()); // 'foopam'
console.log(foo);   // 'foo'
console.log(pam);   // ReferenceError
```

More formally, each function has access to its own _local_ scope, and also the scope of the function that _encloses_ it (or global scope, if there is no enclosing function).

```js

// global scope (scope A)
var foo = 'foo';

function bar () {
  // local scope (scope B)
  // Has access to: scope B and scope A
  var a = 'a';

  function pam () {
    // local scope (scope C)
    // Has access to: scope C, scope B and scope A
    var b = 'b';
    return foo + b + a;
  }

  return pam();
}

console.log(foo);   // foo
console.log(bar()); // fooba
console.log(a);     // ReferenceError
console.log(b);     // ReferenceError
```

This relationship is applied recursively, which means that no matter how deeply nested a function is, it will have access to variables defined in all scopes enclosing it (including the global scope).

## Block Scope

Block scoping was introduced to JavaScript via the `let` and `const` keywords, which are used to declare variables in the same way as `var`. The difference (in terms of scoping at least) is that while variables declared with `var` are available within the function in which they're defined (and all sub-functions), variables defined with `let` and `const` are only available within the _block_ they're defined in:

```js
// global scope

var bar = 'bar';
var array = [1, 2, 3];

if (true) {
  // local block scope A
  let pam = bar + 'pam'; // barpam
  const j = 0;
}

for (let i = 0; i < array.length; i++) {
  // local block scope B
  console.log(i, array[i]);

  console.log(j);   // ReferenceError
  console.log(pam); // ReferenceError
}

console.log(pam); // ReferenceError
console.log(i);   // ReferenceError
console.log(j);   // ReferenceError
```

The differences between `var`, `let` and `const` can be summarised as follows:
* Variables declared with `var` can be reassigned and are function-scoped.
* Variables declared with `let` can be reassigned and are block-scoped.
* Variables declared with `const` cannot be reassigned and are block-scoped.

## What is a Closure?
If you have been writing JavaScript for a while, chances are you will probably have used closures already without realising.

Simply defined, a closure is a technique for creating scopes that persist even after the function they are defined by has returned. Again, let's illustrate this with an example:

```js
// global scope (scope A)

function createIncrementer () {
  // local scope (scope B)
  var a = 1;

  return function addOneTo (n) {
    // local scope (scope C)
    return a + n;
  }
}

var addOneTo = createIncrementer();
// Now the value of `addOneTo` is the function returned from `createIncrementer`.
// This value exists in the global scope. The body of `addOneTo` references
// variable `a` defined in `scope B`, therefore this variable remains available
// to `addOneTo` even after `createIncrementer` returns.

console.log(addOneTo(2)); // returns 3
console.log(a);           // ReferenceError
```

And that's basically it. Note that the variables defined in `scope B` here are sometimes referred to as being in the _closure scope_ or the _lexical scope_ of `addOneTo`.

## Why are closures useful?
Closures are useful because they allow the implementation of all sorts of higher-level abstractions, including:

* the creation of _private_ variables (or state)
* the _parameterised_ creation of functions
* the creation of _modules_


## Scope traps
#### Sequential script load order
In the [function scope](#function-scope) section, we remarked:
> Any JavaScript executed by the browser can access variables defined in global scope.

This is true as far as it goes, but it should be remembered that `<script>` tags in the browser are parsed and executed sequentially:

```html
<script src="./script.1.js"></script>
<script src="./script.2.js"></script>
```

In this example, all JavaScript in `script.2.js` will have access to the global variables defined in `script.1.js`, but the reverse is not true, because `script.1.js` is executed before `script.2.js`.

#### Loop variables, `var` vs `let`
TBD

## Exercises
Attempt `./exercise.js` in this directory.

You can check your code by running the test suite for this exercise with `npm run s1.closures`
