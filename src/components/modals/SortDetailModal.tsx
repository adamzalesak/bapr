import { MenuItem, Select } from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode } from '../../models/node';
import { nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';

export const SortDetailModal = () => {
  const { t } = useTranslation();

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const node = useNode(openModal!.nodeId) as SortNode;
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
      title={t('nodes.sort.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceData ? (
        <>
          <Select onChange={handleColumnSelectChange} value={node.settings?.sortColumn ?? ' '}>
            <MenuItem value={' '}>
              <em>{t('common.notSelected')}</em>
            </MenuItem>
            {sourceData?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>
          <Select onChange={handleOrderSelectChange} value={node.settings?.desc ? 'desc' : 'asc'}>
            <MenuItem value="asc">{t('nodes.sort.asc')}</MenuItem>
            <MenuItem value="desc">{t('nodes.sort.desc')}</MenuItem>
          </Select>
        </>
      ) : (
        <>{t('detailModal.selectDataSource')}</>
      )}
    </Modal>
  );
};

