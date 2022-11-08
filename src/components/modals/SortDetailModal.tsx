import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode, SortNodeSetting } from '../../models/sortNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/Form';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const SortDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<SortNode>(openModal!.nodeId);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const node = useNode(openModal!.nodeId) as SortNode;
  const sourceDataFrame = useSourceDataFrame(node.id);

  const { control, handleSubmit } = useForm<SortNodeSetting>({ defaultValues: node.data.settings });

  const onSubmit = (settings: SortNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.sort.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataFrame ? (
        <Form>
          <Select name="sortColumn" control={control} label={t('nodes.sort.column')}>
            {sourceDataFrame?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>

          <Select name="direction" control={control} label={t('nodes.sort.direction')}>
            <MenuItem value="asc">{t('nodes.sort.asc')}</MenuItem>
            <MenuItem value="desc">{t('nodes.sort.desc')}</MenuItem>
          </Select>

          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
            {t('common.save')}
          </Button>
        </Form>
      ) : (
        t('detailModal.selectDataSource')
      )}
    </Modal>
  );
};
