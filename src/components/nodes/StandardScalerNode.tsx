import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Handle, NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { StandardScalerNode as StandardScalerNodeModel } from '../../models/standardScalerNode';
import { NodeBase } from './NodeBase/NodeBase';

export const StandardScalerNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as StandardScalerNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<StandardScalerNodeModel>(id);

  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    if (!settings.columnName) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const column = sourceDataFrame?.columns.find((c) => c.name === settings.columnName);
    if (column?.type !== 'number') {
      updateNodeData('dataFrame', undefined);
      updateNodeData('settings', { ...settings, columnName: undefined });
      return;
    }

    const nodeDataFrame = sourceDataFrame?.standardScaler(
      settings.columnName,
      settings.withMean ?? true,
      settings.withStd ?? true,
    );
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.standardScaler.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
