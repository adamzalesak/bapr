import { Button, MenuItem } from '@mui/material';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useModal } from '../../hooks/modal';
import { useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { RenameColumnsNode, RenameColumnsNodeSetting } from '../../models/renameColumnsNode';
import { Modal } from '../common/Modal';
import { Form, FormSegment } from '../common/styled';
import { Select } from '../form/Select';
import { TextField } from '../form/TextField';

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
        <Form>
          {controlledFields.map((field, index) => (
            <FormSegment>
              <Select
                key={`${field.id}-oldColumnName`}
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
                key={`${field.id}-newColumnName`}
                name={`columns.${index}.newColumnName`}
                label={t('nodes.renameColumns.newColumnName')}
                control={control}
              />

              <Button onClick={() => remove(index)}>{t('common.remove')}</Button>
            </FormSegment>
          ))}

          {fields.length < sourceDataFrame.columns.length && (
            <Button onClick={() => append({ oldColumnName: '', newColumnName: '' })}>
              {t('nodes.renameColumns.addColumn')}
            </Button>
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
