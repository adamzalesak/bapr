import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface MinMaxScalerNodeSetting {
  column?: string;
}

export interface MinMaxScalerNodeAdditionalData {
  settings: MinMaxScalerNodeSetting;
}

export type MinMaxScalerNode = DataNode<NodeType.MinMaxScaler, MinMaxScalerNodeAdditionalData>;

