import { assertEquals } from "@std/assert";
import {
  calculateSimilarityScore,
  calculateTotalDistance,
  parseInput,
} from "./solution.ts";

Deno.test(async function parseInputTest() {
  const result = await parseInput("./day-1/test-input.txt");
  assertEquals(result, [[3, 4, 2, 1, 3, 3], [
    4,
    3,
    5,
    3,
    9,
    3,
  ]]);
});

Deno.test(function calculateTotalDistanceTest() {
  assertEquals(
    calculateTotalDistance([3, 4, 2, 1, 3, 3], [
      4,
      3,
      5,
      3,
      9,
      3,
    ]),
    11,
  );
});

Deno.test(function calculateSimilarityScoreTest() {
  assertEquals(
    calculateSimilarityScore([3, 4, 2, 1, 3, 3], [
      4,
      3,
      5,
      3,
      9,
      3,
    ]),
    31,
  );
});
