import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Handle, NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import {
  SimpleImputerNode as SimpleImputerNodeModel,
  SimpleImputerNumberStrategy,
  SimpleImputerStringStrategy,
} from '../../models/simpleImputerNode';
import { NodeBase } from './NodeBase';

export const SimpleImputerNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SimpleImputerNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<SimpleImputerNodeModel>(id);

  useEffect(() => {
    if (!node || !sourceDataFrame) {
      return;
    }

    const settings = node.data.settings;
    if (
      !settings.column ||
      !settings.strategy ||
      (settings.value === undefined &&
        settings.strategy === SimpleImputerNumberStrategy.Constant) ||
      (!settings.value && settings.strategy === SimpleImputerStringStrategy.Constant)
    ) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const column = sourceDataFrame.columns.find((c) => c.name === settings.column);
    if (!column) {
      updateNodeData('dataFrame', undefined);
      updateNodeData('settings', { ...settings, column: undefined });
      return;
    }

    const nodeDataFrame = sourceDataFrame?.simpleImputer(
      settings.column,
      settings.strategy,
      settings.value,
    );

    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.simpleImputer.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
