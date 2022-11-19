import { Edge } from 'reactflow';
import { atom } from 'recoil';
import { OpenModal } from '../models/modal';
import { DataNode } from '../models/dataNode';
import { JoinNode, JoinType } from '../models/joinNode';
import { SortNode } from '../models/sortNode';
import { NodeType } from '../models/nodeTypes';
import { FilterNode } from '../models/filterNode';
import { getInitialFileNode } from '../initialNodes';

export const nodesState = atom<DataNode[]>({
  key: 'nodes',
  default: [
    getInitialFileNode('1'),
    {
      id: '2',
      type: NodeType.Sort,
      position: {
        x: 40,
        y: 50,
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
      id: '3',
      type: NodeType.Sort,
      position: {
        x: 40,
        y: -60,
      },
      data: {
        settings: {
          sortColumn: '',
          direction: 'asc',
        },
      },
    } as SortNode,
    {
      id: '4',
      type: NodeType.Join,
      position: {
        x: 40,
        y: 160,
      },
      data: {
        settings: {
          columnA: '',
          columnB: '',
          type: JoinType.innerJoin,
        },
      },
    } as JoinNode,
    {
      id: '5',
      type: NodeType.File,
      position: {
        x: -200,
        y: 300,
      },
      data: {
        settings: {
          rowsLimit: undefined,
        },
      },
    },
    {
      id: '6',
      type: NodeType.Filter,
      position: {
        x: -500,
        y: 300,
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

// TODO: default 100 -> 0
export const nodeCountState = atom<number>({
  key: 'nodeCount',
  default: 100,
});
