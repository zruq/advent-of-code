const HORIZONTAL_TILES = 101;
const VERTICAL_TILES = 103;

function parseInput(path: string) {
  const input = Deno.readTextFileSync(path);
  const data = input.split("\n").map((line) => {
    const match = line.match(/p=([-]?\d+),([-]?\d+)\sv=([-]?\d+),([-]?\d+)/)!;
    const p0 = Number(match[1]);
    const p1 = Number(match[2]);
    const v0 = Number(match[3]);
    const v1 = Number(match[4]);
    return { p: [p0, p1], v: [v0, v1] };
  });

  return data;
}

function positionAfterT(
  t: number,
  robot: ReturnType<typeof parseInput>[number],
): [number, number] {
  const position: [number, number] = [
    (robot.p[0] + t * robot.v[0]) % HORIZONTAL_TILES,
    (robot.p[1] + t * robot.v[1]) % VERTICAL_TILES,
  ];
  if (position[0] < 0) {
    position[0] += HORIZONTAL_TILES;
  }
  if (position[1] < 0) {
    position[1] += VERTICAL_TILES;
  }

  return position;
}

const robots = parseInput("./day-14/input.txt");

function partA() {
  const grid = Array.from(
    { length: VERTICAL_TILES },
    () => Array(HORIZONTAL_TILES).fill(0),
  );
  robots.forEach((robot) => {
    const [x, y] = positionAfterT(100, robot);
    grid[y][x]++;
  });
  const quadrants = [0, 0, 0, 0];
  grid.forEach((line, j) => {
    line.forEach((cell, i) => {
      if (
        i < Math.floor(HORIZONTAL_TILES / 2) &&
        j < Math.floor(VERTICAL_TILES / 2)
      ) {
        quadrants[0] += cell;
      }
      if (
        i < Math.floor(HORIZONTAL_TILES / 2) &&
        j > Math.floor(VERTICAL_TILES / 2)
      ) {
        quadrants[1] += cell;
      }
      if (
        i > Math.floor(HORIZONTAL_TILES / 2) &&
        j < Math.floor(VERTICAL_TILES / 2)
      ) {
        quadrants[2] += cell;
      }
      if (
        i > Math.floor(HORIZONTAL_TILES / 2) &&
        j > Math.floor(VERTICAL_TILES / 2)
      ) {
        quadrants[3] += cell;
      }
    });
  });
  return quadrants.reduce((p, c) => p * c, 1);
}

partA();
