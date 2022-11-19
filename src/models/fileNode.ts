import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface FileNodeSettings {
  rowsLimit?: number;
}

export interface FileNodeAdditionalData {
  fileName?: string;
  settings: FileNodeSettings;
}

export type FileNode = DataNode<NodeType.File, FileNodeAdditionalData>;
