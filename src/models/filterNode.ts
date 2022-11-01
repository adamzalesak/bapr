import { DataNode } from "./node";

export interface JoinNodeSetting {
    type: 'join' | 'joinOuter' | 'joinOuterLeft' | 'joinOuterRight';
    columnA: string;
    columnB: string;
  }
  
  export interface JoinNode extends DataNode {
    settings: JoinNodeSetting;
  }
  
  