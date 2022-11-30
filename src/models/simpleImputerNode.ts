import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export const simpleImputerNumberStrategies = [
  'MEAN',
  'MEDIAN',
  'MOST_FREQUENT',
  'CONSTANT',
] as const;
export const simpleImputerStringStrategies = ['MOST_FREQUENT', 'CONSTANT'] as const;

export type SimpleImputerStrategy =
  | typeof simpleImputerNumberStrategies[number]
  | typeof simpleImputerStringStrategies[number];

export interface SimpleImputerNodeSetting {
  column?: string;
  strategy?: SimpleImputerStrategy;
  value: string;
}

export interface SimpleImputerNodeAdditionalData {
  settings: SimpleImputerNodeSetting;
}

export type SimpleImputerNode = DataNode<NodeType.SimpleImputer, SimpleImputerNodeAdditionalData>;

