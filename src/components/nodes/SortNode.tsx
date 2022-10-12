import { Row } from 'dataframe-js';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DataFrame } from '../../classes/DataFrame';
import { useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode as SortNodeModel } from '../../models/node';
import { nodesState, openModalState } from '../../store/atoms';

export const SortNode = ({ id, data }: NodeProps) => {
  const { t } = useTranslation();

  const setOpenModal = useSetRecoilState(openModalState);
  const [nodes, setNodes] = useRecoilState(nodesState);

  const sourceData = useSourceData(id);

  const node = useMemo(() => nodes.find((n) => n.id === id) as SortNodeModel, [nodes]);

  // update node data
  useEffect(() => {
    const nodeData =
      node.settings?.sortColumn && node.settings?.sortColumn !== ' '
        ? sourceData?.sort(node.settings?.sortColumn, node.settings?.desc)
        : undefined;

    setNodes(
      (nodes) =>
        [...nodes.filter((n) => n.id !== id), { ...node, data: nodeData }] as SortNodeModel[],
    );
  }, [sourceData, node.settings]);

  // keep settings valid if sourceData changes
  useEffect(() => {
    const sortColumn = sourceData?.columns.includes(node.settings?.sortColumn)
      ? node.settings?.sortColumn
      : undefined;

    setNodes(
      (nodes) =>
        [
          ...nodes.filter((n) => n.id !== id),
          { ...node, settings: { ...node.settings, sortColumn } },
        ] as SortNodeModel[],
    );
  }, [sourceData]);

  return (
    <div
      style={{ padding: '1rem', border: '1px solid var(--primary-color)', borderRadius: '3px' }}
      onClick={() => {
        setOpenModal({ modalType: ModalType.Detail, nodeId: id });
      }}
      onContextMenu={(event) => {
        event.preventDefault();
        setOpenModal({ modalType: ModalType.Data, nodeId: id });
      }}
    >
      <div>{t('nodes.sort.title')}</div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

