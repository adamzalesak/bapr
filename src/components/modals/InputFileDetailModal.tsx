import { ChangeEventHandler, useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRecoilState } from 'recoil';
import { DataFrame } from '../../classes/DataFrame';
import { ModalType } from '../../models/modal';
import { openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { useOpenModalNode, useUpdateNodeData } from '../../hooks/node';
import { FileNode } from '../../models/fileNode';
import { useTranslation } from 'react-i18next';

export const InputFileDetailModal = () => {
  const { t } = useTranslation();

  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<FileNode>(openModal?.nodeId);

  const [isProcessing, setIsProcessing] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler = async (event) => {
    setIsProcessing(true);

    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const dataFrame = await DataFrame.fromCSVFile(file);

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

  const node = useOpenModalNode() as FileNode | undefined;

  const dataCount = node?.data?.dataFrame?.count;

  return (
    <Modal
      title={t('nodes.CSVFile.title')}
      open={openModal?.modalType === ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <>
        <LoadingButton
          variant="outlined"
          onClick={() => fileRef.current?.click()}
          loading={isProcessing}
        >
          {t('nodes.CSVFile.selectFile')}
        </LoadingButton>
        <input hidden type="file" accept=".csv" onChange={handleFileChange} ref={fileRef} />
        <div>{node?.data?.fileName}</div>
        {!!dataCount && <div>{dataCount} rows </div>}
      </>
    </Modal>
  );
};
