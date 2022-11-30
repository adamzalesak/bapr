import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { MinMaxScalerNode, MinMaxScalerNodeSetting } from '../../models/minMaxScalerNode';
import { ModalType } from '../../models/modal';
import { Modal } from '../common/Modal';
import { Form } from '../common/styled';
import { Select } from '../form/Select';

export const MinMaxScalerDetailModal = () => {
  const { t } = useTranslation();

  const { node, openModalType, closeModal } = useModal<MinMaxScalerNode>();
  const updateNodeData = useUpdateNodeData<MinMaxScalerNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<MinMaxScalerNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: MinMaxScalerNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  return (
    <Modal
      title={t('nodes.minMaxScaler.title')}
      open={openModalType === ModalType.Detail}
      onClose={closeModal}
    >
      {sourceDataFrame ? (
        <Form>
          <Select name="columnName" control={control} label={t('nodes.minMaxScaler.column')}>
            {sourceDataFrame?.columns
              .filter((c) => c.type === 'number')
              .map((column, index) => (
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
