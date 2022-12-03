import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { OneHotEncoderNode, OneHotEncoderNodeSetting } from '../../models/oneHotEncoderNode';
import { Modal } from '../common/Modal';
import { FormContainer, FormSegment } from '../form/styled';
import { Checkbox } from '../form/Checkbox';
import { Select } from '../form/Select';

export const OneHotEncoderDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<OneHotEncoderNode>();
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
    <Modal title={t('nodes.oneHotEncoder.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <FormContainer>
          <Select name="columnName" control={control} label={t('nodes.oneHotEncoder.column')}>
            {sourceDataFrame?.columns.map((column, index) => (
              <MenuItem key={index} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
          </Select>

          <FormSegment>
            <Checkbox
              name="dropFirst"
              control={control}
              label={t('nodes.oneHotEncoder.dropFirst')}
            />
            {t('nodes.oneHotEncoder.dropFirstDescription')}
          </FormSegment>

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
