import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export enum FilterNumberCondition {
  isNotNull = 'NUMBER_IS_NOT_NULL',
  lessThan = 'LESS_THAN',
  lessThanOrEqual = 'LESS_THAN_OR_EQUAL',
  equals = 'NUMBER_EQUALS',
  notEquals = 'NUMBER_NOT_EQUALS',
  greaterThanOrEqual = 'GREATER_THAN_OR_EQUAL',
  greaterThan = 'GREATER_THAN',
}

export enum FilterStringCondition {
  equals = 'STRING_EQUALS',
  notEquals = 'STRING_NOT_EQUALS',
  isNotNull = 'STRING_IS_NOT_NULL',

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
  value: string;
}

export interface FilterNodeAdditionalData {
  settings: FilterNodeSetting;
}

export type FilterNode = DataNode<NodeType.Filter, FilterNodeAdditionalData>;
