import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { NodeState } from '../../models/dataNode';
import { JoinNode as JoinNodeModel, JoinNodeHandle } from '../../models/joinNode';
import { NodeBase } from './NodeBase';

export const JoinNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as JoinNodeModel | undefined;
  const sourceDataFrameA = useSourceDataFrame(id, JoinNodeHandle.A);
  const sourceDataFrameB = useSourceDataFrame(id, JoinNodeHandle.B);
  const updateNodeData = useUpdateNodeData<JoinNodeModel>(id);

  useEffect(() => {
    if (!node) return;

    if (
      !sourceDataFrameA ||
      !sourceDataFrameB ||
      !node.data.settings.columnA ||
      !node.data.settings.columnB
    ) {
      updateNodeData('dataFrame', undefined);
      return;
    }

    // TODO: handle same column names

    const nodeDataFrame = sourceDataFrameA.join(
      sourceDataFrameB,
      node.data.settings.columnA,
      node.data.settings.columnB,
      node.data.settings.type,
    );
    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrameA, sourceDataFrameB, node?.data.settings]);

  // // keep settings valid if sourceData changes
  useEffect(() => {
    if (!node) return;

    const columnA = node
      ? sourceDataFrameA?.columns.map((c) => c.name).includes(node.data.settings.columnA)
        ? node?.data.settings.columnA
        : ''
      : '';

    const columnB = node
      ? sourceDataFrameB?.columns.map((c) => c.name).includes(node.data.settings.columnB)
        ? node?.data.settings.columnB
        : ''
      : '';

    updateNodeData('settings', { ...node?.data.settings, columnA, columnB });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrameA, sourceDataFrameB]);

  const nodeState = node?.data.dataFrame
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
