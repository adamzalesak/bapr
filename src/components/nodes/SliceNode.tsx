import _ from 'lodash';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { SliceNode as SliceNodeModel } from '../../models/sliceNode';
import { NodeBase } from './NodeBase';

export const SliceNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SliceNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<SliceNodeModel>(id);

  // // update node data
  useEffect(() => {
    if (!node) return;

    const nodeDataFrame =
      node.data.settings.from && node.data.settings.to
        ? sourceDataFrame?.slice(node.data.settings.from, node.data.settings.to)
        : undefined;

    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame, node?.data.settings]);

  // TODO:  keep settings valid if sourceData changes
  //   useEffect(() => {
  //     if (!node) return;

  //     const sortColumn = sourceDataFrame?.columns
  //       .map((c) => c.name)
  //       .includes(node.data.settings.sortColumn)
  //       ? node.data.settings.sortColumn
  //       : '';

  //     updateNodeData('settings', { ...node?.data.settings, sortColumn });
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [sourceDataFrame]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.slice.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};

