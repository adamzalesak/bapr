import { DataNode } from "./node";

export interface SortNodeSetting {
  sortColumn: string;
  direction?: 'asc' | 'desc';
}

export interface SortNode extends DataNode {
  settings: SortNodeSetting;
}
