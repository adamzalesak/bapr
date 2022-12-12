import _ from 'lodash';
import { useEffect } from 'react';
import { NodeProps, Position } from 'reactflow';
import { useTranslation } from 'react-i18next';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { SortNode as SortNodeModel } from '../../models/sortNode';
import { NodeBase } from '../common/NodeBase/NodeBase';
import { StyledHandle } from '../common/NodeBase/styled';

export const SortNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SortNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<SortNodeModel>(id);

  useEffect(() => {
    if (!node) {
      return;
    }

    const settings = node.data.settings;
    const sourceColumnNames = sourceDataFrame?.columns.map((c) => c.name);
    if (!settings.sortColumn || !sourceColumnNames?.includes(settings.sortColumn)) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const nodeDataFrame = sourceDataFrame?.sort(
      node.data.settings.sortColumn,
      node.data.settings.direction,
    );

    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame, node?.data.settings]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.sort.title')}>
      <StyledHandle type="target" position={Position.Left} />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
