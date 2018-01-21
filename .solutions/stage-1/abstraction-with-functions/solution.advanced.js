/*
 * Exercise: Refactor the code!
 *
 * This file is a collection of functions you've been asked to refactor.
 *
 * The primary purpose of this exercise is to use your judgement to decide when
 * and where to introduce appropriate abstractions, and whether you can use
 * either abstractions provided by JavaScript, or write your own.
 *
 * The command
 *   npm run s1.functions
 * will run tests to ensure the functions do what they should. They should all
 * still pass when you've finished refactoring.
 *
 * Advice:
 * + Try to recognise common patterns in the code.
 * + When you have recognised a pattern, think about if you could make a
 *   function to encapsulate it, instead of repeating code in several places.
 */
'use strict';

/*
 * More advanced solution
 *
 * We recognise that every function needs to iterate over the keys and values of
 * an object.
 *
 * We also recognise that every function makes changes to either the keys or the
 * values while it iterates.
 *
 * This is the central pattern that we can write an abstraction for.
 */


/*
 * This is our central abstraction. It is a higher-order function that takes
 * care of iterating over an object and constructing a new one. It accepts two
 * functions as arguments that specify how each key and value should be changed.
 * The final argument is the object to be mapped over.
 */
function mapObj (keyMap, valueMap, input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      acc[keyMap(key)] = input[valueMap(key)];
      return acc;
    }, {});
}

/*
 * Now we have a collection of functions that we can pass to our `mapObj`
 * function that will change the way that it maps over a given object.
 */

function identity (x) {
  return x;
}

function capitalise (str) {
  return str.slice(0, 1).toUpperCase().concat(str.slice(1));
}

function reverse (str) {
  return str.split('').reverse().join('');
}

function increment (n) {
  return n + 1;
}


/*
 * Now we define the functions we want in terms of the `mapObj` higher-order
 * function and the other functions we defined above.
 */

function capitaliseObjectKeys (input) {
  // This says:
  // > map over the object
  // > use `capitalise` to transform the object keys
  // > use `identity` to transform the object values
  return mapObj(capitalise, identity, input);
}

function capitaliseObjectValues (input) {
  // This says:
  // > map over the object
  // > use `identity` to transform the object keys
  // > use `capitalise` to transform the object values
  return mapObj(identity, capitalise, input);
}

function incrementObjectValues (input) {
  // This says:
  // > map over the object
  // > use `identity` to transform the object keys
  // > use `increment` to transform the object values
  return mapObj(identity, increment, input);
}

function reverseObjectKeys (input) {
  // This says:
  // > map over the object
  // > use `reverse` to transform the object keys
  // > use `identity` to transform the object values
  return mapObj(reverse, identity, input);
}


module.exports = {
  capitaliseObjectKeys,
  capitaliseObjectValues,
  incrementObjectValues,
  reverseObjectKeys,
};
