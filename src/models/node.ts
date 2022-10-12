import { Node } from 'react-flow-renderer';
import { DataFrame } from '../classes/DataFrame';
import { NodeType } from './nodeTypes';

export interface DataNode extends Node<DataFrame | undefined> {
  id: string;
  type: NodeType;
  name: string;
  data: DataFrame | undefined;
}

export interface FileNode extends DataNode {
  fileName?: string;
}

export interface SortNodeSetting {
  sortColumn: string;
  desc?: boolean;
}

export interface SortNode extends DataNode {
  settings: SortNodeSetting;
}

export interface JoinNodeSetting {
  type: 'join' | 'joinOuter' | 'joinOuterLeft' | 'joinOuterRight';
  columnA: string;
  columnB: string;
}

export interface JoinNode extends DataNode {
  settings: JoinNodeSetting;
}

