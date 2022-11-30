import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import { StandardScalerNode, StandardScalerNodeSetting } from '../../models/standardScalerNode';
import { openModalState } from '../../store/atoms';
import { Form, FormSegment } from '../common/styled';
import { Modal } from '../common/Modal';
import { Checkbox } from '../form/Checkbox';
import { Select } from '../form/Select';

export const StandardScalerDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<StandardScalerNode>(openModal?.nodeId);

  const node = useNode(openModal?.nodeId) as StandardScalerNode | undefined;
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit } = useForm<StandardScalerNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: StandardScalerNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.standardScaler.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataFrame ? (
        <Form>
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
        </Form>
      ) : (
        t('detailModal.selectDataSource')
      )}
    </Modal>
  );
};
