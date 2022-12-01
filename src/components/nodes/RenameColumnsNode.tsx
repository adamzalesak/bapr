import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { RenameColumnsNode as RenameColumnsNodeModel } from '../../models/renameColumnsNode';
import { NodeBase } from './NodeBase/NodeBase';
import { StyledHandle } from './NodeBase/styled';

export const RenameColumnsNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as RenameColumnsNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<RenameColumnsNodeModel>(id);

  // update node data
  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    const columns = settings.columns.filter((c) => c.oldColumnName && c.newColumnName);

    if (!columns.length) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const nodeDataFrame = sourceDataFrame?.renameColumns(
      columns.map((c) => c.oldColumnName),
      columns.map((c) => c.newColumnName),
    );
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
    if (!settings.columns.every((c) => sourceColumnNames?.includes(c.oldColumnName))) {
      updateNodeData('settings', { ...settings, columns: [] });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.renameColumns.title')}>
      <StyledHandle type="target" position={Position.Left} />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
