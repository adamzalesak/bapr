import { useTranslation } from 'react-i18next';
import { NodeProps, Position } from 'reactflow';
import { NodeBase } from './NodeBase/NodeBase';
import { StyledHandle } from './NodeBase/styled';

export const FileNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  return (
    <NodeBase nodeId={id} nodeTypeName={t('nodes.file.title')}>
      <StyledHandle type="source" position={Position.Right} />
    </NodeBase>
  );
};
