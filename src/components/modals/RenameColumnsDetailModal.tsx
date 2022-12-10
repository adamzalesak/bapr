import AddIcon from '@mui/icons-material/Add';
import { Button, MenuItem, styled } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { RenameColumnsNode, RenameColumnsNodeSetting } from '../../models/renameColumnsNode';
import { Modal } from '../common/Modal';
import { FormContainer } from '../common/form/styled';
import { Select } from '../common/form/Select';
import { TextField } from '../common/form/TextField';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

const FormLine = styled('div')`
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 1rem;
  width: 35rem;
`;

const AddColumnButton = styled(Button)`
  width: fit-content;
  margin-left: auto;
`;

export const RenameColumnsDetailModal = () => {
  const { t } = useTranslation();

  const { node, closeModal } = useModal<RenameColumnsNode>();
  const updateNodeData = useUpdateNodeData<RenameColumnsNode>(node?.id);
  const sourceDataFrame = useSourceDataFrame(node?.id);

  const { control, handleSubmit, watch } = useForm<RenameColumnsNodeSetting>({
    defaultValues: node?.data.settings,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'columns',
  });

  const onSubmit = (settings: RenameColumnsNodeSetting) => {
    updateNodeData('settings', settings);
    closeModal();
  };

  const watchFieldArray = watch('columns');
  const controlledFields = fields.map((field, index) => ({
    ...field,
    ...watchFieldArray[index],
  }));

  return (
    <Modal title={t('nodes.renameColumns.title')} open onClose={closeModal}>
      {sourceDataFrame ? (
        <FormContainer>
          {controlledFields.map((field, index) => (
            <FormLine key={field.id}>
              <Select
                name={`columns.${index}.oldColumnName`}
                label={t('nodes.renameColumns.columnName')}
                control={control}
              >
                {sourceDataFrame.columns
                  .filter(
                    (c) =>
                      !controlledFields.map((f) => f.oldColumnName).includes(c.name) ||
                      c.name === field.oldColumnName,
                  )
                  .map((c) => (
                    <MenuItem key={c.name} value={c.name}>
                      {c.name}
                    </MenuItem>
                  ))}
              </Select>

              <TextField
                name={`columns.${index}.newColumnName`}
                label={t('nodes.renameColumns.newColumnName')}
                control={control}
              />

              <Button startIcon={<RemoveCircleIcon />} onClick={() => remove(index)}>
                {t('common.remove')}
              </Button>
            </FormLine>
          ))}

          {fields.length < sourceDataFrame.columns.length && (
            <AddColumnButton
              startIcon={<AddIcon />}
              onClick={() => append({ oldColumnName: '', newColumnName: '' })}
            >
              {t('nodes.renameColumns.addColumn')}
            </AddColumnButton>
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
