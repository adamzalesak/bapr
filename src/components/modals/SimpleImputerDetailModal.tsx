import { Button, MenuItem } from '@mui/material';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import {
  SimpleImputerNode,
  SimpleImputerNodeSetting,
  simpleImputerNumberStrategies,
  simpleImputerStringStrategies,
} from '../../models/simpleImputerNode';
import { Modal } from '../common/Modal';
import { Form } from '../common/styled';
import { Select } from '../form/Select';
import { TextField } from '../form/TextField';

export const SimpleImputerDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<SimpleImputerNode>();
  const updateNodeData = useUpdateNodeData<SimpleImputerNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit, watch, setValue } = useForm<SimpleImputerNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: SimpleImputerNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  const columnName = watch('columnName');
  const column = sourceDataFrame?.columns.find((column) => column.name === columnName);
  const strategy = watch('strategy');
  const value = watch('value');

  // keep form values valid
  useEffect(() => {
    if (
      strategy &&
      ((column?.type === 'number' && !simpleImputerNumberStrategies.includes(strategy)) ||
        (column?.type === 'string' &&
          !(simpleImputerStringStrategies as readonly string[]).includes(strategy)))
    ) {
      setValue('strategy', undefined);
      setValue('value', '');
    }

    if (strategy !== 'CONSTANT') {
      setValue('value', '');
    }

    if (column?.type == 'number' && isNaN(+value)) {
      setValue('value', '');
    }
  }, [column?.type, strategy, value, setValue]);

  const displayValue = strategy === 'CONSTANT';

  return (
    <Modal title={t('nodes.simpleImputer.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <Form>
          <Select name="columnName" control={control} label={t('nodes.simpleImputer.column')}>
            {sourceDataFrame?.columns.map((column, index) => (
              <MenuItem key={index} value={column.name}>
                {column.name}
              </MenuItem>
            ))}
          </Select>

          <Select name="strategy" control={control} label={t('nodes.simpleImputer.strategy')}>
            {column?.type === 'number'
              ? simpleImputerNumberStrategies.map((x) => (
                  <MenuItem key={x} value={x}>
                    {t(`nodes.simpleImputer.strategies.${x}`)}
                  </MenuItem>
                ))
              : simpleImputerStringStrategies.map((x) => (
                  <MenuItem key={x} value={x}>
                    {t(`nodes.simpleImputer.strategies.${x}`)}
                  </MenuItem>
                ))}
          </Select>

          {displayValue && (
            <TextField
              name="value"
              type={column?.type === 'number' ? 'number' : 'text'}
              control={control}
              label={t('nodes.simpleImputer.value')}
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
