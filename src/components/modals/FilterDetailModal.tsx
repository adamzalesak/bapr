import { Button, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import {
  FilterNode,
  FilterNodeSetting,
  filterNumberConditions,
  filterStringConditions,
} from '../../models/filterNode';
import { Modal } from '../common/Modal';
import { FormContainer } from '../form/styled';
import { Select } from '../form/Select';
import { TextField } from '../form/TextField';

export const FilterDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<FilterNode>();
  const updateNodeData = useUpdateNodeData<FilterNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit, watch, setValue } = useForm<FilterNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: FilterNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  const columnName = watch('columnName');
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
    <Modal title={t('nodes.filter.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <FormContainer>
          <Select name="columnName" control={control} label={t('nodes.filter.column')}>
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
        </FormContainer>
      ) : (
        t('detailModal.selectDataSource')
      )}
    </Modal>
  );
};
