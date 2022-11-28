import _ from 'lodash';
import { FilterNumberCondition, FilterStringCondition } from '../models/filterNode';
import { JoinType } from '../models/joinNode';
import {
  SimpleImputerNumberStrategy,
  SimpleImputerStringStrategy,
} from '../models/simpleImputerNode';
import {
  fullOuterJoin,
  innerJoin,
  leftOuterJoin as leftOuterJoin,
  rightOuterJoin as rightOuterJoin,
} from '../utils/join';
import { parseCSVFile, saveDataToCSVFile } from '../utils/parse';

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

    switch (type) {
      case JoinType.innerJoin: {
        result = innerJoin(this, dataFrameB, keyA, keyB);
        break;
      }
      case JoinType.leftOuterJoin: {
        result = leftOuterJoin(this, dataFrameB, keyA, keyB);
        break;
      }
      case JoinType.rightOuterJoin: {
        result = rightOuterJoin(this, dataFrameB, keyA, keyB);
        break;
      }
      case JoinType.fullOuterJoin: {
        result = fullOuterJoin(this, dataFrameB, keyA, keyB);
        break;
      }
    }

    return new DataFrame(result, [...this._columns, ...dataFrameB.columns]);
  };

  filter = (
    column: string,
    condition: FilterNumberCondition | FilterStringCondition,
    value?: string,
  ) => {
    let result: DataFrameRow[];

    switch (condition) {
      case FilterNumberCondition.greaterThan: {
        result = this.rows?.filter((row) => row[column] > +(value as string));
        break;
      }
      case FilterNumberCondition.greaterThanOrEqual: {
        result = this.rows?.filter((row) => row[column] >= +(value as string));
        break;
      }
      case FilterNumberCondition.lessThan: {
        result = this.rows?.filter((row) => row[column] < +(value as string));

        break;
      }
      case FilterNumberCondition.lessThanOrEqual: {
        result = this.rows?.filter((row) => row[column] <= +(value as string));
        break;
      }
      case FilterNumberCondition.equals: {
        result = this.rows?.filter((row) => row[column] === +(value as string));
        break;
      }
      case FilterNumberCondition.notEquals: {
        result = this.rows?.filter((row) => row[column] !== +(value as string));
        break;
      }
      case FilterNumberCondition.isNotNull: {
        result = this.rows?.filter((row) => row[column] !== null);
        break;
      }

      case FilterStringCondition.contains: {
        result = this.rows?.filter((row) => row[column].includes(value as string));
        break;
      }
      case FilterStringCondition.notContains: {
        result = this.rows?.filter((row) => !row[column].includes(value as string));
        break;
      }
      case FilterStringCondition.startsWith: {
        result = this.rows?.filter((row) => row[column].startsWith(value as string));
        break;
      }
      case FilterStringCondition.notStartsWith: {
        result = this.rows?.filter((row) => !row[column].startsWith(value as string));
        break;
      }
      case FilterStringCondition.endsWith: {
        result = this.rows?.filter((row) => row[column].endsWith(value as string));
        break;
      }
      case FilterStringCondition.notEndsWith: {
        result = this.rows?.filter((row) => !row[column].endsWith(value as string));
        break;
      }
      case FilterStringCondition.equals: {
        result = this.rows?.filter((row) => row[column] === value);
        break;
      }
      case FilterStringCondition.notEquals: {
        result = this.rows?.filter((row) => row[column] !== value);
        console.log(value);
        break;
      }
      case FilterStringCondition.isNotNull: {
        result = this.rows?.filter((row) => row[column] !== null);
        break;
      }
      case FilterStringCondition.matchesRegex: {
        result = this.rows?.filter(
          (row) => typeof row[column] === 'string' && row[column].match(value as string),
        );
        break;
      }

      default: {
        result = this.rows;
        break;
      }
    }

    return new DataFrame(result, this._columns);
  };

  simpleImputer = (
    column: string,
    strategy: SimpleImputerNumberStrategy | SimpleImputerStringStrategy,
    value?: string,
  ) => {
    let valueToImpute: string | number | undefined = value;

    switch (strategy) {
      case SimpleImputerNumberStrategy.Constant: {
        break;
      }
      case SimpleImputerNumberStrategy.Mean: {
        valueToImpute = this.rows?.reduce((acc, row) => acc + row[column], 0) / this.count;
        break;
      }
      case SimpleImputerNumberStrategy.Median: {
        const sorted = _.orderBy(this.rows, column, 'asc');
        const middle = Math.floor(this.count / 2);
        valueToImpute = sorted[middle][column];
        break;
      }
      case SimpleImputerNumberStrategy.MostFrequent: {
        const grouped = _.groupBy(this.rows, column);
        const sorted = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
        valueToImpute = sorted[0][0] !== 'null' ? +sorted[0][0] : +sorted[1][0];
        break;
      }

      case SimpleImputerStringStrategy.Constant: {
        break;
      }
      case SimpleImputerStringStrategy.MostFrequent: {
        const grouped = _.groupBy(this.rows, column);
        const sorted = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
        valueToImpute = sorted[0][0] !== 'null' ? sorted[0][0] : sorted[1][0];
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

  standardScaler = (column: string, withMean: boolean, withStd: boolean) => {
    // TODO: handle null values
    const mean = this.rows.reduce((acc, row) => acc + row[column], 0) / this.count;
    const std = Math.sqrt(
      this.rows.reduce((acc, row) => acc + (row[column] - mean) ** 2, 0) / this.count,
    );

    const result: DataFrameRow[] = this.rows.map((row) => ({
      ...row,
      [column]: (row[column] - (withMean ? mean : 0)) / (withStd ? std : 1),
    }));

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
