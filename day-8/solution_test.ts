import { assertEquals } from "@std/assert";
import {
  getAntennasPairs,
  getAntinodes,
  parseInput,
} from "../day-8/solution.ts";

Deno.test(function getAntinodesTest() {
  const input = Deno.readTextFileSync("./day-8/example.txt");
  const data = parseInput(input);
  const pairs = getAntennasPairs(data);
  const antinodes = getAntinodes(...pairs[0]);

  assertEquals(antinodes, [[1, 3], [7, 6]]);
});
