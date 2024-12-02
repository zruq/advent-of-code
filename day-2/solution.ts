export async function parseInput(
  path: string,
): Promise<Array<Array<number>>> {
  const input = await Deno.readTextFile(path);
  return input.split("\n").map((line) => line.split(" ").map((n) => Number(n)));
}

export function areAdjacentLevelsValid(
  first: number,
  second: number,
  dominantSign: 1 | -1,
) {
  return (second - first) * dominantSign > 0 && Math.abs(second - first) <= 3;
}

export function isSafe(input: Array<number>): boolean {
  if (input.length <= 2) {
    return true;
  }
  const sign = input[1]! - input[0]! > 0 ? 1 : -1;
  for (let i = 0; i < input.length - 1; i++) {
    if (!areAdjacentLevelsValid(input[i]!, input[i + 1]!, sign)) {
      return false;
    }
  }
  return true;
}

export function safeRowsCount(
  input: Array<Array<number>>,
  isSafeMethod: (input: Array<number>) => boolean,
): number {
  return input.filter((row) => isSafeMethod(row)).length;
}

export function dominantSign(input: Array<number>): 1 | -1 | "Invalid Input" {
  const counts = { "1": 0, "-1": 0, constant: 0 };
  for (let i = 0; i < input.length - 1; i++) {
    if (input[i + 1]! - input[i]! > 0) {
      counts["1"]++;
    } else if (input[i + 1]! - input[i]! < 0) {
      counts["-1"]++;
    } else {
      counts.constant++;
    }
  }
  if (counts.constant > 1 || (counts[1] > 1 && counts[-1] > 1)) {
    return "Invalid Input";
  }
  if (counts["1"] > counts["-1"]) {
    return 1;
  } else {
    return -1;
  }
}

export function isSafeV2(input: Array<number>): boolean {
  const sign = dominantSign(input);
  if (sign === "Invalid Input") {
    return false;
  }
  for (let i = 0; i < input.length - 1; i++) {
    if (!areAdjacentLevelsValid(input[i]!, input[i + 1]!, sign)) {
      return (
        isSafe(input.filter((_, index) => index !== i)) ||
        isSafe(input.filter((_, index) => index !== i + 1))
      );
    }
  }
  return true;
}
