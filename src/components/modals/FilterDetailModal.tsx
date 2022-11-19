import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import {
  FilterNode,
  FilterNodeSetting,
  FilterNumberCondition,
  FilterStringCondition,
} from '../../models/filterNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/Form';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';
import { TextField } from '../form/TextField';

export const FilterDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<FilterNode>(openModal?.nodeId);

  const node = useNode(openModal?.nodeId) as FilterNode | undefined;
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit, watch, setValue } = useForm<FilterNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: FilterNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  const columnName = watch('column');
  const column = sourceDataFrame?.columns.find((column) => column.name === columnName);
  const condition = watch('condition');

  if (
    condition &&
    ((column?.type === 'number' &&
      !Object.values(FilterNumberCondition).includes(condition as any)) ||
      (column?.type === 'string' &&
        !Object.values(FilterStringCondition).includes(condition as any)))
  ) {
    setValue('condition', undefined);
    setValue('value', '');
  }

  return (
    <Modal
      title={t('nodes.filter.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataFrame ? (
        <Form>
          <Select name="column" control={control} label={t('nodes.filter.column')}>
            {sourceDataFrame?.columns.map((column, index) => (
              <MenuItem key={index} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
          </Select>

          <Select name="condition" control={control} label={t('nodes.filter.condition')}>
            {column?.type === 'number'
              ? Object.values(FilterNumberCondition).map((x) => (
                  <MenuItem value={x}>{t(`nodes.filter.conditions.${x}`)}</MenuItem>
                ))
              : Object.values(FilterStringCondition).map((x) => (
                  <MenuItem value={x}>{t(`nodes.filter.conditions.${x}`)}</MenuItem>
                ))}
          </Select>

          <TextField
            name="value"
            type={column?.type === 'number' ? 'number' : 'text'}
            control={control}
            label={t('nodes.filter.value')}
          />

          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
            {t('common.save')}
          </Button>
        </Form>
      ) : (
        <>{t('detailModal.selectDataSource')}</>
      )}
    </Modal>
  );
};
