import _ from 'lodash';
import { useEffect } from 'react';
import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { useSetRecoilState } from 'recoil';
import { useNode, useSourceDataFrame } from '../../hooks/nodes';
import { SortNode as SortNodeModel } from '../../models/sortNode';
import { nodesState } from '../../store/atoms';
import { NodeBase } from './NodeBase';

export const FilterNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  const node = useNode(id) as SortNodeModel | undefined;
  const sourceDataFrame = useSourceDataFrame(id);

  if (!node) return null;

  return (
    <NodeBase nodeId={node.id} nodeTypeName={t('nodes.filter.title')}>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />
    </NodeBase>
  );
};
