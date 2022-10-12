import { ChangeEventHandler, useMemo, useRef } from 'react';
import { Button } from '@mui/material';
import { parse } from 'papaparse';
import { useRecoilState } from 'recoil';
import { DataFrame, DataFrameRow } from '../../classes/DataFrame';
import { ModalType } from '../../models/modal';
import { nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { useOpenModalNode } from '../../hooks/nodes';
import { FileNode } from '../../models/node';

export const InputFileDetailModal = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange: ChangeEventHandler = (event) => {
    const target = event.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    parse(file, {
      dynamicTyping: true,
      skipEmptyLines: true,
      header: true,
      fastMode: true,
      // worker: true,
      complete: (result) => {
        const data = new DataFrame(result.data as DataFrameRow[]);

        const updatedNode: FileNode = {
          ...nodes.find((n) => n.id === openModal?.nodeId)!,
          data: data,
          fileName: file.name,
        };

        setNodes([...nodes.filter((n) => n.id !== openModal?.nodeId), updatedNode]);
      },
    });

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
      title={'CSV file'}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <>
        <Button variant="outlined" onClick={() => fileRef.current?.click()}>
          Select file
        </Button>
        <input hidden type="file" accept=".csv" onChange={handleFileChange} ref={fileRef} />
        <div>{node?.fileName}</div>
        {!!dataCount && <div>{dataCount} rows </div>}
      </>
    </Modal>
  );
};

