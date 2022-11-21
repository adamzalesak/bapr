import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { SliceNode, SliceNodeSetting } from '../../models/sliceNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/styled';
import { Modal } from '../common/Modal';
import { TextField } from '../form/TextField';

export const SliceDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<SliceNode>(openModal?.nodeId);

  const node = useNode(openModal?.nodeId) as SliceNode | undefined;
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<SliceNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: SliceNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.sort.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataFrame ? (
        <Form>
          <TextField name="from" type="number" label={t('nodes.slice.from')} control={control} />
          <TextField name="to" type="number" label={t('nodes.slice.to')} control={control} />

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
