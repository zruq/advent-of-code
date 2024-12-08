type Point = [number, number];
export type Antenna = { frequency: string; coordinates: Point };

export function parseInput(input: string): Array<Array<string>> {
  return input.split("\n").map((line) => line.split(""));
}

const data = parseInput(Deno.readTextFileSync("./day-8/input.txt"));

export function getAntinodes(
  { coordinates: a, frequency: af }: Antenna,
  { coordinates: b, frequency: bf }: Antenna,
): Array<Point> {
  if (af !== bf) {
    return [];
  }

  const fv = [a[0] - b[0], a[1] - b[1]];
  const sv = [-fv[0], -fv[1]];

  const as = [a];
  const bs = [b];
  while (
    (bs[bs.length - 1][1] + sv[1]) >= 0 &&
    (bs[bs.length - 1][0] + sv[0]) >= 0 &&
    (bs[bs.length - 1][0] + sv[0]) < data.length &&
    (bs[bs.length - 1][1] + sv[1]) < data.length
  ) {
    bs.push([bs[bs.length - 1][0] + sv[0], bs[bs.length - 1][1] + sv[1]]);
  }
  while (
    (as[as.length - 1][1] + fv[1]) >= 0 &&
    (as[as.length - 1][0] + fv[0]) >= 0 &&
    (as[as.length - 1][0] + fv[0]) < data.length &&
    (as[as.length - 1][1] + fv[1]) < data.length
  ) {
    as.push([as[as.length - 1][0] + fv[0], as[as.length - 1][1] + fv[1]]);
  }

  return [...as, ...bs];
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

const pairs = getAntennasPairs(data);
pairs.forEach((pair) => {
  const antinodes = getAntinodes(...pair);
  antinodes.forEach((antinode) => {
    data[antinode[0]][antinode[1]] = "#";
  });
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
