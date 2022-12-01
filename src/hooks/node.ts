import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DataNode } from '../models/dataNode';
import { nodesState } from '../store/atoms';
import { nodeSelector, sourceDataFrameSelector } from '../store/selectors';

export const useNode = (nodeId?: string) => {
  return useRecoilValue(nodeSelector(nodeId ?? ''));
};

export const useSourceDataFrame = (nodeId?: string, targetHandle?: string) => {
  return useRecoilValue(sourceDataFrameSelector({ nodeId, targetHandle }));
};

export const useUpdateNodeData = <TDataNode extends DataNode>(nodeId?: string) => {
  const setNodes = useSetRecoilState(nodesState);

  const updateNodeData = <TKey extends keyof TDataNode['data']>(
    key: TKey,
    value: TDataNode['data'][TKey],
  ) =>
    setNodes((nodes) => {
      const node = nodes.find((node) => node.id === nodeId);

      if (!node) {
        return nodes;
      }

      const restOfNodes = nodes.filter((node) => node.id !== nodeId);
      const updatedNodeData = { ...node?.data, [key]: value };

      return [...restOfNodes, { ...node, data: updatedNodeData }];
    });

  return updateNodeData;
};
