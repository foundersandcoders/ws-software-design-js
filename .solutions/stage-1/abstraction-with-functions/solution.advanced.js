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
 * Level 2: More advanced solution
 *
 * Mapping over object keys
 * Mapping over object values
 */


function mapObjKeys (fn, input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      acc[fn(key)] = input[key];
      return acc;
    }, {});
}

function mapObjVals (fn, input) {
  return Object.keys(input)
    .reduce(function (acc, key) {
      acc[key] = fn(input[key]);
      return acc;
    }, {});
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


function capitaliseObjectKeys (input) {
  return mapObjKeys(capitalise, input);
}


function capitaliseObjectValues (input) {
  return mapObjVals(capitalise, input);
}

function incrementObjectValues (input) {
  return mapObjVals(increment, input);
}

function reverseObjectKeys (input) {
  return mapObjKeys(reverse, input);
}
