import { Edge } from 'react-flow-renderer';
import { atom } from 'recoil';
import { OpenModal } from '../models/modal';
import { DataNode } from '../models/dataNode';
import { JoinNode, JoinType } from '../models/joinNode';
import { SortNode } from '../models/sortNode';
import { NodeType } from '../models/nodeTypes';

export const nodesState = atom<DataNode[]>({
  key: 'nodes',
  default: [
    {
      id: '1',
      type: NodeType.InputFile,
      position: {
        x: -100,
        y: 10,
      },
      data: {},
    },
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
    } as SortNode as DataNode,
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
    } as SortNode as DataNode,
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
    } as JoinNode as DataNode,
    {
      id: '5',
      type: NodeType.InputFile,
      position: {
        x: -200,
        y: 300,
      },
      data: {},
    },
    {
      id: '6',
      type: NodeType.Filter,
      position: {
        x: -500,
        y: 300,
      },
      data: {},
    },
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
