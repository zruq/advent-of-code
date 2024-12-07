type Data = { expected: number; values: Array<number> };
type Operation = (a: number, b: number) => number;

export function parseInput(input: string): Array<Data> {
  return input.split("\n").reduce<Array<Data>>((p, c) => {
    const [expected, valuesString] = c.split(":");
    p.push({
      expected: Number(expected),
      values: valuesString.trim().split(" ").map((x) => Number(x)),
    });
    return p;
  }, []);
}

function add(a: number, b: number): number {
  return a + b;
}

function multiply(a: number, b: number): number {
  return a * b;
}

const ALLOWED_OPREATIONS: Array<Operation> = [add, multiply];

const COMBINATIONS_DICT: Record<number, Array<Array<Operation>>> = {};

function getCombinations(n: number) {
  if (COMBINATIONS_DICT[n]) {
    return COMBINATIONS_DICT[n];
  }
  const combinations: Array<Array<Operation>> = [];
  for (let i = 0; i < 2 ** n; i++) {
    const combination: Array<Operation> = i.toString(2).padStart(n, "0").split(
      "",
    ).map((a) => ALLOWED_OPREATIONS[Number(a)]);
    combinations.push(combination);
  }
  COMBINATIONS_DICT[n] = combinations;
  return combinations;
}

export function isEquationTrue(data: Data): boolean {
  const combinations = getCombinations(data.values.length - 1);
  return combinations.some((combination) => {
    const values = [...data.values];
    const operations = [...combination];
    while (values.length > 1 && operations.length) {
      const operation = operations.shift()!;
      const a = values.shift()!;
      const b = values.shift()!;
      values.unshift(operation(a, b));
    }
    return values[0] === data.expected;
  });
}
