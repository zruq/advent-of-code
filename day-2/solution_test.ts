import { assertEquals } from "@std/assert";
import { isSafe, parseInput, dominantSign, isSafeV2 } from "./solution.ts";

Deno.test(async function parseInputTest() {
  const result = await parseInput("./day-2/test-input.txt");
  assertEquals(result, [
    [7, 6, 4, 2, 1],
    [1, 2, 7, 8, 9],
    [9, 7, 6, 2, 1],
    [1, 3, 2, 4, 5],
    [8, 6, 4, 4, 1],
    [1, 3, 6, 7, 9],
  ]);
});

Deno.test(function isSafeTest() {
  assertEquals(
    isSafe([7, 6, 4, 2, 1]),
    true,
  );
  assertEquals(
    isSafe(
      [1, 2, 7, 8, 9],
    ),
    false,
  );
  assertEquals(
    isSafe(
      [9, 7, 6, 2, 1],
    ),
    false,
  );
  assertEquals(
    isSafe(
      [1, 3, 2, 4, 5],
    ),
    false,
  );
  assertEquals(
    isSafe(
      [8, 6, 4, 4, 1],
    ),
    false,
  );
  assertEquals(
    isSafe(
      [1, 3, 6, 7, 9],
    ),
    true,
  );
});

Deno.test(function dominantSignTest() {
  assertEquals(
    dominantSign([7, 6, 4, 2, 1]),
    -1,
  );
  assertEquals(
    dominantSign(
      [1, 2, 7, 8, 9],
    ),
    1,
  );
  assertEquals(
    dominantSign (
      [9, 7, 6, 2, 1],
    ),
    -1,
  );
  assertEquals(
    dominantSign(
      [1, 3, 2, 4, 5],
    ),
    1,
  );
  assertEquals(
    dominantSign(
      [8, 6, 4, 4, 1],
    ),
    -1,
  );
  assertEquals(
    dominantSign(
      [1, 3, 6, 7, 9],
    ),
    1,
  );
  assertEquals(
    dominantSign(
      [1, 3, 3, 3, 9],
    ),
    "Invalid Input",
  );
  assertEquals(
    dominantSign(
      [1, 3, 2, 3, 1],
    ),
    "Invalid Input",
  );
});

Deno.test(function isSafeV2Test() {
  assertEquals(
    isSafeV2([7, 6, 4, 2, 1]),
    true,
  );
  assertEquals(
    isSafeV2(
      [1, 2, 7, 8, 9],
    ),
    false,
  );
  assertEquals(
    isSafeV2(
      [9, 7, 6, 2, 1],
    ),
    false,
  );
  assertEquals(
    isSafeV2(
      [1, 3, 2, 4, 5],
    ),
    true,
  );
  assertEquals(
    isSafeV2(
      [8, 6, 4, 4, 1],
    ),
    true,
  );
  assertEquals(
    isSafeV2(
      [1, 3, 6, 7, 9],
    ),
    true,
  );
})
