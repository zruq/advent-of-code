import { assertEquals } from "@std/assert";
import { isEquationTrue, parseInput } from "../day-7/solution.ts";

Deno.test(async function partA() {
  const input = await Deno.readTextFile("./day-7/input.txt");
  const data = parseInput(input);
  const sum = data.filter((equation) => isEquationTrue(equation)).reduce(
    (p, c) => {
      return p + c.expected;
    },
    0,
  );
  assertEquals(sum, 3749);
});
