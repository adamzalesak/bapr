import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export enum FilterNumberCondition {
  equals = 'EQUALS',
  notEquals = 'NOT_EQUALS',
  isNotNull = 'IS_NOT_NULL',

  lessThan = 'LESS_THAN',
  lessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  greaterThan = 'GREATER_THAN',
  greaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
}

export enum FilterStringCondition {
  equals = 'EQUALS',
  notEquals = 'NOT_EQUALS',
  isNotNull = 'IS_NOT_NULL',

  contains = 'CONTAINS',
  notContains = 'NOT_CONTAINS',
  startsWith = 'STARTS_WITH',
  notStartsWith = 'NOT_STARTS_WITH',
  endsWith = 'ENDS_WITH',
  notEndsWith = 'NOT_ENDS_WITH',
  matchesRegex = 'MATCHES_REGEX',
}

export interface FilterNodeSetting {
  column?: string;
  condition?: FilterNumberCondition | FilterStringCondition;
  value: string | number;
}

export interface FilterNodeAdditionalData {
  settings: FilterNodeSetting;
}

export type FilterNode = DataNode<NodeType.Filter, FilterNodeAdditionalData>;
