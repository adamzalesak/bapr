import { useEffect, useMemo } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useRecoilState, useRecoilValue } from 'recoil';
import { useNode } from '../../hooks/nodes';
import { JoinNode as JoinNodeModel } from '../../models/joinNode';
import { edgesState, nodesState } from '../../store/atoms';
import * as _ from 'lodash';
import { NodeBase } from './NodeBase';
import { useTranslation } from 'react-i18next';
import { NodeState } from '../../models/dataNode';

export const JoinNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as JoinNodeModel | undefined;

  const edges = useRecoilValue(edgesState);
  const [nodes, setNodes] = useRecoilState(nodesState);

  const sourceDataFrameA = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle == 'a');
    const sourceNodeId = edge?.source;
    const sourceNode = nodes.find((node) => node.id === sourceNodeId);

    return sourceNode?.data?.dataFrame;
  }, [edges, id, nodes]);

  const sourceDataFrameB = useMemo(() => {
    const edge = edges.find((edge) => edge.target === id && edge.targetHandle == 'b');
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
      setNodes((nodes) => [
        ...nodes.filter((n) => n.id !== id),
        { ...node, data: { ...node.data, dataFrame: undefined } },
      ]);

      return;
    }

    const nodeData = sourceDataFrameA.join(
      sourceDataFrameB,
      node.data.settings.columnA,
      node.data.settings.columnB,
      node.data.settings.type,
    );

    setNodes((nodes) => [
      ...nodes.filter((n) => n.id !== id),
      { ...node, data: { ...node.data, dataFrame: nodeData } },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrameA, sourceDataFrameB, node?.data?.settings]);

  return (
    <NodeBase
      nodeId={id}
      nodeTypeName={t('nodes.join.title')}
      state={
        node?.data?.dataFrame
          ? NodeState.Done
          : sourceDataFrameA && sourceDataFrameB
          ? NodeState.InvalidSettings
          : NodeState.NoSource
      }
    >
      <Handle type="target" id="a" position={Position.Left} style={{ marginTop: '-0.5rem' }} />
      <Handle type="target" id="b" position={Position.Left} style={{ marginTop: '0.5rem' }} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
