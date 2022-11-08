import { useEffect, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { useNode, useUpdateNodeData } from '../../hooks/nodes';
import { NodeState } from '../../models/dataNode';
import { JoinNode as JoinNodeModel, JoinNodeHandle } from '../../models/joinNode';
import { edgesState, nodesState } from '../../store/atoms';
import { NodeBase } from './NodeBase';

export const JoinNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as JoinNodeModel | undefined;
  const updateNodeData = useUpdateNodeData<JoinNodeModel>(id);
  const nodes = useRecoilValue(nodesState);
  const edges = useRecoilValue(edgesState);

  const sourceDataFrameA = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle === JoinNodeHandle.A);
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data?.dataFrame;
  }, [edges, id, nodes]);

  const sourceDataFrameB = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle === JoinNodeHandle.B);
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data?.dataFrame;
  }, [edges, id, nodes]);

  useEffect(() => {
    if (!node) return;

    if (
      !sourceDataFrameA ||
      !sourceDataFrameB ||
      !node?.data?.settings?.columnA ||
      !node.data.settings?.columnB
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
  }, [sourceDataFrameA, sourceDataFrameB, node?.data?.settings]);

  const nodeState = node?.data?.dataFrame
    ? NodeState.Done
    : sourceDataFrameA && sourceDataFrameB
    ? NodeState.InvalidSettings
    : NodeState.NoSource;

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.join.title')} state={nodeState}>
      <Handle
        type="target"
        id={JoinNodeHandle.A}
        position={Position.Left}
        style={{ marginTop: '-0.5rem' }}
      />
      <Handle
        type="target"
        id={JoinNodeHandle.B}
        position={Position.Left}
        style={{ marginTop: '0.5rem' }}
      />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
