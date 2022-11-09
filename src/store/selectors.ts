import { selectorFamily } from 'recoil';
import { edgesState, nodesState } from './atoms';

export const nodeSelector = selectorFamily({
  key: 'node',
  get:
    (nodeId: string) =>
    ({ get }) => {
      const nodes = get(nodesState);
      return nodes.find((node) => node.id === nodeId);
    },
});

export const sourceDataFrameSelector = selectorFamily({
  key: 'sourceDataFrame',
  get:
    (params: { nodeId?: string; targetHandle?: string }) =>
    ({ get }) => {
      const nodes = get(nodesState);
      const edges = get(edgesState);

      const edge = edges.find(
        (edge) =>
          edge.target === params.nodeId &&
          (params.targetHandle === undefined || edge.targetHandle === params.targetHandle),
      );
      const sourceNodeId = edge?.source;
      const sourceNode = nodes.find((node) => node.id === sourceNodeId);

      return sourceNode?.data.dataFrame;
    },
});

