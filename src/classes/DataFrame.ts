import _ from 'lodash';
import { parse } from 'papaparse';
import { JoinType } from '../models/joinNode';
import {
  fullOuterJoin,
  innerJoin,
  leftOuterJoin as leftOuterJoin,
  rightOuterJoin as rightOuterJoin,
} from '../utils/join';
import { saveDataToFile } from '../utils/saveDataToFile';

export type DataFrameRow = { [key: string]: any };

export type DataFrameData = DataFrameRow[];

export class DataFrame {
  private data: DataFrameData;

  constructor(data?: DataFrameData) {
    this.data = data || [];
  }

  static fromCSVFile = async (file: File): Promise<DataFrame> => {
    const promise = new Promise<DataFrame>((resolve, _reject) => {
      parse(file, {
        dynamicTyping: true,
        skipEmptyLines: true,
        header: true,
        fastMode: true,
        worker: true,
        complete: (result) => {
          const data = new DataFrame(result.data as DataFrameData);
          resolve(data);
        },
      });
    });

    return promise;
  };

  toCSVFile = () => {
    saveDataToFile(this);
  };

  get columns() {
    return this.data[0] ? Object.keys(this.data[0]) : [];
  }

  get rows() {
    return this.data;
  }

  get count() {
    return this.data.length;
  }

  sort = (by: string, direction?: 'asc' | 'desc') => {
    const sorted = _.orderBy(this.data, by, direction);
    return new DataFrame(sorted);
  };

  join = (dataFrameB: DataFrame, keyA: string, keyB: string, type: JoinType) => {
    let result: DataFrameData;

    switch (type) {
      case JoinType.innerJoin: {
        result = innerJoin(this.data, dataFrameB.data, keyA, keyB);
        break;
      }
      case JoinType.leftOuterJoin: {
        result = leftOuterJoin(this.data, dataFrameB.data, keyA, keyB);
        break;
      }
      case JoinType.rightOuterJoin: {
        result = rightOuterJoin(this.data, dataFrameB.data, keyA, keyB);
        break;
      }
      case JoinType.fullOuterJoin: {
        result = fullOuterJoin(this.data, dataFrameB.data, keyA, keyB);
        break;
      }
    }

    return new DataFrame(result);
  };
}
