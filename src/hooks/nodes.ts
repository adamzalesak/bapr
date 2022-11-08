import { useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { DataNode } from '../models/dataNode';
import { ModalType } from '../models/modal';
import { edgesState, nodesState, openModalState } from '../store/atoms';

export const useNode = (nodeId: string) => {
  const nodes = useRecoilValue(nodesState);

  return nodes.find((node) => node.id === nodeId);
};

export const useOpenModalNode = () => {
  const nodes = useRecoilValue(nodesState);
  const openModal = useRecoilValue(openModalState);

  return nodes.find((node) => node.id === openModal?.nodeId);
};

export const useOpenDataModalNode = () => {
  const nodes = useRecoilValue(nodesState);
  const openModal = useRecoilValue(openModalState);

  return nodes.find(
    (node) => openModal?.modalType === ModalType.Data && node.id === openModal.nodeId,
  );
};

export const useSourceDataFrame = (nodeId: string) => {
  const edges = useRecoilValue(edgesState);
  const nodes = useRecoilValue(nodesState);

  return useMemo(() => {
    const edge = edges.find((edge) => edge.target === nodeId);
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data?.dataFrame;
  }, [edges, nodes, nodeId]);
};

export const useUpdateNodeData = <TDataNode extends DataNode>(nodeId: string) => {
  const setNodes = useSetRecoilState(nodesState);

  const updateNodeData = <TKey extends keyof TDataNode['data']>(
    key: TKey,
    value: TDataNode['data'][TKey],
  ) =>
    setNodes((nodes) => {
      const node = nodes.find((node) => node.id === nodeId);

      if (!node) return nodes;

      const restOfNodes = nodes.filter((node) => node.id !== nodeId);
      const updatedNodeData = { ...node?.data, [key]: value };

      return [...restOfNodes, { ...node, data: updatedNodeData }];
    });

  return updateNodeData;
};
