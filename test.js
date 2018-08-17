const optimizePath = require('./optimize-paths');
const test = require('tape');

test('Optimize Path', t => {
  const input = [
    [[7, 8], [5, 3]],
    [[2, 3], [4, 4]],
    [[1, 1], [2, 2]],
  ];

  const output = [
    [[1, 1], [2, 2]],
    [[2, 3], [4, 4]],
    [[5, 3], [7, 8]],
  ];

  t.deepEqual(optimizePath(input), output);
  t.end();
});

test('Optimize Path - Connected Lines', t => {
  const pen_thickness = 0.25;
  const input = [
    [[7, 8], [5, 3]],
    [[2, 2.1], [4, 4]],
    [[1, 1], [2, 2]],
  ];

  const output = [
    [[1, 1], [2, 2], [2, 2.1], [4, 4]],
    [[5, 3], [7, 8]],
  ];

  t.deepEqual(optimizePath(input, pen_thickness), output);
  t.end();
});

test('Optimize Path - Don\'t Connect Lines', t => {
  const pen_thickness = 0.05;
  const input = [
    [[7, 8], [5, 3]],
    [[2, 2.1], [4, 4]],
    [[1, 1], [2, 2]],
  ];

  const output = [
    [[1, 1], [2, 2]],
    [[2, 2.1], [4, 4]],
    [[5, 3], [7, 8]],
  ];

  t.deepEqual(optimizePath(input, pen_thickness), output);
  t.end();
});