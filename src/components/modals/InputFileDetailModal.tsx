import { ChangeEventHandler, useMemo, useRef } from 'react';
import { Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { DataFrame } from '../../classes/DataFrame';
import { ModalType } from '../../models/modal';
import { nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { useOpenModalNode } from '../../hooks/nodes';
import { FileNode } from '../../models/node';
import { useTranslation } from 'react-i18next';

export const InputFileDetailModal = () => {
  const { t } = useTranslation();

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler = async (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    const data = await DataFrame.fromCSVFile(file);

    const updatedNode: FileNode = {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      ...nodes.find((n) => n.id === openModal?.nodeId)!,
      data: data,
      fileName: file.name,
    };

    setNodes([...nodes.filter((n) => n.id !== openModal?.nodeId), updatedNode]);

    resetFileInput();
  };

  const resetFileInput = () => {
    if (fileRef.current) {
      fileRef.current.value = '';
    }
  };

  const node = useOpenModalNode() as FileNode | undefined;

  const dataCount = useMemo(() => node?.data?.count, [node?.data]);

  return (
    <Modal
      title={t('nodes.CSVFile.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <>
        <Button variant="outlined" onClick={() => fileRef.current?.click()}>
          {t('nodes.CSVFile.selectFile')}
        </Button>
        <input hidden type="file" accept=".csv" onChange={handleFileChange} ref={fileRef} />
        <div>{node?.fileName}</div>
        {!!dataCount && <div>{dataCount} rows </div>}
      </>
    </Modal>
  );
};
