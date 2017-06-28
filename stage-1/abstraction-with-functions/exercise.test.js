'use strict';

const tape = require('tape');
const exercise = require('./exercise.js');

tape('Abstraction with Functions', function (test) {
  test.test('capitaliseObjectKeys', (t) => {
    const input = { foo: 'foo', bar: 'bar' };

    const result = exercise.capitaliseObjectKeys(input);

    t.deepEqual(result, { Foo: 'foo', Bar: 'bar' });
    t.end();
  });

  test.test('capitaliseObjectValues', (t) => {
    const input = { foo: 'foo', bar: 'bar' };

    const result = exercise.capitaliseObjectValues(input);

    t.deepEqual(result, { foo: 'Foo', bar: 'Bar' });
    t.end();
  });

  test.test('incrementObjectValues', (t) => {
    const input = { foo: 1, bar: 4, baz: -1 };

    const result = exercise.incrementObjectValues(input);

    t.deepEqual(result, { foo: 2, bar: 5, baz: 0 });
    t.end();
  });

  test.test('reverseObjectKeys', (t) => {
    const input = { foo: 1, bar: 4, baz: -1 };

    const result = exercise.reverseObjectKeys(input);

    t.deepEqual(result, { oof: 1, rab: 4, zab: -1 });
    t.end();
  });
});
