import { Edge } from 'reactflow';
import { atom } from 'recoil';
import { DataNode } from '../models/dataNode';
import { FileNode } from '../models/fileNode';
import { OpenModal } from '../models/modal';
import { NodeType } from '../models/nodeTypes';

export const nodesState = atom<DataNode[]>({
  key: 'nodes',
  default: [
    {
      id: 'init',
      type: NodeType.File,
      position: {
        x: -200,
        y: 0,
      },
      data: {
        settings: {
          rowsLimit: undefined,
        },
      },
    } as FileNode,
  ],
});

export const edgesState = atom<Edge[]>({
  key: 'edges',
  default: [],
});

export const openModalState = atom<OpenModal | null>({
  key: 'openModal',
  default: null,
});

export const nodeCountState = atom<number>({
  key: 'nodeCount',
  default: 0,
});
