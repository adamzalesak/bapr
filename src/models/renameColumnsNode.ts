import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface RenameColumnsNodeSetting {
  columns: { oldColumnName: string; newColumnName: string }[];
}

export interface RenameColumnsNodeAdditionalData {
  settings: RenameColumnsNodeSetting;
}

export type RenameColumnsNode = DataNode<NodeType.RenameColumns, RenameColumnsNodeAdditionalData>;

