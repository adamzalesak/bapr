import { ChangeEventHandler, useMemo, useRef, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useRecoilState } from 'recoil';
import { DataFrame } from '../../classes/DataFrame';
import { ModalType } from '../../models/modal';
import { nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { useOpenModalNode } from '../../hooks/nodes';
import { FileNode } from '../../models/fileNode';
import { useTranslation } from 'react-i18next';
import { DataNode } from '../../models/dataNode';

export const InputFileDetailModal = () => {
  const { t } = useTranslation();

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const [isLoading, setIsLoading] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler = async (event) => {
    setIsLoading(true);

    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const dataFrame = await DataFrame.fromCSVFile(file);

    const updatedNode: FileNode = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...(nodes.find((n) => n.id === openModal?.nodeId)! as FileNode),
      data: { dataFrame, fileName: file.name },
    };

    setNodes([...nodes.filter((n) => n.id !== openModal?.nodeId), updatedNode as DataNode]);

    resetFileInput();

    setIsLoading(false);
  };

  const resetFileInput = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const node = useOpenModalNode() as FileNode | undefined;

  const dataCount = useMemo(() => node?.data?.dataFrame?.count, [node?.data?.dataFrame]);

  return (
    <Modal
      title={t('nodes.CSVFile.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <>
        <LoadingButton
          variant="outlined"
          onClick={() => fileRef.current?.click()}
          loading={isLoading}
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
