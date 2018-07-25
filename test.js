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