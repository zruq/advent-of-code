function transform(x: number): number | [number, number] {
  if (x === 0) {
    return 1;
  }
  const numberDigits = x.toString();
  const numberOfDigits = numberDigits.length;
  if (numberOfDigits % 2 === 0) {
    return [
      Number(numberDigits.slice(numberOfDigits / 2)),
      Number(numberDigits.slice(0, numberOfDigits / 2)),
    ];
  }
  return x * 2024;
}

const NUMBER_OF_BLINKS = 25;

const input = Deno.readTextFileSync("./day-11/input.txt");
const data = input.split(" ").map((x) => Number(x));

let numbers = data;
for (let i = 0; i < NUMBER_OF_BLINKS; i++) {
  const newNumbers: number[] = [];
  numbers.forEach((x) => {
    const result = transform(x);
    if (Array.isArray(result)) {
      newNumbers.push(...result);
      return;
    }
    newNumbers.push(result);
  });
  numbers = newNumbers;
}

console.log(numbers.length);
