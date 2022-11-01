import { DataFrame } from '../classes/DataFrame';
import { NodeType } from './nodeTypes';

export interface DataNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: DataFrame | undefined;
  // settings: TSettings;
}

export enum NodeState {
  NoSource = 'NO_SOURCE',
  InvalidSettings = 'INVALID_SETTINGS',
  Done = 'DONE',
}

