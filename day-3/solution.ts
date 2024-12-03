export function parseInput(
  input: string,
): Array<[number, number]> {
  const regex = /mul\((-?\d+),(-?\d+)\)/g;
  return [...input.matchAll(regex)].map(
    (match) => [Number(match[1]), Number(match[2])],
  );
}

export function removeTextBetweenDontAndDo(input: string): string {
  const regex = /don't\(\)(.*?)do\(\)|don't\(\)(.*)$/gs;
  return input.replace(regex, "");
}

export function calculateSum(input: Array<[number, number]>): number {
  return input.reduce((p, c) => p + (c[0] * c[1]), 0);
}
