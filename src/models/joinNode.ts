import { DataNode } from './node';

export interface JoinNodeSetting {
  type: JoinType;
  columnA: string;
  columnB: string;
}

export interface JoinNode extends DataNode {
  settings: JoinNodeSetting;
}

export enum JoinType {
  innerJoin = 'INNER_JOIN',
  leftOuterJoin = 'LEFT_OUTER_JOIN',
  rightOuterJoin = 'RIGHT_OUTER_JOIN',
  fullOuterJoin = 'FULL_OUTER_JOIN',
}

