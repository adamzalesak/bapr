import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { NodeState } from '../../models/dataNode';
import { JoinNode as JoinNodeModel, JoinNodeHandle } from '../../models/joinNode';
import { NodeBase } from '../common/NodeBase/NodeBase';
import { StyledHandle } from '../common/NodeBase/styled';

export const JoinNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as JoinNodeModel | undefined;
  const sourceDataFrameA = useSourceDataFrame(id, JoinNodeHandle.A);
  const sourceDataFrameB = useSourceDataFrame(id, JoinNodeHandle.B);
  const updateNodeData = useUpdateNodeData<JoinNodeModel>(id);

  useEffect(() => {
    if (!node) {
      return;
    }

    if (
      !sourceDataFrameA ||
      !sourceDataFrameB ||
      !node.data.settings.columnA ||
      !node.data.settings.columnB
    ) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const sourceColumnNamesA = sourceDataFrameA.columns.map((c) => c.name);
    const sourceColumnNamesB = sourceDataFrameB.columns.map((c) => c.name);
    if (
      !sourceColumnNamesA.includes(node.data.settings.columnA) ||
      !sourceColumnNamesB.includes(node.data.settings.columnB)
    ) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    const nodeDataFrame = sourceDataFrameA.join(
      sourceDataFrameB,
      node.data.settings.columnA,
      node.data.settings.columnB,
      node.data.settings.type,
    );
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrameA, sourceDataFrameB, node?.data.settings]);

  const nodeState = node?.data.dataFrame
    ? NodeState.Processed
    : sourceDataFrameA && sourceDataFrameB
    ? NodeState.InvalidSettings
    : NodeState.NoSource;

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.join.title')} state={nodeState}>
      <StyledHandle
        type="target"
        id={JoinNodeHandle.A}
        position={Position.Left}
        style={{ marginTop: '-0.5rem' }}
      />
      <StyledHandle
        type="target"
        id={JoinNodeHandle.B}
        position={Position.Left}
        style={{ marginTop: '0.5rem' }}
      />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
