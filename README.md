# Intro to Design & Architecture

## Abstract
A workshop to introduce some ideas of software architecture and design to
beginners in the context of a client-side app.

## Introduction
In this workshop we'll be approaching the problem of creating a small, relatively simple client-side app. We'll use the example of a simple app built on top of the StackOverflow API to explore how one might go about designing a JS application which needs to communicate with a server via AJAX, and then actually implement it using TDD.

This process may well seem overkill for the size of app we are building. It is. The point is, however, to use a simple example to explore ideas that are just as applicable to larger, more complex apps.

The app we'll eventually build is based on the StackOverflow reputation builder that you can find many incarnations of online (see [here](https://github.com/eliascodes/Reputation-Builder), [here](http://codepen.io/moorederodeo/pen/dIJbj) and [here](https://github.com/thinkful-fewd/stackerAJAX) for a few examples). I recommend not looking at any of these until after you finish this workshop.


## Contents
0. [Timeline](#timeline)
1. [User Requirements](#user-requirements)
2. [Architecture](#architecture)
3. [Exercise 1: Architecture](#exercise-1-architecture)
4. [Design Patterns](#design-patterns)
5. [Exercise 2: Design of Components](#exercise-2-design-of-components)
6. [TDD](#tdd)
7. [Exercise 3: First iteration](#exercise-3-first-iteration)
8. [Review](#review)
9. [Exercise 4: Second iteration](#exercise-4-second-iteration)
10. [Notes](#notes)


## Timeline
We should try to broadly stick to the following schedule:
```
10:00 - [15 mins] Intro & discuss user requirements
10:15 - [15 mins] Basic architectural ideas                 \
10:30 - [30 mins] Exercise 1                                 | 1 hour
11:00 - [15 mins] Review                                    /
11:15 - [30 mins] Intro to some useful design patterns      \
11:45 - [1 hour]  Exercise 2                                 | 1 hr 45 mins
12:45 - [15 mins] Review                                    /
13:00 - [1 hour]  Lunch
14:00 - [15 mins] Intro to TDDing from an existing design   \
14:15 - [1 hr 15] Exercise 3                                 | 2 hours
15:30 - [30 mins] Review                                    /
16:00 - [15 mins] Break
16:15 - [1 hour]  Exercise 4                                \ 1 hr 30 mins
17:15 - [30 mins] Review                                    /
17:45 - End
```

## User Requirements
All software projects should ideally be rooted in trying to solve a problem for a user. This workshop will be based around the following (slightly contrived) scenario.

Your end-user is starting out as a developer and wants to build their profile. One way they want to do this is by increasing their reputation score on StackOverflow. They have come to you and asked you to build them a simple app that will allow them to:

1. Easily find questions that they can gain reputation points for answering.
2. Find aspirational targets by finding the top answerers for topics.

We can immediately break down these user requirements into slightly lower level technical requirements.

The app needs to:

1. Communicate with the StackOverflow API.
2. Allow the user to specify the information they want from StackOverflow.
3. Present the user with the information they requested once it is available to the app.

These are still very high-level requirements, but they can be used as a starting point to start thinking about how we'll go about designing and implementing the app.


## Architecture
When we are thinking about architecture, we are thinking about the high-level structure of the system and how each part of the app might interact with all the others to produce the behaviour we seek.

The process of creating an architecture is the process of creating and organising an app into smaller elements and sets of relationships between those elements.

There are many ways you might go about this, and which way you choose can depend on many things, not least of which the scale you are working on, the technologies you are working with, the level of abstraction you are working at, as well as (to a lesser extent) your experience and aesthetic sensibilities.

In this part of the workshop, we won't be covering any specific architectural patterns in detail. What is more important is to start developing the critical ability to identify distinct elements of your app and their relations.

What is the point of this? Architecture is basically an attempt to manage complexity. Large systems are necessarily complex. Complex code is expensive; it is difficult to maintain, test, extend, scale and reason about. A good architecture can mitigate these effects to some extent.

Try to think about the following things when you are architecting an app:
* **How can you separate your concerns?**
  * By 'separation of concerns' we mean keeping aspects of the app that do unrelated things in separate components.
* **How can you make it easy to test?**
  * Broadly speaking, the easiest unit of code to test is a pure function.
  * It is more difficult to test code that has side effects (e.g. manipulating the DOM, making API requests)
  * The more you can isolate those parts of your code, the easier it will be to test the rest of your app.
* **How can you make it easy to change?**
  * Change is a fact of any software project. Priorities and features can and do change. If your architecture isn't accommodating, incorporating changes can be extremely costly.
  * Can you anticipate changes that are likely to occur?


## Exercise 1: Architecture
You'll now attempt to architect the app you've been asked to build.

Use the requirements in the first section to determine what functionality and components your app should have.

At the end of this exercise, you should be able to describe each component of your app, describe its purpose and how it interacts with the other parts of your app.

The precise form is less important. It can be a written list, a diagram, whatever form is most helpful for you.

At this stage, you should not be thinking about implementation. Do not worry about how you're going to write the code, just worry about how the components of the system _should_ relate.

It is worth at least a cursory look through the [StackExchange API documentation](http://api.stackexchange.com/docs/) to understand the kind of requests you might need to make. You may or may not find it useful to identify the specific endpoints that you require to satisfy your user requirements.


## Design Patterns
The idea of a design pattern might be simply summed up as _"a common solution to a common problem"_. No piece of software is wholly original. Each will be attempting to solve at least one problem that someone else has already solved. Over time some of these solutions become commonly adopted by others as templates for their own piece of software.

Knowledge of design patterns is by no means required. However it is very often helpful to understand how people have solved problems similar to yours before, and try to understand whether those solutions are appropriate for your application. Use of the appropriate design patterns can dramatically improve the quality of your code.

In this workshop we'll only introduce the following design patterns:
* [Module pattern](#module-pattern)
* [Dependency injection](#dependency-injection)

There are obviously many, many others which I encourage you to research at a later stage.

### Module Pattern
Many languages have the concept of a 'module', or a self-contained bundle of code, built in. This makes it much easier to achieve a modular, robust design. In the browser, Javascript doesn't have this. Any variable or function defined in the global scope of a script file is also in the global scope of any script loaded after it. However, there is a way to avoid this ([without any](https://www.npmjs.com/package/browserify) [additional tooling](https://www.npmjs.com/package/webpack)), and it's called the _module pattern_.

This section will briefly outline the idea, but I strongly recommend reading [this article](https://toddmotto.com/mastering-the-module-pattern/) (or [this shorter one](http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html)) to understand the pattern in more depth.

The module pattern makes use of the _immediately-invoked-function-expression_ (IIFE) to create a block of code separate from the rest of the file

```js
(function () {
  var x = 1;
})();

console.log(x) // Throws a ReferenceError
```

In this way, variables and functions can be 'hidden' from other code. But this isn't all. Since we are using a function, we can return things out of it:

```js
var Module = (function () {
  var x = 1;
  var addToX = function (a) {
    return a + x;
  };
  return { addToX: addToX };
})();

console.log(Module.addToX(3)); // 4
console.log(Module.x); // undefined
console.log(x); // throws ReferenceError
```

You can also pass things into the module:

```js
var x = 1;
var Module = (function (a) {
  return function (b) {
    return a + b;
  }
})(x)

console.log(Module(2)); // 3
```
This is the basic idea. We can then go about grouping related functionality into modules that could be reused in several places.

A slight variation on this pattern is to get rid of the immediate invocation, and just have a function. This way you can have control over when your module is created, and can create several versions of it with different parameters, if you wish. This is analogous to making a constructor function and calling it with the `new` syntax, except without requiring explicitly considering `this` and execution contexts.

### Dependency Injection
Once code gets past trivial examples, you will discover that one piece of code in fact depends on functionality implemented by a different piece of code. In Javascript it can be tempting to exploit lexical scoping and simply reference variables or methods that are outside of the current function scope. We do this all the time, particularly when interacting with global variables like the `document` object:

```js
var state = true;

function flip () {
  state = !state;
  return state;
}

function getVal () {
  return document.getElementById('foo').value;
}

console.log(flip()); // false
```

But this can sometimes be problematic. In the example above, we have given both the `flip` and `getVal` functions knowledge about their environment; namely that there exists some object in `getVal`s lexical scope that has a `getElementById` method and some variable in `flip`s lexical scope called `state`. This isn't always an issue, but it does mean that we have introduced a coupling between this function and its environment. We are not free to move `flip` to a different file, it must remain where it has access to `state`. This scales badly.

This also impacts testing; if we wish to write a test for `getVal` we must ensure the test environment has the correct HTML (or at least the correct DOM). What if our function was instead making a API request with `XMLHttpRequest`? We don't want our tests to depend on the network.

There are ways around these issues, and one of them is to use _dependency injection_. This is a pattern whereby pieces of code are provided with the the things they are dependent on by the calling code, rather than simply reaching out for them.

```js
var state = true;

function flip (flag) {
  return !flag;
}

function getVal (parent, id) {
  return parent.getElementById(id).value;
}

state = flip(state); // state === false

getVal(document, 'foo'); // foo.value
```

Now `flip` and `getVal` can be moved to another file without breaking anything, and testing both functions becomes trivial; `getVal` simply needs to be passed an object that implements a `getElementById` method that in turn returns a object with a `value` attribute. This means we no longer need to worry about HTML when we are testing.

It might seem tedious to have to specify all dependencies for each function, but this pattern can be combined with the module pattern so that functions inside the module can exploit lexical scoping, but the dependencies of the module itself are injected. Also remember that it is rarely necessary to inject _every_ dependency, simply the ones that allow for better de-coupling.


## Exercise 2: Design
Revisit your architecture. Could you imagine implementing each component (or most of them) as a module? If not, try to modify it to make this possible. Use of the module pattern is recommended.

Beyond this, you are not bound to use any of the patterns described in the previous section, and indeed if there are patterns you are aware of that you think might be appropriate, feel free to use them.

Now for each component of your app:
* determine how you break down it's responsibilities into functions
* determine the interface it will present to the rest of the app
* determine the dependencies it has, and how it will access them
* try to keep in mind how you might test each module as you design

If it helps you to think, you can write some (pseudo-)code. But throw it away afterwards!


## TDD
Hopefully you should already have some familiarity with the process of TDD. If not, have a quick look through [this great README](https://github.com/dwyl/learn-tdd).

Now that you've spend so long thinking about what your app looks like and how it fits together, it should be much easier to write tests for each component, because you should know what each one needs to do.

Your attitude at this stage should ideally be disciplined but pragmatic; Try to stick with the TDD workflow as much as possible, but accept that there will be aspects of your app that you won't be able to test without technologies and concepts that (deliberately) haven't been introduced in this workshop (for example, _mocking_ to make testing AJAX calls easy; see the [notes](#notes) for why this was left out).

It is perfectly fine (and to some extent expected) for your design to evolve during the process of TDD-ing (or more generally implementing) your app. Attempting to make a design concrete will highlight some of the erroneous assumptions you may have made.


## Exercise 3: First iteration
Now it's time to actually write some code! Starting from a completely blank slate (throw away anything you may have written in the previous exercise), begin implementing your design using TDD. Try to implement at least enough functionality to satisfy the first user requirement:

> 1. Easily find questions that they can gain reputation points for answering.

You will probably need to refer to the [StackExchange API documentation](http://api.stackexchange.com/docs/) again.

Try to notice the difference between how you would otherwise have written this code and how you're writing it now.


## Review
Now that you've completed your first iteration, take some time to review how closely it resembles your original design, and how well it fulfills its requirements.

Is there any way to make your app easier to test, to extend or to change? If so, update your design and/or architecture to reflect these things.

Come up with some goals for your second iteration. These can be anything from additional functionality, refactoring, altering the design, or something else.


## Exercise 4: Second iteration
Using the goals you set yourself in the previous section, start a second iteration of your app. If possible, try to get through the second user requirement as well this time:

> 2. Find aspirational targets by finding the top answerers for topics.

______________________

## Notes
* The line between architecture and design is not sharply drawn in reality.
* The concept of mocking has been left out of the workshop for simplicity. Mocking is a very useful and effective tool when writing tests, but including it would have clouded the focus of the workshop. It's also a useful exercise to try to design something to maximise testability without any mocking tools, and increases appreciation of those tools when they _are_ finally introduced, or available.
* Example "solutions" to the workshop are provided in `./examples`.


## Extra Credit
* How would you add well conceived and user-friendly error handling to this app?
* Compare your solutions to the examples, and compare the strengths and weaknesses of each design. Can you synthesise a better design from your solution and the examples?


## Resources
TBD
