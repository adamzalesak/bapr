import { Handle, NodeProps, Position } from 'react-flow-renderer';
import { useTranslation } from 'react-i18next';
import { NodeBase } from './NodeBase';

export const FileNode = ({ id }: NodeProps) => {
  const { t } = useTranslation();

  return (
    <>
      <NodeBase nodeId={id} nodeTypeName={t('nodes.file.title')}>
        <Handle type="source" position={Position.Right} />
      </NodeBase>
    </>
  );
};
