import AddIcon from '@mui/icons-material/Add';
import { Button, MenuItem, styled } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { DropColumnsNode, DropColumnsNodeSetting } from '../../models/dropColumnsNode';
import { Modal } from '../common/Modal';
import { Form } from '../common/styled';
import { Select } from '../form/Select';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const FormLine = styled('div')`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 1rem;
  width: 25rem;
`;

const AddColumnButton = styled(Button)`
  width: fit-content;
  margin-left: auto;
`;

export const DropColumnsDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<DropColumnsNode>();
  const updateNodeData = useUpdateNodeData<DropColumnsNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit, watch } = useForm<DropColumnsNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const onSubmit = (settings: DropColumnsNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  const watchFieldArray = watch('columns');
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }));

  return (
    <Modal title={t('nodes.dropColumns.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <Form>
          {controlledFields.map((field, index) => (
            <FormLine key={field.id}>
              <Select
                name={`columns.${index}.name`}
                label={t('nodes.dropColumns.columnName')}
                control={control}
              >
                {sourceDataFrame.columns
                  .filter(
                    (c) =>
                      !controlledFields.map((f) => f.name).includes(c.name) ||
                      c.name === field.name,
                  )
                  .map((c) => (
                    <MenuItem key={c.name} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>

              <Button startIcon={<RemoveCircleIcon />} onClick={() => remove(index)}>
                {t('common.remove')}
              </Button>
            </FormLine>
          ))}

          {fields.length < sourceDataFrame.columns.length && (
            <AddColumnButton startIcon={<AddIcon />} onClick={() => append({ name: '' })}>
              {t('nodes.dropColumns.addColumn')}
            </AddColumnButton>
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
