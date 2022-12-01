import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface DropColumnsNodeSetting {
  columns: { name: string }[];
}

export interface DropColumnsNodeAdditionalData {
  settings: DropColumnsNodeSetting;
}

export type DropColumnsNode = DataNode<NodeType.DropColumns, DropColumnsNodeAdditionalData>;

