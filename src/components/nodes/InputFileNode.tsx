import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useSetRecoilState } from 'recoil';
import { ModalType } from '../../models/modal';
import { openModalState } from '../../store/atoms';

export const InputFileNode = ({ id, data }: NodeProps) => {
  const setOpenModal = useSetRecoilState(openModalState);

  return (
    <div
      style={{ padding: '1rem', border: '1px solid var(--primary-color)', borderRadius: '3px' }}
      onClick={() => {
        setOpenModal({ modalType: ModalType.Detail, nodeId: id });
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        setOpenModal({ modalType: ModalType.Data, nodeId: id });
      }}
    >
      <div>CSV File</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

