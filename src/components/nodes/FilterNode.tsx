import _ from 'lodash';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';
import { useTranslation } from 'react-i18next';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import {
  FilterNode as FilterNodeModel,
  FilterNumberCondition,
  FilterStringCondition,
} from '../../models/filterNode';
import { NodeBase } from './NodeBase';

export const FilterNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as FilterNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData(id);

  useEffect(() => {
    if (!node || !sourceDataFrame) {
      return;
    }

    const settings = node.data.settings;
    if (
      !settings.column ||
      !settings.condition ||
      (!settings.value &&
        settings.condition !== FilterNumberCondition.isNotNull &&
        settings.condition !== FilterStringCondition.isNotNull)
    ) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const column = sourceDataFrame.columns.find((c) => c.name === settings.column);
    if (!column) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const nodeDataFrame = sourceDataFrame?.filter(
      settings.column,
      settings.condition,
      settings.value,
    );

    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.filter.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
