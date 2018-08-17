const deepCopy = require('deep-copy');

/**
 * Return a new list contining the optimized path from lines to speed up
 * print times for the pen plotter. It also includes an optimization to combine
 * path together with a maximum distance which should be set by the pen
 * thickness.
 * 
 * @param {Line[]} lines A list of lines represented in vector list form
 * @param {number} pen_width Combine lines together smaller than the pen width
 */
module.exports = function optimizePath(lines, pen_width=0) {
  if (lines.length == 0) {
    return [];
  }

  const dist2 = (v1, v2) => Math.pow((v1[0] - v2[0]), 2) + Math.pow((v1[1] - v2[1]), 2);
  const pen_width_squared = Math.pow(pen_width, 2); // Square this because distance is in squared units
  let frontier = deepCopy(lines);
  let current_node = frontier.pop();
  let explored = [current_node];

  while (frontier.length !== 0) {
    let reversed = false;
    let path_index = -1;
    let closest_dist = Infinity;
    let dist = Infinity;
    let path;
    let current_endpoint = current_node[current_node.length - 1];

    // Get the path that is closest to the current_node
    for (let index = 0; index < frontier.length; index ++) {
      path = frontier[index];
      // Regular Orientation
      dist = dist2(current_endpoint, path[0]);
      if (dist < closest_dist) {
        reversed = false;
        path_index = index;
        closest_dist = dist;
      }
      // Reversed Orientation
      dist = dist2(current_endpoint, path[path.length-1]);
      if (dist < closest_dist) {
        reversed = true;
        path_index = index;
        closest_dist = dist;
      }
    }

    // Add the closest path to the explored list and remove it from the frontier
    current_node = frontier[path_index];
    frontier.splice(path_index, 1);
    if (reversed) {
      current_node = current_node.reverse();
    }

    // If the paths are closer than the pen width, them combine them
    if (closest_dist < pen_width_squared) {
      explored[explored.length - 1] = explored[explored.length - 1].concat(current_node);
    } else {
      explored.push(current_node);
    }

  }

  return explored;
};