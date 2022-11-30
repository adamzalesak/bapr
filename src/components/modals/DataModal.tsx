import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { DataGrid } from '../common/DataGrid';
import { Modal } from '../common/Modal';

export const DataModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal();

  return (
    <Modal title={t('dataModal.title')} open={!!node} onClose={closeModal}>
      {node?.data.dataFrame ? (
        <DataGrid dataFrame={node?.data.dataFrame} />
      ) : (
        t('dataModal.notExecuted')
      )}
    </Modal>
  );
};
