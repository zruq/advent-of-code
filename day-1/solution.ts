export async function parseInput(
  path: string,
): Promise<[Array<number>, Array<number>]> {
  const input = await Deno.readTextFile(path);
  return input.split("\n").reduce<[Array<number>, Array<number>]>((p, c) => {
    const [first, second] = c.split("   ");
    p[0].push(Number(first));
    p[1].push(Number(second));
    return p;
  }, [[], []]);
}

export function calculateTotalDistance(
  left: Array<number>,
  right: Array<number>,
): number {
  left.sort();
  right.sort();
  let totalDistance = 0;
  for (let i = 0; i < left.length; i++) {
    totalDistance += Math.abs(left[i] - right[i]);
  }
  return totalDistance;
}

export function calculateSimilarityScore(
  left: Array<number>,
  right: Array<number>,
): number {
  let similarityScore = 0;
  left.forEach((n) => {
    similarityScore += n * (right.filter((x) => x === n).length);
  });
  return similarityScore;
}
