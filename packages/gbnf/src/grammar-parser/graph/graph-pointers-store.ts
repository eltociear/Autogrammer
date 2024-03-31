import { GraphPointer, } from "./graph-pointer.js";
import type { Graph, } from "./graph.js";

export class GraphPointersStore {
  #keys = new Set<string>();
  #pointers = new Set<GraphPointer>();
  #graph: Graph;

  constructor(graph: Graph) {
    this.#graph = graph;
  }

  add = (pointer: GraphPointer) => {
    const key = getPointerKey(pointer);
    if (!this.#keys.has(key)) {
      this.#keys.add(key);
      this.#pointers.add(pointer);
    }
  };

  delete = (pointer: GraphPointer) => {
    this.#pointers.delete(pointer);
    const key = getPointerKey(pointer);
    this.#keys.delete(key);
  };

  *[Symbol.iterator](): IterableIterator<GraphPointer> {
    for (const pointer of this.#pointers) {
      yield pointer;
    }
  };

  increment = () => {
    const remainingPointers = this.#pointers;
    this.#pointers = new Set<GraphPointer>();
    this.#keys = new Set<string>();
    for (const pointer of remainingPointers) {
      for (const { node, parent, } of pointer.nextNodes()) {
        this.#pointers.add(new GraphPointer(this.#graph, node, parent));
      }
    }
  };
}

const getPointerKey = ({
  node: {
    id,
    stackId,
    pathId,
    stepId,
  },
  parent,
}: GraphPointer): string => JSON.stringify({
  id,
  stackId, pathId, stepId,
  parent: parent ? getPointerKey(parent) : null,
});