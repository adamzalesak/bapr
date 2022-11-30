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

  filter = (columnName: string, condition: FilterCondition, value?: string) => {
    let result: DataFrameRow[];
    const columnType = this._columns.find((c) => c.name === columnName)?.type;

    switch (condition) {
      // common for string and number columns
      case 'IS_NOT_NULL': {
        result = this.rows?.filter((row) => row[columnName] !== null);
        break;
      }
      case 'EQUAL': {
        if (columnType === 'string') {
          result = this.rows?.filter((row) => row[columnName] === value);
        } else {
          result = this.rows?.filter((row) => row[columnName] === Number(value));
        }
        break;
      }
      case 'NOT_EQUAL': {
        if (columnType === 'string') {
          result = this.rows?.filter((row) => row[columnName] !== value);
        } else {
          result = this.rows?.filter((row) => row[columnName] !== Number(value));
        }
        break;
      }

      // number column
      case 'GREATER_THAN': {
        result = this.rows?.filter((row) => row[columnName] > Number(value));
        break;
      }
      case 'GREATER_THAN_OR_EQUAL': {
        result = this.rows?.filter((row) => row[columnName] >= Number(value));
        break;
      }
      case 'LESS_THAN': {
        result = this.rows?.filter((row) => row[columnName] < Number(value));

        break;
      }
      case 'LESS_THAN_OR_EQUAL': {
        result = this.rows?.filter((row) => row[columnName] <= Number(value));
        break;
      }

      // string column
      case 'CONTAINS': {
        result = this.rows?.filter((row) => row[columnName].includes(value));
        break;
      }
      case 'NOT_CONTAINS': {
        result = this.rows?.filter((row) => !row[columnName].includes(value));
        break;
      }
      case 'STARTS_WITH': {
        result = this.rows?.filter((row) => row[columnName].startsWith(value));
        break;
      }
      case 'NOT_STARTS_WITH': {
        result = this.rows?.filter((row) => !row[columnName].startsWith(value));
        break;
      }
      case 'ENDS_WITH': {
        result = this.rows?.filter((row) => row[columnName].endsWith(value));
        break;
      }
      case 'NOT_ENDS_WITH': {
        result = this.rows?.filter((row) => !row[columnName].endsWith(value));
        break;
      }
      default: {
        result = this.rows;
        break;
      }
    }

    return new DataFrame(result, this._columns);
  };

  simpleImputer = (columnName: string, strategy: SimpleImputerStrategy, value?: string) => {
    let valueToImpute: string | number | undefined = value;

    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[columnName] !== null)
      .map((row) => row[columnName]);
    const countWithoutNulls = valuesWithoutNulls?.length;

    const columnType = this.columns.find((col) => col.name === columnName)?.type;

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
      if (row[columnName] === null) {
        return {
          ...row,
          [columnName]: valueToImpute as number | string,
        };
      } else {
        return row;
      }
    });

    return new DataFrame(result, this._columns);
  };

  minMaxScaler = (columnName: string) => {
    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[columnName] !== null)
      .map((row) => row[columnName]);

    const min = _.min(valuesWithoutNulls);
    const max = _.max(valuesWithoutNulls);

    const newMin = 0;
    const newMax = 1;

    const result: DataFrameRow[] = this.rows.map((row) => {
      if (row[columnName] === null) {
        return row;
      }
      return {
        ...row,
        [columnName]: ((row[columnName] - min) / (max - min)) * (newMax - newMin) + newMin,
      };
    });

    return new DataFrame(result, this._columns);
  };

  standardScaler = (columnName: string, withMean: boolean, withStd: boolean) => {
    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[columnName] !== null)
      .map((row) => row[columnName]);

    const mean = _.mean(valuesWithoutNulls);
    const std = Math.sqrt(_.mean(valuesWithoutNulls.map((value) => Math.pow(value - mean, 2))));

    const result: DataFrameRow[] = this.rows.map((row) => {
      if (row[columnName] === null) {
        return row;
      }
      return {
        ...row,
        [columnName]: (row[columnName] - (withMean ? mean : 0)) / (withStd ? std : 1),
      };
    });

    return new DataFrame(result, this._columns);
  };

  oneHotEncoder = (columnName: string, dropFirst?: boolean) => {
    const valuesWithoutNulls = this.rows
      ?.filter((row) => row[columnName] !== null)
      .map((row) => row[columnName]);

    const uniqueValues = dropFirst
      ? _.uniq(valuesWithoutNulls).slice(1)
      : _.uniq(valuesWithoutNulls);

    const columnsToAdd = uniqueValues.map((value) => ({
      name: `${columnName}_${value}`,
      type: 'number' as Column['type'],
    }));

    const result: DataFrameRow[] = this.rows.map((row) => {
      const newColumns = uniqueValues.reduce((acc, value) => {
        if (value === row[columnName]) {
          return {
            ...acc,
            [`${columnName}_${value}`]: 1,
          };
        } else {
          return {
            ...acc,
            [`${columnName}_${value}`]: 0,
          };
        }
      }, {});

      const newRow = { ...row, ...newColumns };

      // drop original column if the replacement was added
      if (uniqueValues?.length) {
        delete newRow[columnName];
      }

      return {
        ...newRow,
      };
    });

    const columns = [...this.columns.filter((c) => c.name !== columnName), ...columnsToAdd];

    return new DataFrame(result, columns);
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
