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
          p.prize = [x, y];
        }
      }
      return p;
    }, { a: [0, 0], b: [0, 0], prize: [0, 0] })
  );
  return data;
}

const data = parseInput("./day-13/input.txt");

let totalCost = 0;
data.forEach((machine) => {
  const cost: Array<number> = [];
  for (let i = 1; i <= 100; i++) {
    for (let j = 1; j <= 100; j++) {
      if (
        i * machine.a[0] + j * machine.b[0] === machine.prize[0] &&
        i * machine.a[1] + j * machine.b[1] === machine.prize[1]
      ) {
        cost.push(i * 3 + j);
      }
    }
  }
  cost.sort();
  totalCost += cost?.[0] ?? 0;
});

console.log(totalCost);
