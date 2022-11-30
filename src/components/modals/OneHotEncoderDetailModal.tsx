import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { OneHotEncoderNode, OneHotEncoderNodeSetting } from '../../models/oneHotEncoderNode';
import { Modal } from '../common/Modal';
import { Form } from '../common/styled';
import { Select } from '../form/Select';

export const OneHotEncoderDetailModal = () => {
  const { t } = useTranslation();

  const { node, openModalType, closeModal } = useModal<OneHotEncoderNode>();
  const updateNodeData = useUpdateNodeData<OneHotEncoderNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<OneHotEncoderNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: OneHotEncoderNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  return (
    <Modal
      title={t('nodes.oneHotEncoder.title')}
      open={openModalType === ModalType.Detail}
      onClose={closeModal}
    >
      {sourceDataFrame ? (
        <Form>
          <Select name="columnName" control={control} label={t('nodes.oneHotEncoder.column')}>
            {sourceDataFrame?.columns.map((column, index) => (
              <MenuItem key={index} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
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
