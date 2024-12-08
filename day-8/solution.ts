type Point = [number, number];
export type Antenna = { frequency: string; coordinates: Point };

export function parseInput(input: string): Array<Array<string>> {
  return input.split("\n").map((line) => line.split(""));
}

export function getAntinodes(
  { coordinates: a, frequency: af }: Antenna,
  { coordinates: b, frequency: bf }: Antenna,
): [Point, Point] | null {
  if (af !== bf) {
    return null;
  }

  const fv = [a[0] - b[0], a[1] - b[1]];
  const sv = [-fv[0], -fv[1]];
  return [[b[0] + sv[0], b[1] + sv[1]], [a[0] + fv[0], a[1] + fv[1]]];
}

export function getAntennasPairs(
  data: Array<Array<string>>,
): Array<[Antenna, Antenna]> {
  const antennas = new Map<string, Array<Antenna>>();
  for (let x = 0; x < data.length; x++) {
    for (let y = 0; y < data[x].length; y++) {
      if (data[x][y] !== ".") {
        if (!antennas.has(data[x][y])) {
          antennas.set(data[x][y], [{
            frequency: data[x][y],
            coordinates: [x, y],
          }]);
        } else {
          antennas.get(data[x][y])!.push({
            frequency: data[x][y],
            coordinates: [x, y],
          });
        }
      }
    }
  }
  const pairs: Array<[Antenna, Antenna]> = [];
  antennas.forEach((antennas) => {
    for (let i = 0; i < antennas.length; i++) {
      for (let j = 0; j < antennas.length && j !== i; j++) {
        pairs.push([antennas[i], antennas[j]]);
      }
    }
  });
  return pairs;
}

const data = parseInput(Deno.readTextFileSync("./day-8/input.txt"));
function isWithinBound(point: Point): boolean {
  return point[0] >= 0 && point[1] >= 0 && point[0] < data.length &&
    point[1] < data[point[0]].length;
}

const pairs = getAntennasPairs(data);
pairs.forEach((pair) => {
  const antinodes = getAntinodes(...pair);
  if (
    antinodes === null
  ) {
    return;
  }
  if (isWithinBound(antinodes[0])) {
    data[antinodes[0][0]][antinodes[0][1]] = "#";
  }
  if (isWithinBound(antinodes[1])) {
    data[antinodes[1][0]][antinodes[1][1]] = "#";
  }
});
let count = 0;
for (let i = 0; i < data.length; i++) {
  for (let j = 0; j < data[i].length; j++) {
    if (data[i][j] === "#") {
      count++;
    }
  }
}
console.log(data.map((x) => x.join("")).join("\n"));
console.log(count);
