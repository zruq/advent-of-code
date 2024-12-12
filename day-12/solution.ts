type Plot = [number, number];
type Region = Array<Plot>;

function arePlotsEqual(a: Plot, b: Plot): boolean {
  return a[0] === b[0] && a[1] === b[1];
}

function findRegion(
  plot: Plot,
  garden: Array<Array<string>>,
  region: Region = [],
): Region {
  region.push(plot);
  const plant = garden[plot[0]][plot[1]];
  let neighbouringPlots = findNeighbouringPlots(plot).filter((p) =>
    region.every((x) => !arePlotsEqual(p, x))
  );
  while (neighbouringPlots.length) {
    const plot = neighbouringPlots.pop()!;
    if (garden[plot[0]]?.[plot[1]] === plant) {
      findRegion(plot, garden, region);
    }
    neighbouringPlots = neighbouringPlots.filter((p) =>
      region.every((x) => !arePlotsEqual(p, x))
    );
  }

  return region;
}

function findRegions(garden: Array<Array<string>>): Array<Region> {
  const regions: Array<Region> = [];
  let plots: Array<Plot> = [];
  for (let i = 0; i < garden.length; i++) {
    for (let j = 0; j < garden[i].length; j++) {
      plots.push([i, j]);
    }
  }
  while (plots.length) {
    const plot = plots[0];
    const region = findRegion(plot, garden, []);
    regions.push(region);
    plots = plots.filter((plot) =>
      region.every((p) => !arePlotsEqual(plot, p))
    );
  }
  return regions;
}

function calculateArea(region: Region): number {
  return region.length;
}

function findNeighbouringPlots(plot: Plot): Array<Plot> {
  const [x, y] = plot;
  return [[x - 1, y], [x, y + 1], [x + 1, y], [x, y - 1]];
}

export function calculatePerimeter(region: Region): number {
  let perimeter = 0;
  region.forEach((plot) => {
    perimeter += findNeighbouringPlots(plot).filter((plot) =>
      region.every((p) =>
        !arePlotsEqual(p, plot)
      )
    ).length;
  });
  return perimeter;
}

export function calculateNumberOfSides(region: Region): number {
  return 0;
}

const data = Deno.readTextFileSync("./day-12/test-input.txt").split("\n").map(
  (line) => line.split(""),
);
let totalPrice = 0;

const regions = findRegions(data);
regions.forEach((region) => {
  const plant = data[region[0][0]][region[0][1]];
  const area = calculateArea(region);
  const perimeter = calculatePerimeter(region);
  const price = area * perimeter;
  totalPrice += price;
  console.log(
    `A region of ${plant} plants with price ${area} * ${perimeter} = ${price}.`,
  );
});

console.log(totalPrice);

totalPrice = 0;

regions.forEach((region) => {
  const plant = data[region[0][0]][region[0][1]];
  const area = calculateArea(region);
  const perimeter = calculateNumberOfSides(region);
  const price = area * perimeter;
  totalPrice += price;
  console.log(
    `A region of ${plant} plants with price ${area} * ${perimeter} = ${price}.`,
  );
});

console.log(totalPrice);
