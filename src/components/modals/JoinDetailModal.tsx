import { MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';
import { useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { JoinNode, SortNode } from '../../models/node';
import { edgesState, nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';

export const JoinDetailModal = () => {
  const [nodes, setNodes] = useRecoilState(nodesState);
  const [edges, setEdges] = useRecoilState(edgesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const node = nodes.find((node) => node.id === openModal?.nodeId) as JoinNode;

  const sourceDataA = useMemo(() => {
    const edge = edges.find((edge) => edge.target === node.id && edge.targetHandle == 'a');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes]);

  const sourceDataB = useMemo(() => {
    const edge = edges.find((edge) => edge.target === node.id && edge.targetHandle == 'b');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes]);

  const handleColumnASelectChange = (event: SelectChangeEvent) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings: { ...node.settings, columnA: event.target.value } } as JoinNode,
    ]);
  };

  const handleColumnBSelectChange = (event: SelectChangeEvent) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings: { ...node.settings, columnB: event.target.value } } as JoinNode,
    ]);
  };

  const handleTypeSelectChange = (event: SelectChangeEvent) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings: { ...node.settings, type: event.target.value } } as JoinNode,
    ]);
  };

  // const handleOrderSelectChange = (event: SelectChangeEvent) => {
  //   setNodes([
  //     ...nodes.filter((node) => node.id !== openModal?.nodeId),
  //     { ...node, settings: { ...node.settings, desc: event.target.value === 'desc' } } as SortNode,
  //   ]);
  // };

  return (
    <Modal
      title={'Join'}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      <>
        {!!sourceDataA && sourceDataB ? (
          <>
            <Select onChange={handleColumnASelectChange} value={node.settings?.columnA ?? ' '}>
              <MenuItem value={' '}>Not selected</MenuItem>
              {sourceDataA?.columns.map((columnName, index) => (
                <MenuItem key={index} value={columnName}>
                  {columnName}
                </MenuItem>
              ))}
            </Select>
            <Select onChange={handleColumnBSelectChange} value={node.settings?.columnB ?? ' '}>
              <MenuItem value={' '}>Not selected</MenuItem>
              {sourceDataB?.columns.map((columnName, index) => (
                <MenuItem key={index} value={columnName}>
                  {columnName}
                </MenuItem>
              ))}
            </Select>
            <Select onChange={handleTypeSelectChange} value={node.settings?.type ?? ' '}>
              <MenuItem value={' '}>Not selected</MenuItem>
              <MenuItem value={'join'}>Join</MenuItem>
              <MenuItem value={'joinOuter'}>Outer Join</MenuItem>
              <MenuItem value={'joinOuterLeft'}>Left outer join</MenuItem>
              <MenuItem value={'joinOuterRight'}>Right outer join</MenuItem>
            </Select>
            {/* <Select onChange={handleOrderSelectChange} value={node.settings?.desc ? 'desc' : 'asc'}>
              <MenuItem value={'asc'}>Ascending</MenuItem>
              <MenuItem value={'desc'}>Descending</MenuItem>
            </Select> */}
          </>
        ) : (
          <>Select data source</>
        )}
      </>
    </Modal>
  );
};

