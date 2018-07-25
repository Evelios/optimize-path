const deepCopy = require('deep-copy');

// Return a new list contining the optimized path from `lines`
module.exports = function optimizePath(lines) {
  if (lines.length == 0) {
    return [];
  }

  const dist2 = (v1, v2) => Math.pow((v1[0] - v2[0]), 2) + Math.pow((v1[1] - v2[1]), 2);
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
    explored.push(current_node);

  }

  return explored;
};