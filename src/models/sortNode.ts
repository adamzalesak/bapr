import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface SortNodeSetting {
  sortColumn: string;
  direction?: 'asc' | 'desc';
}

export interface SortNodeAdditionalData {
  settings: SortNodeSetting;
}

export type SortNode = DataNode<NodeType.Sort, SortNodeAdditionalData>;
