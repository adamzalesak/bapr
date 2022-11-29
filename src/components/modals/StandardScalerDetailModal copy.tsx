import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { MinMaxScalerNode, MinMaxScalerNodeSetting } from '../../models/minMaxScalerNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/styled';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const MinMaxScalerDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<MinMaxScalerNode>(openModal?.nodeId);

  const node = useNode(openModal?.nodeId) as MinMaxScalerNode | undefined;
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<MinMaxScalerNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: MinMaxScalerNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.minMaxScaler.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataFrame ? (
        <Form>
          <Select name="column" control={control} label={t('nodes.minMaxScaler.column')}>
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
