import { ChangeEventHandler, useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRecoilState } from 'recoil';
import { DataFrame } from '../../classes/DataFrame';
import { ModalType } from '../../models/modal';
import { openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { useOpenModalNode, useUpdateNodeData } from '../../hooks/node';
import { FileNode, FileNodeSettings } from '../../models/fileNode';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { TextField } from '../form/TextField';
import { Form } from '../common/Form';

export const FileDetailModal = () => {
  const { t } = useTranslation();

  const node = useOpenModalNode() as FileNode | undefined;

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<FileNode>(openModal?.nodeId);

  const { control, getValues } = useForm<FileNodeSettings>({ defaultValues: node?.data.settings });

  const [isProcessing, setIsProcessing] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler = async (event) => {
    setIsProcessing(true);

    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const dataFrame = await DataFrame.fromCSVFile(file, getValues().rowsLimit);

    updateNodeData('dataFrame', dataFrame);
    updateNodeData('fileName', file.name);

    resetFileInput();

    setIsProcessing(false);
  };

  const resetFileInput = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const dataCount = node?.data.dataFrame?.count;

  return (
    <Modal
      title={t('nodes.file.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <Form>
        <TextField
          name="rowsLimit"
          type="number"
          label={t('nodes.file.rowsLimit')}
          control={control}
        />
        <LoadingButton
          variant="outlined"
          onClick={() => fileRef.current?.click()}
          loading={isProcessing}
        >
          {t('nodes.file.selectFile')}
        </LoadingButton>
        <input hidden type="file" accept=".csv" onChange={handleFileChange} ref={fileRef} />
        <div>{node?.data.fileName}</div>
        {!!dataCount && <div>{dataCount} rows </div>}
      </Form>
    </Modal>
  );
};
