import { useRecoilState } from 'recoil';
import { openModalState } from '../../store/atoms';
import { useNode } from '../../hooks/node';
import { DataGrid } from '../common/DataGrid';
import { Modal } from '../common/Modal';
import { useTranslation } from 'react-i18next';
import { ModalType } from '../../models/modal';

export const DataModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const nodeId = openModal?.modalType === ModalType.Data ? openModal?.nodeId : undefined;
  const node = useNode(nodeId);

  return (
    // TODO: translate
    <Modal title={'Data'} open={!!node} onClose={() => setOpenModal(null)}>
      {node?.data.dataFrame ? (
        <DataGrid dataFrame={node?.data.dataFrame} />
      ) : (
        t('dataModal.notExecuted')
      )}
    </Modal>
  );
};
