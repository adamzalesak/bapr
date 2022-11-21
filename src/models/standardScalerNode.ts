import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface StandardScalerNodeSetting {
  column?: string;
  withMean?: boolean;
  withStd?: boolean;
}

export interface StandardScalerNodeAdditionalData {
  settings: StandardScalerNodeSetting;
}

export type StandardScalerNode = DataNode<NodeType.StandardScaler, StandardScalerNodeAdditionalData>;

