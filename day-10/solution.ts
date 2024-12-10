type Point = [number, number];

const input = Deno.readTextFileSync("./day-10/input.txt");
const map = input.split("\n").map((line) =>
  line.split("").map((x) => Number(x))
);

function findTrailheads(map: Array<Array<number>>): Array<Point> {
  const trailheads: Array<Point> = [];
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
      if (map[i][j] === 0) {
        trailheads.push([i, j]);
      }
    }
  }
  return trailheads;
}

function getNearbyPoints(
  point: Point,
  map: Array<Array<number>>,
): Array<Point> {
  const points: Array<Point> = [];
  if (map[point[0] - 1]?.[point[1]] !== undefined) {
    points.push([point[0] - 1, point[1]]);
  }
  if (map[point[0]]?.[point[1] + 1] !== undefined) {
    points.push([point[0], point[1] + 1]);
  }
  if (map[point[0] + 1]?.[point[1]] !== undefined) {
    points.push([point[0] + 1, point[1]]);
  }
  if (map[point[0]]?.[point[1] - 1] !== undefined) {
    points.push([point[0], point[1] - 1]);
  }
  return points;
}

function getTrailheadScore(
  trailhead: Point,
  map: Array<Array<number>>,
): number {
  const visitedSommets = new Set<string>();
  hike(trailhead, map, visitedSommets);
  return visitedSommets.size;
}

function hike(
  position: Point,
  map: Array<Array<number>>,
  visitedSommets: Set<string>,
) {
  const currentValue = map[position[0]][position[1]];
  if (currentValue === 9) {
    visitedSommets.add(`${position[0]}-${position[1]}.`);
    return;
  }
  const validNearbyPoints = getNearbyPoints(position, map).filter(([x, y]) =>
    map[x][y] - currentValue === 1
  );

  if (validNearbyPoints.length === 0) {
    return;
  }
  validNearbyPoints.forEach((point) => {
    hike(point, map, visitedSommets);
  });
}

function hikeB(
  position: Point,
  map: Array<Array<number>>,
  trail: string,
  trails: Set<string>,
) {
  trail += `=>${position[0]}-${position[1]}`;
  const currentValue = map[position[0]][position[1]];
  if (currentValue === 9) {
    trails.add(trail);
    return;
  }
  const validNearbyPoints = getNearbyPoints(position, map).filter(([x, y]) =>
    map[x][y] - currentValue === 1
  );

  if (validNearbyPoints.length === 0) {
    return;
  }
  validNearbyPoints.forEach((point) => {
    hikeB(point, map, trail, trails);
  });
}

function getTrailheadRating(
  trailhead: Point,
  map: Array<Array<number>>,
): number {
  const trails = new Set<string>();
  hikeB(trailhead, map, "", trails);
  return trails.size;
}

function partA(): number {
  const trailheads = findTrailheads(map);
  let score = 0;
  trailheads.forEach((head) => {
    score += getTrailheadScore(head, map);
  });
  return score;
}

function partB(): number {
  const trailheads = findTrailheads(map);
  let score = 0;
  trailheads.forEach((head) => {
    score += getTrailheadRating(head, map);
  });
  return score;
}

console.log(partB());
