const input = Deno.readTextFileSync("./day-9/input.txt");
const data = input.split("").map((x) => Number(x));
type G = Array<number | ".">;

function graph(data: Array<number>) {
  const result: G = [];
  let id = -1;
  data.forEach((x, i) => {
    if (i % 2 === 0) {
      id++;
      for (let y = 0; y < x; y++) {
        result.push(id);
      }
    } else {
      for (let y = 0; y < x; y++) {
        result.push(".");
      }
    }
  });
  return result;
}

function moveBlocks(graph: G): G {
  const blocksNumber = graph.filter((x) => x !== ".").length;
  while (graph.slice(blocksNumber).some((x) => x !== ".")) {
    const i = graph.findLastIndex((x) => x !== ".");
    const j = graph.indexOf(".");
    [graph[i], graph[j]] = [graph[j], graph[i]];
  }
  return graph;
}

function moveWholeBlocks(graph: G): G {
  let id = graph[graph.findLastIndex((x) => x !== ".")] as number;
  while (id >= 0) {
    const blockEndIndex = graph.lastIndexOf(id);
    const blockStartIndex = graph.indexOf(id);
    const occupiedSpace = blockEndIndex - blockStartIndex + 1;

    const neededSpace = Array.from({
      length: blockEndIndex - blockStartIndex + 1,
    }, () => ".").join("");
    const freeSpaceIndex = graph.findIndex((_, i) =>
      graph.slice(i, i + occupiedSpace).join("") === neededSpace
    );
    if (freeSpaceIndex === -1 || freeSpaceIndex >= blockStartIndex) {
      id--;
      continue;
    }

    for (let i = 0; i < occupiedSpace; i++) {
      [graph[freeSpaceIndex + i], graph[blockStartIndex + i]] = [
        graph[blockStartIndex + i],
        graph[freeSpaceIndex + i],
      ];
    }
    id--;
  }

  return graph;
}

function checksum(graph: G): number {
  return graph.map((x, i) => [x, i] as const).filter((x) => x[0] !== ".")
    .reduce((p, c) => p + (Number(c[0]) * c[1]), 0);
}

const mb = moveBlocks(graph(data));
const mwb = moveWholeBlocks(graph(data));
console.log(checksum(mb));
console.log(checksum(mwb));
