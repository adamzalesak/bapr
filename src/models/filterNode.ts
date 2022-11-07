import { JoinType } from './joinNode';
import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface FilterNodeSetting {
  type: JoinType;
  columnA: string;
  columnB: string;
}

export interface FilterNodeAdditionalData {
  settings: FilterNodeSetting;
}

export type FilterNode = DataNode<NodeType.Filter, FilterNodeAdditionalData>;
