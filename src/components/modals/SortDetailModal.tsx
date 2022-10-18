import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode, SortNodeSetting } from '../../models/node';
import { nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const SortDetailModal = () => {
  const { t } = useTranslation();

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const node = useNode(openModal!.nodeId) as SortNode;
  const sourceData = useSourceData(node.id);

  const { control, handleSubmit } = useForm<SortNodeSetting>({
    defaultValues: { ...node.settings, direction: node.settings.direction ?? 'asc' },
  });

  const onSubmit = (settings: SortNodeSetting) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings } as SortNode,
    ]);

    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.sort.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceData ? (
        <form>
          <Select name="sortColumn" control={control}>
            <MenuItem value={' '}>
              <em>{t('common.notSelected')}</em>
            </MenuItem>
            {sourceData?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>
          <Select name="direction" control={control}>
            <MenuItem value="asc">{t('nodes.sort.asc')}</MenuItem>
            <MenuItem value="desc">{t('nodes.sort.desc')}</MenuItem>
          </Select>

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </form>
      ) : (
        <>{t('detailModal.selectDataSource')}</>
      )}
    </Modal>
  );
};

