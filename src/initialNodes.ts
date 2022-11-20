import { JoinNode, JoinType } from './models/joinNode';
import { SortNode } from './models/sortNode';
import { NodeType } from './models/nodeTypes';
import { FilterNode } from './models/filterNode';
import { FileNode } from './models/fileNode';
import { SliceNode } from './models/sliceNode';
import { SimpleImputerNode } from './models/simpleImputerNode';

export const getInitialFileNode = (id: string): FileNode => ({
  id,
  type: NodeType.File,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      rowsLimit: undefined,
    },
  },
});

export const getInitialSortNode = (id: string): SortNode => ({
  id,
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
});

export const getInitialJoinNode = (id: string): JoinNode => ({
  id,
  type: NodeType.Join,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      columnA: '',
      columnB: '',
      type: JoinType.innerJoin,
    },
  },
});

export const getInitialFilterNode = (id: string): FilterNode => ({
  id,
  type: NodeType.Filter,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      column: undefined,
      condition: undefined,
      value: '',
    },
  },
});

export const getInitialSliceNode = (id: string): SliceNode => ({
  id,
  type: NodeType.Slice,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      from: undefined,
      to: undefined,
    },
  },
});

export const getInitialSimpleImputerNode = (id: string): SimpleImputerNode => ({
  id,
  type: NodeType.SimpleImputer,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      column: undefined,
      strategy: undefined,
      value: undefined,
    },
  },
});
