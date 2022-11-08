import { Button, MenuItem } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useOpenModalNode, useUpdateNodeData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { JoinNode, JoinNodeHandle, JoinNodeSetting, JoinType } from '../../models/joinNode';
import { edgesState, nodesState, openModalState } from '../../store/atoms';
import { Form } from '../common/Form';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const JoinDetailModal = () => {
  const { t } = useTranslation();

  const nodes = useRecoilValue(nodesState);
  const edges = useRecoilValue(edgesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const updateNodeData = useUpdateNodeData<JoinNode>(openModal!.nodeId);

  const node = useOpenModalNode() as JoinNode;

  const sourceDataA = useMemo(() => {
    const edge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle == JoinNodeHandle.A,
    );
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes, node.id]);

  const sourceDataB = useMemo(() => {
    const edge = edges.find(
      (edge) => edge.target === node.id && edge.targetHandle == JoinNodeHandle.B,
    );
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes, node.id]);

  const { control, handleSubmit } = useForm<JoinNodeSetting>({
    defaultValues: node.data.settings,
  });

  const onSubmit = (settings: JoinNodeSetting) => {
    updateNodeData('settings', settings);
    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.join.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataA && sourceDataB ? (
        <Form>
          <Select name="columnA" control={control} label={t('nodes.join.columnA')}>
            {sourceDataA?.dataFrame?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>
          <Select name="columnB" control={control} label={t('nodes.join.columnB')}>
            {sourceDataB?.dataFrame?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>
          <Select name="type" control={control} label={t('nodes.join.type')}>
            <MenuItem value={JoinType.innerJoin}>{t('nodes.join.types.innerJoin')}</MenuItem>
            <MenuItem value={JoinType.leftOuterJoin}>
              {t('nodes.join.types.leftOuterJoin')}
            </MenuItem>
            <MenuItem value={JoinType.rightOuterJoin}>
              {t('nodes.join.types.rightOuterJoin')}
            </MenuItem>
            <MenuItem value={JoinType.fullOuterJoin}>
              {t('nodes.join.types.fullOuterJoin')}
            </MenuItem>
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
