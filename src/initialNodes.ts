import { JoinNode, JoinType } from './models/joinNode';
import { SortNode } from './models/sortNode';
import { NodeType } from './models/nodeTypes';
import { FilterNode } from './models/filterNode';
import { FileNode } from './models/fileNode';
import { SliceNode } from './models/sliceNode';
import { SimpleImputerNode } from './models/simpleImputerNode';
import { StandardScalerNode } from './models/standardScalerNode';
import { MinMaxScalerNode } from './models/minMaxScalerNode';
import { OneHotEncoderNode } from './models/oneHotEncoderNode';
import { RenameColumnsNode } from './models/renameColumnsNode';
import { DropColumnsNode } from './models/dropColumnsNode';

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
      columnName: undefined,
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
      columnName: undefined,
      strategy: undefined,
      value: '',
    },
  },
});

export const getInitialMinMaxScalerNode = (id: string): MinMaxScalerNode => ({
  id,
  type: NodeType.MinMaxScaler,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      columnName: undefined,
    },
  },
});

export const getInitialStandardScalerNode = (id: string): StandardScalerNode => ({
  id,
  type: NodeType.StandardScaler,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      columnName: undefined,
      withMean: true,
      withStd: true,
    },
  },
});

export const getInitialOneHotEncoderNode = (id: string): OneHotEncoderNode => ({
  id,
  type: NodeType.OneHotEncoder,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      columnName: undefined,
      dropFirst: false,
    },
  },
});

export const getInitialRenameColumnsNode = (id: string): RenameColumnsNode => ({
  id,
  type: NodeType.RenameColumns,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      columns: [{ oldColumnName: '', newColumnName: '' }],
    },
  },
});

export const getInitialDropColumnsNode = (id: string): DropColumnsNode => ({
  id,
  type: NodeType.DropColumns,
  position: {
    x: 0,
    y: 0,
  },
  data: {
    settings: {
      columns: [{ name: '' }],
    },
  },
});
