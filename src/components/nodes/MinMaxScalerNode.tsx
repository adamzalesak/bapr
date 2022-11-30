import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { MinMaxScalerNode as MinMaxScalerNodeModel } from '../../models/minMaxScalerNode';
import { NodeBase } from './NodeBase/NodeBase';
import { StyledHandle } from './NodeBase/styled';

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

    const nodeDataFrame = sourceDataFrame?.minMaxScaler(settings.columnName);
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.minMaxScaler.title')}>
      <StyledHandle type="target" position={Position.Left} />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
