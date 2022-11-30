import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { SliceNode, SliceNodeSetting } from '../../models/sliceNode';
import { Modal } from '../common/Modal';
import { Form } from '../common/styled';
import { TextField } from '../form/TextField';

export const SliceDetailModal = () => {
  const { t } = useTranslation();

  const { node, openModalType, closeModal } = useModal<SliceNode>();
  const updateNodeData = useUpdateNodeData<SliceNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<SliceNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: SliceNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  return (
    <Modal
      title={t('nodes.sort.title')}
      open={openModalType === ModalType.Detail}
      onClose={closeModal}
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
