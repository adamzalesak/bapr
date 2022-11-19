import { Node } from 'reactflow';
import { DataFrame } from '../classes/DataFrame';
import { NodeType } from './nodeTypes';

export type NodeData<TAdditionalData> = {
  dataFrame?: DataFrame;
} & TAdditionalData;

export interface DataNode<TNodeType extends NodeType = NodeType, TAdditionalData = unknown>
  extends Node<NodeData<TAdditionalData>> {
  type: TNodeType;
}

export enum NodeState {
  NoSource = 'NO_SOURCE',
  InvalidSettings = 'INVALID_SETTINGS',
  Done = 'DONE',
}
