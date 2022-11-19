import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface SliceNodeSetting {
  from?: number;
  to?: number;
}

export interface SliceNodeAdditionalData {
  settings: SliceNodeSetting;
}

export type SliceNode = DataNode<NodeType.Slice, SliceNodeAdditionalData>;

