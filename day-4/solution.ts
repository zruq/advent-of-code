export async function parseInput(
  path: string,
): Promise<Array<Array<string>>> {
  const input = await Deno.readTextFile(path);
  return input.split("\n").map((line) => line.split(""));
}

export function countXMAS(input: Array<Array<string>>): number {
  let count = 0;
  for (let line = 0; line < input.length; line++) {
    for (let column = 0; column < input[line].length; column++) {
      const words = [
        input[line]?.[column] + input[line]?.[column + 1] +
        input[line]?.[column + 2] + input[line]?.[column + 3],
        input[line]?.[column] + input[line + 1]?.[column] +
        input[line + 2]?.[column] + input[line + 3]?.[column],
        input[line]?.[column] + input[line + 1]?.[column + 1] +
        input[line + 2]?.[column + 2] + input[line + 3]?.[column + 3],
        input[line]?.[column] + input[line - 1]?.[column + 1] +
        input[line - 2]?.[column + 2] + input[line - 3]?.[column + 3],
      ];
      count += words.filter((word) =>
        word === "XMAS" || word === "SAMX"
      ).length;
    }
  }

  return count;
}

export function countXMASX(input: Array<Array<string>>): number {
  let count = 0;
  for (let line = 0; line < input.length; line++) {
    for (let column = 0; column < input[line].length; column++) {
      const first = input[line + 1]?.[column - 1] + input[line]?.[column] +
        input[line - 1]?.[column + 1];
      const second = input[line - 1]?.[column - 1] + input[line]?.[column] +
        input[line + 1]?.[column + 1];
      const lookFor = ["MAS", "SAM"];
      if (lookFor.includes(first) && lookFor.includes(second)) {
        count++;
      }
    }
  }

  return count;
}
