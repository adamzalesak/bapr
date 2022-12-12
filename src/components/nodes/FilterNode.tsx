import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { FilterNode as FilterNodeModel } from '../../models/filterNode';
import { NodeBase } from '../common/NodeBase/NodeBase';
import { StyledHandle } from '../common/NodeBase/styled';

export const FilterNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as FilterNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<FilterNodeModel>(id);

  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    if (
      !settings.columnName ||
      !settings.condition ||
      (!settings.value && settings.condition !== 'IS_NOT_NULL')
    ) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const column = sourceDataFrame?.columns.find((c) => c.name === settings.columnName);
    if (!column) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const nodeDataFrame = sourceDataFrame?.filter(
      settings.columnName,
      settings.condition,
      settings.value,
    );
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.filter.title')}>
      <StyledHandle type="target" position={Position.Left} />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
