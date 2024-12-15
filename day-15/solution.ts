function parseInput(path: string) {
  const [rawMap, moves] = Deno.readTextFileSync(path).split("\n\n");
  let robot: [number, number] | null = null;
  const map = rawMap.split("\n").map((x, i) => {
    const row = x.split("");
    if (robot === null) {
      const j = row.findIndex((v) => v === "@");
      if (j !== -1) {
        robot = [i, j];
      }
    }
    return row;
  });

  return {
    map,
    moves: moves.split("\n").join("").split(""),
    robot: robot!,
  };
}

function getInfront(
  position: [number, number],
  map: Array<Array<string>>,
  move: string,
) {
  const [y, x] = position;
  const infront: Array<[number, number]> = [position];
  switch (move) {
    case "^": {
      for (let i = y - 1; i >= 0; i--) {
        if (map[i][x] === "#") {
          break;
        }
        infront.push([i, x]);
      }
      break;
    }
    case ">": {
      for (let i = x + 1; i < map[y].length; i++) {
        if (map[y][i] === "#") {
          break;
        }
        infront.push([y, i]);
      }
      break;
    }
    case "v": {
      for (let i = y + 1; i < map.length; i++) {
        if (map[i][x] === "#") {
          break;
        }
        infront.push([i, x]);
      }
      break;
    }
    case "<": {
      for (let i = x - 1; i >= 0; i--) {
        if (map[y][i] === "#") {
          break;
        }
        infront.push([y, i]);
      }
      break;
    }
  }
  return infront;
}

function moveRobot(
  position: [number, number],
  map: Array<Array<string>>,
  move: string,
) {
  const infront = getInfront(position, map, move);
  const firstEmptySpaceIndex = infront.findIndex(([y, x]) => map[y][x] === ".");
  if (firstEmptySpaceIndex === -1) {
    return position;
  }
  for (let i = firstEmptySpaceIndex; i > 0; i--) {
    const [b, a] = infront[i];
    const [y, x] = infront[i - 1];
    [map[b][a], map[y][x]] = [map[y][x], map[b][a]];
  }
  const [y, x] = position;
  map[y][x] = ".";

  return infront[1];
}
let { map, moves, robot } = parseInput("./day-15/input.txt");

for (const move of moves) {
  robot = moveRobot(robot, map, move);
}

const sum = map.reduce((p, c, y) =>
  p + c.reduce((p, c, x) => {
    if (c === "O") {
      return p + (100 * y + x);
    }
    return p;
  }, 0), 0);

console.log(sum);
