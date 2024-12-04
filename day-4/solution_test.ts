import { assertEquals } from "@std/assert";
import { countXMAS, countXMASX, parseInput } from "./solution.ts";

Deno.test(async function parseInputTest() {
  const result = await parseInput("./day-4/test-input.txt");
  assertEquals(result, [
    [
      "M",
      "M",
      "M",
      "S",
      "X",
      "X",
      "M",
      "A",
      "S",
      "M",
    ],
    [
      "M",
      "S",
      "A",
      "M",
      "X",
      "M",
      "S",
      "M",
      "S",
      "A",
    ],
    [
      "A",
      "M",
      "X",
      "S",
      "X",
      "M",
      "A",
      "A",
      "M",
      "M",
    ],
    [
      "M",
      "S",
      "A",
      "M",
      "A",
      "S",
      "M",
      "S",
      "M",
      "X",
    ],
    [
      "X",
      "M",
      "A",
      "S",
      "A",
      "M",
      "X",
      "A",
      "M",
      "M",
    ],
    [
      "X",
      "X",
      "A",
      "M",
      "M",
      "X",
      "X",
      "A",
      "M",
      "A",
    ],
    [
      "S",
      "M",
      "S",
      "M",
      "S",
      "A",
      "S",
      "X",
      "S",
      "S",
    ],
    [
      "S",
      "A",
      "X",
      "A",
      "M",
      "A",
      "S",
      "A",
      "A",
      "A",
    ],
    [
      "M",
      "A",
      "M",
      "M",
      "M",
      "X",
      "M",
      "M",
      "M",
      "M",
    ],
    [
      "M",
      "X",
      "M",
      "X",
      "A",
      "X",
      "M",
      "A",
      "S",
      "X",
    ],
  ]);
});

Deno.test(async function countXMASTest() {
  const input = await parseInput("./day-4/test-input.txt");
  const result = countXMAS(input);
  assertEquals(result, 18);
});

Deno.test(async function countXMASTest() {
  const input = await parseInput("./day-4/test-input.txt");
  const result = countXMASX(input);
  assertEquals(result, 9);
});
