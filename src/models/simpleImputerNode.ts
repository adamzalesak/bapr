import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export enum SimpleImputerNumberStrategy {
  Mean = 'MEAN',
  Median = 'MEDIAN',
  MostFrequent = 'MOST_FREQUENT_NUMBER',
  Constant = 'CONSTANT_NUMBER',
}

export enum SimpleImputerStringStrategy {
  MostFrequent = 'MOST_FREQUENT_STRING',
  Constant = 'CONSTANT_STRING',
}

export interface SimpleImputerNodeSetting {
  column?: string;
  strategy?: SimpleImputerNumberStrategy | SimpleImputerStringStrategy | null;
  value?: string;
}

export interface SimpleImputerNodeAdditionalData {
  settings: SimpleImputerNodeSetting;
}

export type SimpleImputerNode = DataNode<NodeType.SimpleImputer, SimpleImputerNodeAdditionalData>;

