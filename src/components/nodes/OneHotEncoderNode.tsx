import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Handle, NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { OneHotEncoderNode as OneHotEncoderNodeModel } from '../../models/oneHotEncoderNode';
import { NodeBase } from './NodeBase/NodeBase';

export const OneHotEncoderNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as OneHotEncoderNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<OneHotEncoderNodeModel>(id);

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
    if (!column) {
      updateNodeData('dataFrame', undefined);
      updateNodeData('settings', { ...settings, columnName: undefined });
      return;
    }

    const nodeDataFrame = sourceDataFrame?.oneHotEncoder(settings.columnName);
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.oneHotEncoder.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
