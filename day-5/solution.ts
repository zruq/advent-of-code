type OrderingRules = Array<[number, number]>;
type Update = Array<number>;

export async function parseInput(
  path: string,
): Promise<{ orderingRules: OrderingRules; updates: Array<Update> }> {
  const input = await Deno.readTextFile(path);
  const [orderingRulesString, pageUpdatesString] = input.split("\n\n");
  return {
    orderingRules: orderingRulesString
      .split("\n")
      .map((line) => line.split("|").map((x) => Number(x)) as [number, number]),
    updates: pageUpdatesString
      .split("\n")
      .map((line) => line.split(",").map((n) => Number(n))),
  };
}

const data = await parseInput("./day-5/input.txt");

export function rightOrderUpdates({
  orderingRules,
  updates,
}: {
  orderingRules: OrderingRules;
  updates: Array<Update>;
}): Array<Update> {
  return updates.filter((update) =>
    update.every((n, i) => {
      const numbersBeforeN = orderingRules
        .filter((x) => x[1] === n)
        .map((x) => x[0]);
      const numbersAfterN = orderingRules
        .filter((x) => x[0] === n)
        .map((x) => x[1]);
      return (
        update.slice(0, i).every((x) => !numbersAfterN.includes(x)) &&
        update.slice(i + 1).every((x) => !numbersBeforeN.includes(x))
      );
    }),
  );
}

export function orderUpdate(update: Update, rules: OrderingRules): Update {
  const ordered: Update = [...update];
  for (let i = 0; i < update.length; i++) {
    for (let j = i + 1; j < update.length; j++) {
      if (
        rules.some((rule) => rule[0] === ordered[j] && rule[1] === ordered[i])
      ) {
        [ordered[i], ordered[j]] = [ordered[j], ordered[i]];
      }
    }
  }

  return ordered;
}
