# Abstraction with Functions

## Learning Outcomes
* Understand what abstraction is and why it is useful

## What is abstraction?
The term "abstraction" as it is used here, is the process by which we allow the developer to work at a higher conceptual level by limiting the amount of low-level complexity we expose them to. Let's illustrate this with an example:

```js
// Task:
// Write a function that calculates the square root of each number in a collection of numbers

// Here is our collection
var list = [1, 2, 3, 4];

// This is an example of a solution that would be considered "low-level"
function sqRoot_1 (xs) {
  // Here we are telling the computer explicitly _how_ to do the following:
  // * (1) Initialise the output
  // * (2) Iterate through an array
  // * (3) Calculate the result for each item in the input
  // * (4) Add results to the output for each item in the input
  var result = [];                         // (1)
  for (var i = 0; i < xs.length; i++) {    // (2)
    var sqrt = xs[i] ** 0.5                // (3)
    result.push(sqrt);                     // (4)
  }
  return result;
}

// This is an example of a solution that would be considered to be at a higher conceptual
// level than the previous solution
function sqRoot_2 (xs) {
  // Here we use the provided `map` array method. This method abstracts away steps
  // (1), (2), and (4) above; the only _how_ we need to specify is (3).
  //
  // We are simply able to say "I want a new array where each value is the square
  // root of the original", and have the language take care of the tedious steps
  // of construction and iteration.
  return xs.map(function (x) {
    return x ** 0.5;
  });
}
```

To be clear: while in the example above the higher-level solution is shorter than the lower-level one, abstraction is strictly _not_ about writing shorter code; it is about hiding unnecessary complexity and writing code in a way that more closely resembles your mental model of the problem.

## How can abstraction be useful?
Aside from the kinds of examples above, where we substitute low-level code with abstractions that are provided by the language, it is enormously powerful to be able to create _your own_ abstractions, which are specific to the software you are writing and/or the domain within which you are working.

For example, think about a typical front-end web application. It will almost certainly have the following elements:
* Attaching event listeners to DOM nodes
* Making AJAX requests

A naive, low-level implementation will be littered with code that looks something like the following:

```js
// ...

document.querySelector('#foo').addEventListener('submit', function (event) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // ... do something with the response
    }
  });

  xhr.open('GET', 'https://example.com/search?query=' + event.target[0].value);
  xhr.send();
});

document.querySelector('#bar').addEventListener('click', function (event) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      // ... do something with the response
    }
  });

  var element = document.querySelector('#pam');
  xhr.open('GET', 'https://lulz.org/search?query=' + element.value);
  xhr.send();
});

// ...
```

That is, we repeatedly instruct the computer _how_ to attach event listeners, _how_ to send AJAX requests, _how_ it should treat the response, and so on. This burdens the developer with remembering all these details each time, and having to wade through lots of code while reading.

Wouldn't it be better for us to avoid this if possible? Looking again at the elements identified above, let's attempt to abstract away the process of attaching an event listener to a DOM element, and similarly the process of making an AJAX request:

```js
// ...

// First we define some functions that offer simple interfaces for common tasks.
// The functions are abstractions that hide the full complexity of the task from
// the developer.

function addListener (selector, eventName, callback) {
  document.querySelector(selector).addEventListener(eventName, callback);
}

function fetch (url, callback) {
  var xhr = new XMLHttpRequest();

  xhr.addEventListener('load', function () {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      return callback(response);
    }
  });

  xhr.open('GET', url);
  xhr.send();
}

// ... then elsewhere in the application, we use these abstractions instead.
// Our code then becomes easier to read and allows the developer to simply add
// listeners or make AJAX requests without worrying about _how_ they are made.

addListener('#foo', 'submit', function (event) {
  var url = 'https://example.com/search?query=' + event.target[0].value;

  fetch(url, function (response) {
      // ... do something with the response
  });
});

addListener('#bar', 'click', function (event) {
  var element = document.querySelector('#pam');
  var url = 'https://lulz.org/search?query=' + element.value;

  fetch(url, function (response) {
      // ... do something with the response
  });
});

// ...
```

## Exercises
Attempt `./exercise.js` in this directory.

You can check your code by running the test suite for this exercise with `npm run s1.functions`
