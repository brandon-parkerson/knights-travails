let board = [
  [0, 0, 0, 0, 0, 0, 0, 0], // 0
  [0, 0, 0, 0, 0, 0, 0, 0], // 1
  [0, 0, 0, 0, 0, 0, 0, 0], // 2
  [0, 0, 0, 0, 0, 0, 0, 0], // 3
  [0, 0, 0, 0, 0, 0, 0, 0], // 4
  [0, 0, 0, 0, 0, 0, 0, 0], // 5
  [0, 0, 0, 0, 0, 0, 0, 0], // 6
  [0, 0, 0, 0, 0, 0, 0, 0], // 7
  //   0, 1, 2, 3, 4, 5, 6, 7
];

function knightMoves(start, end) {
  if (start.toString() === end.toString()) {
    return "Start and end point are the same.";
  }

  let q = [];
  let visited = new Set();
  let parentMap = new Map(); // To track the path

  q.push([start, 0]); // Push starting position with number of moves
  visited.add(start.toString());
  parentMap.set(start.toString(), null); // Start position has no parent

  while (q.length !== 0) {
    let [currentPosition, moves] = q.shift();

    // If position is the target, backtrack to find the path
    if (currentPosition.toString() === end.toString()) {
      let path = [];
      let step = currentPosition;

      // Backtrack from the end to the start using the parentMap
      while (step !== null) {
        path.push(step);
        step = parentMap.get(step.toString()); // Move to the parent
      }

      path.reverse(); // Reverse to get the correct order
      return `The shortest path is ${moves} moves: ${path
        .map((pos) => `[${pos}]`)
        .join(" -> ")}`;
    }

    // Get next moves
    let nextMoves = getMoves(currentPosition);

    for (let move of nextMoves) {
      if (!visited.has(move.toString())) {
        visited.add(move.toString());
        parentMap.set(move.toString(), currentPosition); // Record how we reached this position
        q.push([move, moves + 1]);
      }
    }
  }

  return "Destination is impossible";
}

function getMoves(currentPosition) {
  let possibleMoves = [
    [1, 2],
    [1, -2],
    [2, 1],
    [2, -1],
    [-1, 2],
    [-1, -2],
    [-2, 1],
    [-2, -1],
  ];

  let validMoves = [];

  for (let move of possibleMoves) {
    let newX = currentPosition[0] + move[0];
    let newY = currentPosition[1] + move[1];

    // check if move is within the board
    if (newX >= 0 && newX < 8 && newY >= 0 && newY < 8) {
      validMoves.push([newX, newY]);
    }
  }

  return validMoves;
}

console.log(knightMoves([3, 3], [4, 3]));
