type Grid = Array<Array<string>>;
type Direction = "top" | "right" | "bottom" | "left";
type Guard = {
  position: [number, number] | null;
  direction: Direction;
};
export async function parseInput(path: string): Promise<Array<Array<string>>> {
  const input = await Deno.readTextFile(path);
  return input.split("\n").map((line) => line.split(""));
}

function getNextCoordinates(guard: Guard): [number, number] | null {
  if (guard.position === null) {
    return null;
  }

  switch (guard.direction) {
    case "top":
      return [guard.position[0] - 1, guard.position[1]];

    case "right":
      return [guard.position[0], guard.position[1] + 1];

    case "bottom":
      return [guard.position[0] + 1, guard.position[1]];

    case "left":
      return [guard.position[0], guard.position[1] - 1];
  }
}

function getNextDirection(direction: Direction): Direction {
  switch (direction) {
    case "top":
      return "right";

    case "right":
      return "bottom";

    case "bottom":
      return "left";

    case "left":
      return "top";
  }
}

function getSymbolFromDirection(direction: Direction): ">" | "<" | "^" | "v" {
  switch (direction) {
    case "top":
      return "^";

    case "right":
      return ">";

    case "bottom":
      return "v";

    case "left":
      return "<";
  }
}

function getDirectionFromSymbol(symbol: string): Direction {
  switch (symbol) {
    case ">":
      return "right";

    case "v":
      return "bottom";

    case "<":
      return "left";

    case "^":
      return "top";
  }

  throw new Error("unreachable");
}

function findGuard(map: Grid): Guard {
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if ([">", "<", "^", "v"].includes(map[i][j])) {
        return {
          position: [i, j],
          direction: getDirectionFromSymbol(map[i][j]),
        };
      }
    }
  }
  throw new Error("incorrect map");
}

export function move(map: Grid, guard: Guard): Guard {
  const nextCoordinates = getNextCoordinates(guard);
  if (nextCoordinates === null) {
    return guard;
  }
  const [i, j] = nextCoordinates;
  if (i < 0 || j < 0 || i >= map.length || j >= map[i].length) {
    return { position: null, direction: guard.direction };
  }
  const value = map[i][j];
  if (value === ".") {
    return { position: nextCoordinates, direction: guard.direction };
  }
  return move(map, {
    direction: getNextDirection(guard.direction),
    position: guard.position,
  });
}

export async function getVisitedPositions(
  path: string,
): Promise<Array<[number, number]>> {
  const visited: Array<[number, number]> = [];
  const map = await parseInput(path);
  let guard = findGuard(map);
  while (guard.position !== null) {
    visited.push(guard.position);
    map[guard.position[0]][guard.position[1]] = ".";
    guard = move(map, guard);
    if (guard.position !== null) {
      map[guard.position[0]][guard.position[1]] = getSymbolFromDirection(
        guard.direction,
      );
    }
  }
  return (
    Array.from(
      new Set(visited.map((pair) => JSON.stringify(pair))),
    ).map((pairStr) => JSON.parse(pairStr))
  );
}

function getGuardId(guard: Guard): string {
  if (guard.position === null) {
    return "";
  }
  return `${guard.position[0]}-${guard.position[1]}-${
    getSymbolFromDirection(
      guard.direction,
    )
  }`;
}

function getIsLoopable(map: Grid, guard: Guard): boolean {
  const visited: string[] = [];
  while (guard.position !== null) {
    if (visited.includes(getGuardId(guard))) {
      return true;
    }
    visited.push(getGuardId(guard));
    map[guard.position[0]][guard.position[1]] = ".";
    guard = move(map, guard);
    if (guard.position !== null) {
      map[guard.position[0]][guard.position[1]] = getSymbolFromDirection(
        guard.direction,
      );
    }
  }
  return false;
}

export async function calculateLoopableRoutes(path: string) {
  const visited = await getVisitedPositions(path);
  const map = await parseInput(path);
  const guard = findGuard(map);
  return visited.filter((position) => {
    if (position.join("") === guard?.position?.join("")) {
      return false;
    }
    const newMap = structuredClone(map);
    newMap[position[0]][position[1]] = "#";
    return getIsLoopable(newMap, guard);
  }).length;
}

console.log((await getVisitedPositions("day-6/input.txt")).length);
console.log(await calculateLoopableRoutes("day-6/input.txt"));
