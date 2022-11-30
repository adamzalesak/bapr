import _ from 'lodash';
import { FilterCondition } from '../models/filterNode';
import { JoinType } from '../models/joinNode';
import { SimpleImputerStrategy } from '../models/simpleImputerNode';
import {
  fullOuterJoin,
  innerJoin,
  leftOuterJoin as leftOuterJoin,
  rightOuterJoin as rightOuterJoin,
} from './join';
import { parseCSVFile, saveDataToCSVFile } from './parse';

export type DataFrameRow = { [key: string]: any };

export interface Column {
  name: string;
  type: 'string' | 'number';
}

export class DataFrame {
  private _rows: DataFrameRow[];
  private _columns: Column[];

  constructor(data?: DataFrameRow[], columns?: Column[]) {
    this._rows = data || [];
    this._columns = columns || [];
  }

  static fromCSVFile = async (file: File, rowsLimit?: number): Promise<DataFrame> => {
    return parseCSVFile(file, rowsLimit);
  };

  toCSVFile = () => {
    saveDataToCSVFile(this);
  };

  get columns() {
    return this._columns;
  }

  get rows() {
    return this._rows;
  }

  get count() {
    return this._rows.length;
  }

  slice = (from: number, to: number) => {
    const sliced = this._rows.slice(from - 1, to);
    return new DataFrame(sliced, this._columns);
  };

  sort = (by: string, direction?: 'asc' | 'desc') => {
    const sorted = _.orderBy(this._rows, by, direction);
    return new DataFrame(sorted, this._columns);
  };

  join = (dataFrameB: DataFrame, keyA: string, keyB: string, type: JoinType) => {
    let result: DataFrameRow[];

    // rename all common columns in this and dataFrameB to avoid conflicts in join
    const commonColumns = this._columns
      .map((c) => c.name)
      .filter((c) => dataFrameB.columns.map((c) => c.name).includes(c));
    const renamedColumnsA = commonColumns.map((c) => `${c}_1`);
    const renamedColumnsB = commonColumns.map((c) => `${c}_2`);
    const renamedDataFrameA = this.renameColumns(commonColumns, renamedColumnsA);
    const renamedDataFrameB = dataFrameB.renameColumns(commonColumns, renamedColumnsB);

    switch (type) {
      case JoinType.innerJoin: {
        result = innerJoin(renamedDataFrameA, renamedDataFrameB, keyA, keyB);
        break;
      }
      case JoinType.leftOuterJoin: {
        result = leftOuterJoin(renamedDataFrameA, renamedDataFrameB, keyA, keyB);
        break;
      }
      case JoinType.rightOuterJoin: {
        result = rightOuterJoin(renamedDataFrameA, renamedDataFrameB, keyA, keyB);
        break;
      }
      case JoinType.fullOuterJoin: {
        result = fullOuterJoin(renamedDataFrameA, renamedDataFrameB, keyA, keyB);
        break;
      }
    }

    return new DataFrame(result, [...renamedDataFrameA._columns, ...renamedDataFrameB.columns]);
  };

  filter = (column: string, condition: FilterCondition, value?: string) => {
    let result: DataFrameRow[];
    const columnType = this._columns.find((c) => c.name === column)?.type;

    switch (condition) {
      // common for string and number columns
      case 'IS_NOT_NULL': {
        result = this.rows?.filter((row) => row[column] !== null);
        break;
      }
      case 'EQUAL': {
        if (columnType === 'string') {
          result = this.rows?.filter((row) => row[column] === value);
        } else {
          result = this.rows?.filter((row) => row[column] === Number(value));
        }
        break;
      }
      case 'NOT_EQUAL': {
        if (columnType === 'string') {
          result = this.rows?.filter((row) => row[column] !== value);
        } else {
          result = this.rows?.filter((row) => row[column] !== Number(value));
        }
        break;
      }

      // number column
      case 'GREATER_THAN': {
        result = this.rows?.filter((row) => row[column] > Number(value));
        break;
      }
      case 'GREATER_THAN_OR_EQUAL': {
        result = this.rows?.filter((row) => row[column] >= Number(value));
        break;
      }
      case 'LESS_THAN': {
        result = this.rows?.filter((row) => row[column] < Number(value));

        break;
      }
      case 'LESS_THAN_OR_EQUAL': {
        result = this.rows?.filter((row) => row[column] <= Number(value));
        break;
      }

      // string column
      case 'CONTAINS': {
        result = this.rows?.filter((row) => row[column].includes(value));
        break;
      }
      case 'NOT_CONTAINS': {
        result = this.rows?.filter((row) => !row[column].includes(value));
        break;
      }
      case 'STARTS_WITH': {
        result = this.rows?.filter((row) => row[column].startsWith(value));
        break;
      }
      case 'NOT_STARTS_WITH': {
        result = this.rows?.filter((row) => !row[column].startsWith(value));
        break;
      }
      case 'ENDS_WITH': {
        result = this.rows?.filter((row) => row[column].endsWith(value));
        break;
      }
      case 'NOT_ENDS_WITH': {
        result = this.rows?.filter((row) => !row[column].endsWith(value));
        break;
      }
      default: {
        result = this.rows;
        break;
      }
    }

    return new DataFrame(result, this._columns);
  };

