const PART_B = 10000000000000;
function parseInput(path: string) {
  const input = Deno.readTextFileSync(path);
  const data = input.split("\n\n").map((machine) =>
    machine.split("\n").reduce((p, c, i) => {
      const match = c.match(/\s*X[+=]?(\d+),\s*Y[+=]?(\d+)/);
      if (match) {
        const x = parseInt(match[1], 10);
        const y = parseInt(match[2], 10);
        if (i === 0) {
          p.a = [x, y];
        } else if (i === 1) {
          p.b = [x, y];
        } else if (i === 2) {
          p.prize = [x + PART_B, y + PART_B];
        }
      }
      return p;
    }, { a: [0, 0], b: [0, 0], prize: [0, 0] })
  );
  return data;
}

const data = parseInput("./day-13/input.txt");

function getSolution(
  m: [[number, number], [number, number]],
  a: [number, number],
): [number, number] {
  const det = m[0][0] * m[1][1] - m[1][0] * m[0][1];
  const detX = a[0] * m[1][1] - a[1] * m[0][1];
  const detY = m[0][0] * a[1] - m[1][0] * a[0];

  const x = detX / det;
  const y = detY / det;

  return [x, y];
}

let totalCost = 0;
data.forEach((machine) => {
  const solution = getSolution([[machine.a[0], machine.b[0]], [
    machine.a[1],
    machine.b[1],
  ]], [machine.prize[0], machine.prize[1]]);
  if (Number.isInteger(solution[0]) && Number.isInteger(solution[1])) {
    totalCost += solution[0] * 3 + solution[1];
  }
});

console.log(totalCost);
