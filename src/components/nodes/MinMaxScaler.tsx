import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Handle, NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { MinMaxScalerNode as MinMaxScalerNodeModel } from '../../models/minMaxScalerNode';
import { NodeBase } from './NodeBase/NodeBase';

export const MinMaxScalerNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as MinMaxScalerNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<MinMaxScalerNodeModel>(id);

  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    if (!settings.column) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const column = sourceDataFrame?.columns.find((c) => c.name === settings.column);
    if (column?.type !== 'number') {
      updateNodeData('dataFrame', undefined);
      updateNodeData('settings', { ...settings, column: undefined });
      return;
    }

    const nodeDataFrame = sourceDataFrame?.minMaxScaler(settings.column);
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.minMaxScaler.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
