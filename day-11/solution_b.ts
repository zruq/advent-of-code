function transform(x: number): Array<number> {
  if (x === 0) {
    return [1];
  }
  const numberDigits = x.toString();
  const numberOfDigits = numberDigits.length;
  if (numberOfDigits % 2 === 0) {
    return [
      Number(numberDigits.slice(numberOfDigits / 2)),
      Number(numberDigits.slice(0, numberOfDigits / 2)),
    ];
  }
  return [x * 2024];
}

const NUMBER_OF_BLINKS = 75;

const input = Deno.readTextFileSync("./day-11/input.txt");
const data: Array<[number, number]> = [];
input.split(" ").forEach((x) => {
  data.push([Number(x), 1]);
});

for (let i = 0; i < NUMBER_OF_BLINKS; i++) {
  const existing: Array<[number, number]> = [];
  const length = data.length;
  for (let i = 0; i < length; i++) {
    if (data[i][1] <= 0) {
      continue;
    }
    const result = transform(data[i][0]);
    const old = data[i][1];
    data[i][1] = 0;

    result.forEach((value) => {
      if (data.some((x) => x[0] === value)) {
        existing.push([value, old]);
      } else {
        data.push([value, old]);
      }
    });
  }
  existing.forEach(([value, count]) => {
    data.find((x) => x[0] === value)![1] += count;
  });
}

let count = 0;
for (const [_, x] of data) {
  count += x;
}

console.log(count);
