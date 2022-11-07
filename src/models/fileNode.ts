import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface FileNodeAdditionalData {
  fileName?: string;
}

export type FileNode = DataNode<NodeType.Filter, FileNodeAdditionalData>;
