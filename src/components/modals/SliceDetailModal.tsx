import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { SliceNode, SliceNodeSetting } from '../../models/sliceNode';
import { Modal } from '../common/Modal';
import { FormContainer } from '../form/styled';
import { TextField } from '../form/TextField';

export const SliceDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<SliceNode>();
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
    <Modal title={t('nodes.sort.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <FormContainer>
          <TextField name="from" type="number" label={t('nodes.slice.from')} control={control} />
          <TextField name="to" type="number" label={t('nodes.slice.to')} control={control} />

          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
            {t('common.save')}
          </Button>
        </FormContainer>
      ) : (
        t('detailModal.selectDataSource')
      )}
    </Modal>
  );
};
