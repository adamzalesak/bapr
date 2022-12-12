import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { useNode, useSourceDataFrame, useUpdateNodeData } from '../../hooks/node';
import { SliceNode as SliceNodeModel } from '../../models/sliceNode';
import { NodeBase } from '../common/NodeBase/NodeBase';
import { StyledHandle } from '../common/NodeBase/styled';

export const SliceNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SliceNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);
  const updateNodeData = useUpdateNodeData<SliceNodeModel>(id);

  useEffect(() => {
    if (!node) {
      return;
    }

    const nodeDataFrame =
      node.data.settings.from && node.data.settings.to
        ? sourceDataFrame?.slice(node.data.settings.from, node.data.settings.to)
        : undefined;

    updateNodeData('dataFrame', nodeDataFrame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceDataFrame, node?.data.settings]);

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.slice.title')}>
      <StyledHandle type="target" position={Position.Left} />
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};

