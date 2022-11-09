import _ from 'lodash';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { SortNode as SortNodeModel } from '../../models/sortNode';
import { NodeBase } from './NodeBase';

export const SortNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SortNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<SortNodeModel>(id);

  // // update node data
  useEffect(() => {
    const nodeDataFrame =
      node?.data?.settings.sortColumn && node.data?.settings.sortColumn !== ' '
        ? sourceDataFrame?.sort(node.data.settings.sortColumn, node.data.settings.direction)
        : undefined;

    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame, node?.data?.settings]);

  // // keep settings valid if sourceData changes
  useEffect(() => {
    const sortColumn = node
      ? sourceDataFrame?.columns.map((c) => c.name).includes(node.data.settings.sortColumn)
        ? node?.data?.settings.sortColumn
        : ''
      : '';

    updateNodeData('settings', { ...node?.data?.settings, sortColumn });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.sort.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
