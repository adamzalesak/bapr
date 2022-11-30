import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { ModalType } from '../../models/modal';
import {
  SimpleImputerNode,
  SimpleImputerNodeSetting,
  simpleImputerNumberStrategies,
  simpleImputerStringStrategies,
} from '../../models/simpleImputerNode';
import { openModalState } from '../../store/atoms';
import { Form } from '../common/styled';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';
import { TextField } from '../form/TextField';
import { useEffect } from 'react';

export const SimpleImputerDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<SimpleImputerNode>(openModal?.nodeId);

  const node = useNode(openModal?.nodeId) as SimpleImputerNode | undefined;
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit, watch, setValue } = useForm<SimpleImputerNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const onSubmit = (settings: SimpleImputerNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
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
    <Modal
      title={t('nodes.simpleImputer.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
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
