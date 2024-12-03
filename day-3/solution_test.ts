import { assertEquals } from "@std/assert";
import {
  calculateSum,
  parseInput,
  removeTextBetweenDontAndDo,
} from "./solution.ts";

Deno.test(async function parseInputTest() {
  const input = await Deno.readTextFile("./day-3/test-input.txt");
  const result = parseInput(input);
  assertEquals(result, [
    [2, 4],
    [5, 5],
    [11, 8],
    [8, 5],
  ]);
});

Deno.test(function removeTextBetweenDontAndDoTest() {
  const result = removeTextBetweenDontAndDo(
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))",
  );
  assertEquals(result, "xmul(2,4)&mul[3,7]!^?mul(8,5))");
  const result1 = removeTextBetweenDontAndDo(
    "xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))don't()mul(1,1)mul(2,2)mul(3,3)",
  );
  assertEquals(result1, "xmul(2,4)&mul[3,7]!^?mul(8,5))");
});

Deno.test(function calculateSumTest() {
  assertEquals(
    calculateSum([
      [2, 4],
      [5, 5],
      [11, 8],
      [8, 5],
    ]),
    161,
  );
});
