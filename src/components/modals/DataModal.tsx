import { useRecoilState, useSetRecoilState } from 'recoil';
import { openModalState } from '../../store/atoms';
import { useOpenDataModalNode } from '../../hooks/nodes';
import { DataGrid } from '../common/DataGrid';
import { Modal } from '../common/Modal';

export const DataModal = () => {
  const node = useOpenDataModalNode();
  const setOpenModal = useSetRecoilState(openModalState);

  return (
    <Modal title={'Data'} open={!!node} onClose={() => setOpenModal(null)}>
      <>{node?.data ? <DataGrid data={node?.data} /> : 'Data is not loaded yet.'}</>
    </Modal>
  );
};
