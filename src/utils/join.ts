import { DataFrameData, DataFrameRow } from '../classes/DataFrame';
import { join as joinLib, leftJoin as leftJoinLib, fullJoin as fullJoinLib } from 'array-join';

const combineRows = (
  rowA: DataFrameRow | undefined,
  rowB: DataFrameRow | undefined,
  dataAColumns: string[],
  dataBColumns: string[],
): DataFrameRow => {
  const a = rowA ?? Object.fromEntries(dataAColumns.map((key) => [key, null]));
  const b = rowB ?? Object.fromEntries(dataBColumns.map((key) => [key, null]));

  return { ...a, ...b };
};

export const innerJoin = (
  dataA: DataFrameData,
  dataB: DataFrameData,
  keyA: string,
  keyB: string,
) => {
  return (
    joinLib(
      dataA,
      dataB,
      (rowA) => rowA[keyA],
      (rowB) => rowB[keyB],
      (rowA, rowB) => combineRows(rowA, rowB, Object.keys(dataA[0]), Object.keys(dataB[0])),
    ) || []
  );
};

export const leftOuterJoin = (
  dataA: DataFrameData,
  dataB: DataFrameData,
  keyA: string,
  keyB: string,
) =>
  leftJoinLib(
    dataA,
    dataB,
    (rowA) => rowA[keyA],
    (rowB) => rowB[keyB],
    (rowA, rowB) => combineRows(rowA, rowB, Object.keys(dataA[0]), Object.keys(dataB[0])),
  ) || [];

export const rightOuterJoin = (
  dataA: DataFrameData,
  dataB: DataFrameData,
  keyA: string,
  keyB: string,
) => leftOuterJoin(dataB, dataA, keyA, keyB);

export const fullOuterJoin = (
  dataA: DataFrameData,
  dataB: DataFrameData,
  keyA: string,
  keyB: string,
) =>
  fullJoinLib(
    dataA,
    dataB,
    (rowA) => rowA[keyA],
    (rowB) => rowB[keyB],
    (rowA, rowB) => combineRows(rowA, rowB, Object.keys(dataA[0]), Object.keys(dataB[0])),
  ) || [];

