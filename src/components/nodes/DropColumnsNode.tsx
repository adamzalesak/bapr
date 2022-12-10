import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { DropColumnsNode as DropColumnsNodeModel } from '../../models/dropColumnsNode';
import { NodeBase } from '../common/NodeBase/NodeBase';
import { StyledHandle } from '../common/NodeBase/styled';

export const DropColumnsNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as DropColumnsNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<DropColumnsNodeModel>(id);

  // update node data
  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    const columns = settings.columns.filter((c) => c.name);

    if (!columns.length) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const nodeDataFrame = sourceDataFrame?.dropColumns(columns.map((c) => c.name));
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [node?.data.settings, sourceDataFrame]);

  // update node settings
  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    const sourceColumnNames = sourceDataFrame?.columns.map((c) => c.name);
    if (!settings.columns.map((c) => c.name).every((c) => sourceColumnNames?.includes(c))) {
      updateNodeData('settings', { ...settings, columns: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.dropColumns.title')}>
      <StyledHandle type="target" position={Position.Left} />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
