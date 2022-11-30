import { useRecoilState, useRecoilValue } from 'recoil';
import { DataNode } from '../models/dataNode';
import { ModalType } from '../models/modal';
import { openModalState } from '../store/atoms';
import { nodeSelector } from '../store/selectors';

export const useModal = <TDataNode extends DataNode>() => {
  const [stateOpenModal, setOpenModal] = useRecoilState(openModalState);
  const node = useRecoilValue(nodeSelector(stateOpenModal?.nodeId ?? '')) as TDataNode | undefined;
  const openModalType = stateOpenModal?.modalType;

  const openModal = (modalType: ModalType, nodeId?: string) => {
    setOpenModal({ modalType, nodeId });
  };
  const closeModal = () => setOpenModal(null);

  return { openModalType, node, openModal, closeModal };
};