  simpleImputer = (column: string, strategy: SimpleImputerStrategy, value?: string) => {
    let valueToImpute: string | number | undefined = value;

    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[column] !== null)
      .map((row) => row[column]);
    const countWithoutNulls = valuesWithoutNulls?.length;

    const columnType = this.columns.find((col) => col.name === column)?.type;

    switch (strategy) {
      case 'MEAN': {
        valueToImpute = _.mean(valuesWithoutNulls);
        break;
      }
      case 'MEDIAN': {
        const sorted = _.orderBy(valuesWithoutNulls);
        const middle = Math.floor(countWithoutNulls / 2);
        valueToImpute =
          countWithoutNulls % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
        break;
      }
      case 'MOST_FREQUENT': {
        valueToImpute = _.maxBy(
          valuesWithoutNulls,
          (value) => _.countBy(valuesWithoutNulls)[value],
        );
        break;
      }
      case 'CONSTANT': {
        if (valueToImpute === undefined) {
          valueToImpute = columnType === 'number' ? 0 : '';
        }
        break;
      }
    }

    const result: DataFrameRow[] = this.rows.map((row) => {
      if (row[column] === null) {
        return {
          ...row,
          [column]: valueToImpute as number | string,
        };
      } else {
        return row;
      }
    });

    return new DataFrame(result, this._columns);
  };

  minMaxScaler = (column: string) => {
    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[column] !== null)
      .map((row) => row[column]);

    const min = _.min(valuesWithoutNulls);
    const max = _.max(valuesWithoutNulls);

    const newMin = 0;
    const newMax = 1;

    const result: DataFrameRow[] = this.rows.map((row) => {
      if (row[column] === null) {
        return row;
      }
      return {
        ...row,
        [column]: ((row[column] - min) / (max - min)) * (newMax - newMin) + newMin,
      };
    });

    return new DataFrame(result, this._columns);
  };

  standardScaler = (column: string, withMean: boolean, withStd: boolean) => {
    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[column] !== null)
      .map((row) => row[column]);

    const mean = _.mean(valuesWithoutNulls);
    const std = Math.sqrt(_.mean(valuesWithoutNulls.map((value) => Math.pow(value - mean, 2))));

    const result: DataFrameRow[] = this.rows.map((row) => {
      if (row[column] === null) {
        return row;
      }
      return {
        ...row,
        [column]: (row[column] - (withMean ? mean : 0)) / (withStd ? std : 1),
      };
    });

    return new DataFrame(result, this._columns);
  };

  renameColumns = (oldNames: string[], newNames: string[]) => {
    const result: DataFrameRow[] = this.rows.map((row) => {
      const newRow = { ...row };
      oldNames.forEach((oldName, index) => {
        newRow[newNames[index]] = row[oldName];
        delete newRow[oldName];
      });

      return newRow;
    });

    return new DataFrame(
      result,
      this._columns.map((column) => {
        const index = oldNames.indexOf(column.name);
        return index !== -1 ? { ...column, name: newNames[index] } : column;
      }),
    );
  };

  dropColumns = (columns: string[]) => {
    const result: DataFrameRow[] = this.rows.map((row) => {
      const newRow = { ...row };
      columns.forEach((column) => delete newRow[column]);

      return newRow;
    });

    return new DataFrame(
      result,
      this._columns.filter((col) => !columns.includes(col.name)),
    );
  };
}
