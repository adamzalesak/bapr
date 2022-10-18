import { Button, MenuItem } from '@mui/material';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useOpenModalNode } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { JoinNode, JoinNodeSetting } from '../../models/node';
import { edgesState, nodesState, openModalState } from '../../store/atoms';
import { Modal } from '../common/Modal';
import { Select } from '../form/Select';

export const JoinDetailModal = () => {
  const { t } = useTranslation();

  const [nodes, setNodes] = useRecoilState(nodesState);
  const edges = useRecoilValue(edgesState);
  const [openModal, setOpenModal] = useRecoilState(openModalState);

  const node = useOpenModalNode() as JoinNode;

  const sourceDataA = useMemo(() => {
    const edge = edges.find((edge) => edge.target === node.id && edge.targetHandle == 'a');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes, node.id]);

  const sourceDataB = useMemo(() => {
    const edge = edges.find((edge) => edge.target === node.id && edge.targetHandle == 'b');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data;
  }, [edges, nodes, node.id]);

  const { control, handleSubmit } = useForm<JoinNodeSetting>({
    defaultValues: node.settings,
  });

  const onSubmit = (settings: JoinNodeSetting) => {
    setNodes([
      ...nodes.filter((node) => node.id !== openModal?.nodeId),
      { ...node, settings } as JoinNode,
    ]);

    setOpenModal(null);
  };

  return (
    <Modal
      title={t('nodes.join.title')}
      open={openModal?.modalType == ModalType.Detail}
      onClose={() => setOpenModal(null)}
    >
      {sourceDataA && sourceDataB ? (
        <form>
          <Select name="columnA" control={control}>
            <MenuItem value={' '}>
              <em>{t('common.notSelected')}</em>
            </MenuItem>
            {sourceDataA?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>
          <Select name="columnB" control={control}>
            <MenuItem value={' '}>
              <em>{t('common.notSelected')}</em>
            </MenuItem>
            {sourceDataB?.columns.map((columnName, index) => (
              <MenuItem key={index} value={columnName}>
                {columnName}
              </MenuItem>
            ))}
          </Select>
          <Select name="type" control={control}>
            <MenuItem value={' '}>
              <em>{t('common.notSelected')}</em>
            </MenuItem>
            <MenuItem value={'join'}>Join</MenuItem>
            <MenuItem value={'joinOuter'}>Outer Join</MenuItem>
            <MenuItem value={'joinOuterLeft'}>Left outer join</MenuItem>
            <MenuItem value={'joinOuterRight'}>Right outer join</MenuItem>
          </Select>

          <Button onClick={handleSubmit(onSubmit)}>Save</Button>
        </form>
      ) : (
        <>{t('detailModal.selectDataSource')}</>
      )}
    </Modal>
  );
};

