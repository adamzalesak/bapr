import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface JoinNodeSetting {
  type: JoinType;
  columnA: string;
  columnB: string;
}

export interface JoinNodeAdditionalData {
  settings: JoinNodeSetting;
}

export type JoinNode = DataNode<NodeType.Join, JoinNodeAdditionalData>;

export enum JoinType {
  innerJoin = 'INNER_JOIN',
  leftOuterJoin = 'LEFT_OUTER_JOIN',
  rightOuterJoin = 'RIGHT_OUTER_JOIN',
  fullOuterJoin = 'FULL_OUTER_JOIN',
}

export enum JoinNodeHandle {
  A = 'A',
  B = 'B',
}
