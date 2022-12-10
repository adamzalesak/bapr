import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { StandardScalerNode, StandardScalerNodeSetting } from '../../models/standardScalerNode';
import { Modal } from '../common/Modal';
import { FormContainer, FormSegment } from '../common/form/styled';
import { Checkbox } from '../common/form/Checkbox';
import { Select } from '../common/form/Select';

export const StandardScalerDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<StandardScalerNode>();
  const updateNodeData = useUpdateNodeData<StandardScalerNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<StandardScalerNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: StandardScalerNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  return (
    <Modal title={t('nodes.standardScaler.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <FormContainer>
          <Select name="columnName" control={control} label={t('nodes.standardScaler.column')}>
            {sourceDataFrame?.columns
              .filter((c) => c.type === 'number')
              .map((column, index) => (
                <MenuItem key={index} value={column.name}>
                  {column.name}
                </MenuItem>
              ))}
          </Select>

          <FormSegment>
            <Checkbox
              name="withMean"
              control={control}
              label={t('nodes.standardScaler.withMean')}
            />
            {t('nodes.standardScaler.withMeanDescription')}
          </FormSegment>

          <FormSegment>
            <Checkbox name="withStd" control={control} label={t('nodes.standardScaler.withStd')} />
            {t('nodes.standardScaler.withStdDescription')}
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
