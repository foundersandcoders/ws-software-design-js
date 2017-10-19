# Functions as First Class Objects

## Learning Outcomes
* Understand what a First Class Object is

## What is a First Class Object?
The simplest explanation might be, an object that behaves as though it is has a value, so that you can treat it _almost_ like any other variable. So, you can:
* create and destroy it (at runtime)
* pass it to functions and return it from functions
* print it
* store it in data structures (like arrays or objects)

## How are functions First Class?
Functions in JavaScript are said to be _first class objects_ because they fulfil the above criteria.

You can store references to functions in variables:
```js
var foo = function (a) {
  return a + 1;
};

// or

function foo (a) {
  return a + 1;
}
```

You can store references to functions in other data structures:

```js
var object = {
  foo: function (a) {
    return a + 1;
  }
};

// or

var foo = function (a) {
  return a + 1;
};

var object = {
  foo: foo,
};

object.foo(3); // gives 4
```

You can pass functions as arguments to functions:

```js
function foo (a) {
  return a + 1;
}

function apply (fun, num) {
  return fun(num);
}

apply(foo, 3); // gives 4
```

You can return a function from a function:

```js
function foo (a) {
  return a + 1;
}

function bar () {
  return foo;
}

var fun = bar();

fun(3);   // gives 4
bar()(3); // also gives 4
```

In JavaScript, the `Function` data-type is an instance of the `Object` data-type:

```js
function foo (a) {
  return a + 1;
}

foo instanceof Function; // gives `true`
foo instanceof Object;   // gives `true`
```

This means you can attach arbitrary attributes to functions:

```js
function foo (a) {
  return a + 1;
}

foo.bar = 2;
```

Note that identity of functions works the same way as identity of objects in JavaScript (because instances of `Function` are also instances of `Object`):

```js
var foo = function (a) {
  return a + 1;
};

var bar = function (a) {
  return a + 1;
};

var pam = foo;

foo == bar; // gives `false`
bar == pam; // gives `false`
foo == pam; // gives `true`
```


## Why is this useful?
First class functions are extremely useful because they allow you to (eventually):
* Create powerful abstractions which reduce and factor out details so that developers can focus on fewer concepts. This is covered in more detail in [abstraction-with-functions](../abstraction-with-functions)
* Break-up and modularise code more easily (particularly asynchronous code)
