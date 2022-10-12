import { MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { useRecoilState } from 'recoil';
import { useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode } from '../../models/node';
import { nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';

export const SortDetailModal = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const node = nodes.find((node) => node.id === openModal?.nodeId) as SortNode;

  const sourceData = useSourceData(node.id);

  const handleColumnSelectChange = (event: SelectChangeEvent) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings: { ...node.settings, sortColumn: event.target.value } } as SortNode,
    ]);
  };

  const handleOrderSelectChange = (event: SelectChangeEvent) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings: { ...node.settings, desc: event.target.value === 'desc' } } as SortNode,
    ]);
  };

  return (
    <Modal
      title={'Sort'}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <>
        {!!sourceData ? (
          <>
            <Select onChange={handleColumnSelectChange} value={node.settings?.sortColumn ?? ' '}>
              <MenuItem value={' '}>Not selected</MenuItem>
              {sourceData?.columns.map((columnName, index) => (
                <MenuItem key={index} value={columnName}>
                  {columnName}
                </MenuItem>
              ))}
            </Select>
            <Select onChange={handleOrderSelectChange} value={node.settings?.desc ? 'desc' : 'asc'}>
              <MenuItem value={'asc'}>Ascending</MenuItem>
              <MenuItem value={'desc'}>Descending</MenuItem>
            </Select>
          </>
        ) : (
          <>Select data source</>
        )}
      </>
    </Modal>
  );
};

