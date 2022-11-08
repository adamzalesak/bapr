import { useSetRecoilState } from 'recoil';
import { openModalState } from '../../store/atoms';
import { useOpenDataModalNode } from '../../hooks/nodes';
import { DataGrid } from '../common/DataGrid';
import { Modal } from '../common/Modal';
import { useTranslation } from 'react-i18next';

export const DataModal = () => {
  const { t } = useTranslation();

  const node = useOpenDataModalNode();
  const setOpenModal = useSetRecoilState(openModalState);

  return (
    <Modal title={'Data'} open={!!node} onClose={() => setOpenModal(null)}>
      {node?.data?.dataFrame ? (
        <DataGrid dataFrame={node?.data?.dataFrame} />
      ) : (
        t('dataModal.notExecuted')
      )}
    </Modal>
  );
};
