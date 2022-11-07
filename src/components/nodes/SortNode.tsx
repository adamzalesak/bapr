import _ from 'lodash';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { useNode, useSourceDataFrame } from '../../hooks/nodes';
import { SortNode as SortNodeModel } from '../../models/sortNode';
import { nodesState } from '../../store/atoms';
import { NodeBase } from './NodeBase';

export const SortNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SortNodeModel | undefined;
  const sourceData = useSourceDataFrame(id);

  const setNodes = useSetRecoilState(nodesState);

  // // update node data
  useEffect(() => {
    if (!node) return;

    const nodeDataFrame =
      node?.data?.settings.sortColumn && node.data?.settings.sortColumn !== ' '
        ? sourceData?.sort(node.data.settings.sortColumn, node.data.settings.direction)
        : undefined;

    setNodes((nodes) => [
      ...nodes.filter((n) => n.id !== id),
      { ...node, data: { ...node.data, dataFrame: nodeDataFrame } },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData, node?.data?.settings]);

  // // keep settings valid if sourceData changes
  useEffect(() => {
    if (!node) return;

    const sortColumn = node
      ? sourceData?.columns.includes(node.data.settings.sortColumn)
        ? node?.data?.settings.sortColumn
        : ''
      : '';

    setNodes((nodes) => [
      ...nodes.filter((n) => n.id !== id),
      {
        ...node,
        data: { ...node.data, settings: { ...node?.data?.settings, sortColumn } },
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceData]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.sort.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
