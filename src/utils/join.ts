import { DataFrameRow, DataFrame } from '../classes/DataFrame';
import { join as joinLib, leftJoin as leftJoinLib, fullJoin as fullJoinLib } from 'array-join';

const combineRows = (
  rowA: DataFrameRow | undefined,
  rowB: DataFrameRow | undefined,
  dataAColumns: string[],
  dataBColumns: string[],
): DataFrameRow => {
  // keep all columns in object
  const a = rowA ?? Object.fromEntries(dataAColumns.map((key) => [key, null]));
  const b = rowB ?? Object.fromEntries(dataBColumns.map((key) => [key, null]));

  return { ...a, ...b };
};

export const innerJoin = (dataA: DataFrame, dataB: DataFrame, keyA: string, keyB: string) => {
  return (
    joinLib(
      dataA.rows,
      dataB.rows,
      (rowA) => rowA[keyA],
      (rowB) => rowB[keyB],
      (rowA, rowB) =>
        combineRows(
          rowA,
          rowB,
          dataA.columns.map((c) => c.name),
          dataB.columns.map((c) => c.name),
        ),
    ) || []
  );
};

export const leftOuterJoin = (dataA: DataFrame, dataB: DataFrame, keyA: string, keyB: string) =>
  leftJoinLib(
    dataA.rows,
    dataB.rows,
    (rowA) => rowA[keyA],
    (rowB) => rowB[keyB],
    (rowA, rowB) =>
      combineRows(
        rowA,
        rowB,
        dataA.columns.map((c) => c.name),
        dataB.columns.map((c) => c.name),
      ),
  ) || [];

export const rightOuterJoin = (dataA: DataFrame, dataB: DataFrame, keyA: string, keyB: string) =>
  leftOuterJoin(dataB, dataA, keyB, keyA);

export const fullOuterJoin = (dataA: DataFrame, dataB: DataFrame, keyA: string, keyB: string) =>
  fullJoinLib(
    dataA.rows,
    dataB.rows,
    (rowA) => rowA[keyA],
    (rowB) => rowB[keyB],
    (rowA, rowB) =>
      combineRows(
        rowA,
        rowB,
        dataA.columns.map((c) => c.name),
        dataB.columns.map((c) => c.name),
      ),
  ) || [];

