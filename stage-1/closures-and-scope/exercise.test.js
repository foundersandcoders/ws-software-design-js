'use strict';

const tape = require('tape');
const exercise = require('./exercise.js');

tape('Closures and Scope', function (test) {
  test.test('increment', function (t) {
    t.equal(exercise.increment(4), 5, 'Expect increment(4) === 5');
    t.equal(exercise.increment(99), 100, 'Expect increment(99) === 100');
    t.equal(exercise.increment(-1), 0, 'Expect increment(-1) === 0');
    t.equal(exercise.increment(-100), -99, 'Expect increment(-100) === -99');
    t.equal(exercise.increment(Infinity), Infinity, 'Expect increment(Infinity) === Infinity');
    t.end();
  });

  test.test('createIncrementer', function (t) {
    const incBy3 = exercise.createIncrementer(3);
    const incBy2 = exercise.createIncrementer(2);
    const decBy1 = exercise.createIncrementer(-1);

    t.equal(incBy3(5), 8);
    t.equal(incBy3(-1), 2);
    t.equal(incBy3(-0), 3);
    t.equal(incBy2(19), 21);
    t.equal(incBy2(-43), -41);
    t.equal(incBy2(Infinity), Infinity);
    t.equal(decBy1(-4), -5);
    t.equal(decBy1(0), -1);
    t.equal(decBy1(5), 4);
    t.end();
  });

  test.test('createCounter', function (t) {
    const c1 = exercise.createCounter();
    const c2 = exercise.createCounter();
    const c3 = exercise.createCounter();

    // Initial state
    t.equal(c1.read(), 0);
    t.equal(c2.read(), 0);
    t.equal(c3.read(), 0);

    // Increments are independent
    c1.inc();
    t.equal(c1.read(), 1);
    t.equal(c2.read(), 0);
    t.equal(c3.read(), 0);

    // Decrements are independent
    c3.dec();
    t.equal(c1.read(), 1);
    t.equal(c2.read(), 0);
    t.equal(c3.read(), -1);

    // Operations stack
    c2.inc();
    c2.inc();
    c2.inc();
    c2.dec();
    t.equal(c1.read(), 1);
    t.equal(c2.read(), 2);
    t.equal(c3.read(), -1);

    t.end();
  });
});
