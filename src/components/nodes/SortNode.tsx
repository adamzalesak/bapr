import { Row } from 'dataframe-js';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { DataFrame } from '../../classes/DataFrame';
import { useNode, useSourceData } from '../../hooks/nodes';
import { ModalType } from '../../models/modal';
import { SortNode as SortNodeModel } from '../../models/node';
import { nodesState, openModalState } from '../../store/atoms';
import { NodeBase } from './NodeBase';

export const SortNode = ({ id, data }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SortNodeModel;
  const sourceData = useSourceData(id);

  const [nodes, setNodes] = useRecoilState(nodesState);

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
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.sort.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};

