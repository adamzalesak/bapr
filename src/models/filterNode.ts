import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export const filterNumberConditions = [
  'IS_NOT_NULL',
  'EQUAL',
  'NOT_EQUAL',

  'LESS_THAN',
  'LESS_THAN_OR_EQUAL',
  'GREATER_THAN_OR_EQUAL',
  'GREATER_THAN',
] as const;

export const filterStringConditions = [
  'IS_NOT_NULL',
  'EQUAL',
  'NOT_EQUAL',

  'CONTAINS',
  'NOT_CONTAINS',
  'STARTS_WITH',
  'NOT_STARTS_WITH',
  'ENDS_WITH',
  'NOT_ENDS_WITH',
  'MATCHES_REGEX',
] as const;

export type FilterCondition =
  | typeof filterNumberConditions[number]
  | typeof filterStringConditions[number];

export interface FilterNodeSetting {
  columnName?: string;
  condition?: FilterCondition;
  value: string;
}

export interface FilterNodeAdditionalData {
  settings: FilterNodeSetting;
}

export type FilterNode = DataNode<NodeType.Filter, FilterNodeAdditionalData>;
