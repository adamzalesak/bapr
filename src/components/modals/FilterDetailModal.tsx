import { Button, MenuItem } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { useNode, useSourceDataFrame } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode, SortNodeSetting } from '../../models/sortNode';
import { nodesState, openModalState } from '../../store/atoms';
import { Form } from '../common/Form';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const FilterDetailModal = () => {
  const { t } = useTranslation();

  const [nodes, setNodes] = useRecoilState(nodesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const node = useNode(openModal!.nodeId) as SortNode;
  const sourceData = useSourceDataFrame(node.id);

  const { control, handleSubmit } = useForm<SortNodeSetting>({ defaultValues: node.data.settings });

  const onSubmit = (settings: SortNodeSetting) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings } as SortNode,
    ]);

    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.filter.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceData ? (
        <Form>
          <Select name="sortColumn" control={control} label={t('nodes.sort.column')}>
            {sourceData?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>

          <Select name="direction" control={control} label={t('nodes.sort.direction')}>
            <MenuItem value="asc">{t('nodes.sort.asc')}</MenuItem>
            <MenuItem value="desc">{t('nodes.sort.desc')}</MenuItem>
          </Select>

          <Button variant="outlined" onClick={handleSubmit(onSubmit)}>
            {t('common.save')}
          </Button>
        </Form>
      ) : (
        <>{t('detailModal.selectDataSource')}</>
      )}
    </Modal>
  );
};
