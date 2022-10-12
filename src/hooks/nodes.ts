import { useMemo } from 'react';
import { useRecoilValue } from 'recoil';
import { ModalType } from '../models/modal';
import { edgesState, nodesState, openModalState } from '../store/atoms';

export const useOpenModalNode = () => {
  const nodes = useRecoilValue(nodesState);
  const openModal = useRecoilValue(openModalState);

  return nodes.find((node) => node.id === openModal?.nodeId);
};

export const useOpenDataModalNode = () => {
  const nodes = useRecoilValue(nodesState);
  const openModal = useRecoilValue(openModalState);

  return nodes.find(
    (node) => openModal?.modalType == ModalType.Data && node.id === openModal.nodeId,
  );
};

export const useSourceData = (nodeId: string) => {
  const edges = useRecoilValue(edgesState);
  const nodes = useRecoilValue(nodesState);

  return useMemo(() => {
    const edge = edges.find((edge) => edge.target === nodeId);
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes]);
};

