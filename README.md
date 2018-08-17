# Optimize Path

This is an algorithm to optimize a series of line paths. This algorithm is used
to sort the paths in an order that will speed up the time it will take to print
them with a pen-plotter. This algorithm can also take into account the pen
thickness so that if a line ends near where a different line starts, then their
paths are merged together so that the pen plotter doesn't have to lift up the
pen to continue with the stroke.

# Usage

`optimizePath(input_paths, [pen_thickness])`
+ `input_paths` : a list of path lines `[ line1, line2, line3, ... ]`
  + Input lines are in list form, `[ [x1, y1], [x2, y2], ... ]`
+ `pen_thickness` : the thickness of the pen which determines the maximum
  distnace to combine paths tohether

## Example
```js
const optimizePath = require('optimize-paths');

const input = [
  [[7, 8], [5, 3]], // 1
  [[2, 3], [4, 4]], // 2
  [[1, 1], [2, 2]], // 3
];

const output = optimizePaths(input);
// [
//   [[1, 1], [2, 2]], // 3
//   [[2, 3], [4, 4]], // 2
//   [[5, 3], [7, 8]], // 1
// ];

// Calling with the pen thickness input
const pen_width = 1;
const joined_output = optimizePaths(input, pen_width);
// [
//   [[1, 1], [2, 2], [2, 3], [4, 4]],  // 3 & 2
//   [[5, 3], [7, 8]],                  // 1
// ];
```

# Change Log

### Version 1.1.0
+ Added support for combining lines based on the pen thickness