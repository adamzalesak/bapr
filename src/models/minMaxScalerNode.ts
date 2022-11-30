import { DataNode } from './dataNode';
import { NodeType } from './nodeTypes';

export interface MinMaxScalerNodeSetting {
  columnName?: string;
}

export interface MinMaxScalerNodeAdditionalData {
  settings: MinMaxScalerNodeSetting;
}

export type MinMaxScalerNode = DataNode<NodeType.MinMaxScaler, MinMaxScalerNodeAdditionalData>;

