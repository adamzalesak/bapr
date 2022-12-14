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

export const getInitialFileNode = (id: string, position: { x: number; y: number }): FileNode => ({
  id,
  type: NodeType.File,
  position,
  data: {
    isParsing: false,
    fileName: undefined,
    settings: {
      rowsLimit: undefined,
    },
  },
});

export const getInitialSortNode = (id: string, position: { x: number; y: number }): SortNode => ({
  id,
  type: NodeType.Sort,
  position,
  data: {
    dataFrame: undefined,
    settings: {
      sortColumn: undefined,
      direction: 'asc',
    },
  },
});

export const getInitialJoinNode = (id: string, position: { x: number; y: number }): JoinNode => ({
  id,
  type: NodeType.Join,
  position,
  data: {
    settings: {
      columnA: undefined,
      columnB: undefined,
      type: JoinType.innerJoin,
    },
  },
});

export const getInitialFilterNode = (
  id: string,
  position: { x: number; y: number },
): FilterNode => ({
  id,
  type: NodeType.Filter,
  position,
  data: {
    settings: {
      columnName: undefined,
      condition: undefined,
      value: '',
    },
  },
});

export const getInitialSliceNode = (id: string, position: { x: number; y: number }): SliceNode => ({
  id,
  type: NodeType.Slice,
  position,
  data: {
    settings: {
      from: undefined,
      to: undefined,
    },
  },
});

export const getInitialSimpleImputerNode = (
  id: string,
  position: { x: number; y: number },
): SimpleImputerNode => ({
  id,
  type: NodeType.SimpleImputer,
  position,
  data: {
    settings: {
      columnName: undefined,
      strategy: undefined,
      value: '',
    },
  },
});

export const getInitialMinMaxScalerNode = (
  id: string,
  position: { x: number; y: number },
): MinMaxScalerNode => ({
  id,
  type: NodeType.MinMaxScaler,
  position,
  data: {
    settings: {
      columnName: undefined,
    },
  },
});

export const getInitialStandardScalerNode = (
  id: string,
  position: { x: number; y: number },
): StandardScalerNode => ({
  id,
  type: NodeType.StandardScaler,
  position,
  data: {
    settings: {
      columnName: undefined,
      withMean: true,
      withStd: true,
    },
  },
});

export const getInitialOneHotEncoderNode = (
  id: string,
  position: { x: number; y: number },
): OneHotEncoderNode => ({
  id,
  type: NodeType.OneHotEncoder,
  position,
  data: {
    settings: {
      columnName: undefined,
      dropFirst: false,
    },
  },
});

export const getInitialRenameColumnsNode = (
  id: string,
  position: { x: number; y: number },
): RenameColumnsNode => ({
  id,
  type: NodeType.RenameColumns,
  position,
  data: {
    settings: {
      columns: [],
    },
  },
});

export const getInitialDropColumnsNode = (
  id: string,
  position: { x: number; y: number },
): DropColumnsNode => ({
  id,
  type: NodeType.DropColumns,
  position,
  data: {
    settings: {
      columns: [],
    },
  },
});
