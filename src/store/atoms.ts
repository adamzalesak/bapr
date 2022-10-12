import { fromCSV } from 'data-forge';
import { Edge } from 'react-flow-renderer';
import { atom } from 'recoil';
import { OpenModal } from '../models/modal';
import { DataNode } from '../models/node';
import { NodeType } from '../models/nodeTypes';

export const nodesState = atom<DataNode[]>({
  key: 'nodes',
  default: [
    {
      id: '1',
      type: NodeType.InputFile,
      name: 'CSV File',
      position: {
        x: -100,
        y: 10,
      },
      data: undefined,
    },
    {
      id: '2',
      type: NodeType.Sort,
      name: 'Sort',
      position: {
        x: 40,
        y: 50,
      },
      data: undefined,
    },
    {
      id: '3',
      type: NodeType.Sort,
      name: 'Sort',
      position: {
        x: 40,
        y: -60,
      },
      data: undefined,
    },
    {
      id: '4',
      type: NodeType.Join,
      name: 'Merge',
      position: {
        x: 40,
        y: 160,
      },
      data: undefined,
    },
    {
      id: '5',
      type: NodeType.InputFile,
      name: 'CSV File',
      position: {
        x: -200,
        y: 300,
      },
      data: undefined,
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

