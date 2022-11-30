import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import {
  FilterNode,
  FilterNodeSetting,
  filterNumberConditions,
  filterStringConditions,
} from '../../models/filterNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/styled';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';
import { TextField } from '../form/TextField';
import { useEffect } from 'react';

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
  const value = watch('value');

  // keep form values valid
  useEffect(() => {
    if (
      condition &&
      ((column?.type === 'number' &&
        !(filterNumberConditions as readonly string[]).includes(condition)) ||
        (column?.type === 'string' &&
          !(filterStringConditions as readonly string[]).includes(condition)))
    ) {
      setValue('condition', undefined);
      setValue('value', '');
    }

    if (condition === 'IS_NOT_NULL') {
      setValue('value', '');
    }

    if (column?.type == 'number' && isNaN(+value)) {
      setValue('value', '');
    }
  }, [column?.type, value, condition, setValue]);

  const displayValue = condition !== 'IS_NOT_NULL';

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
              ? filterNumberConditions.map((c) => (
                  <MenuItem key={c} value={c}>
                    {t(`nodes.filter.conditions.${c}`)}
                  </MenuItem>
                ))
              : filterStringConditions.map((c) => (
                  <MenuItem key={c} value={c}>
                    {t(`nodes.filter.conditions.${c}`)}
                  </MenuItem>
                ))}
          </Select>

          {displayValue && (
            <TextField
              name="value"
              type={column?.type === 'number' ? 'number' : 'text'}
              control={control}
              label={t('nodes.filter.value')}
            />
          )}

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
