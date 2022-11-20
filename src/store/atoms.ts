import { Edge } from 'reactflow';
import { atom } from 'recoil';
import { DataNode } from '../models/dataNode';
import { FileNode } from '../models/fileNode';
import { FilterNode } from '../models/filterNode';
import { OpenModal } from '../models/modal';
import { NodeType } from '../models/nodeTypes';
import { SortNode } from '../models/sortNode';

export const nodesState = atom<DataNode[]>({
  key: 'nodes',
  default: [
    {
      id: '100',
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
    {
      id: '101',
      type: NodeType.Sort,
      position: {
        x: 0,
        y: 0,
      },
      data: {
        dataFrame: undefined,
        settings: {
          sortColumn: '',
          direction: 'asc',
        },
      },
    } as SortNode,
    {
      id: '102',
      type: NodeType.Filter,
      position: {
        x: 200,
        y: 0,
      },
      data: {
        settings: {
          column: '',
          // condition: '',
          value: '',
        },
      },
    } as FilterNode,
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
