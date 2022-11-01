import { JoinType } from "./joinNode";
import { DataNode } from "./node";

export interface JoinNodeSetting {
    type: JoinType;
    columnA: string;
    columnB: string;
  }
  
  export interface JoinNode extends DataNode {
    settings: JoinNodeSetting;
  }
  
  