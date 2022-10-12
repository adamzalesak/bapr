import _ from 'lodash';

export type DataFrameRow = { [key: string]: any };

export class DataFrame {
  private data: DataFrameRow[];

  constructor(data?: DataFrameRow[]) {
    this.data = data || [];
  }

  get columns() {
    return Object.keys(this.data[0]);
  }

  get rows() {
    return this.data;
  }

  get count() {
    return this.data.length;
  }

  sort = (by: string, desc?: boolean) => {
    return new DataFrame(_.orderBy(this.data, by, desc ? 'desc' : 'asc'));
  };

  join = (second: DataFrame, keyA: string, keyB: string) => {
    const equijoin = (
      xs: DataFrameRow[],
      ys: DataFrameRow[],
      primary: string,
      foreign: string,
      sel: (a: DataFrameRow, b: DataFrameRow) => DataFrameRow,
    ) => {
      const ix = xs.reduce(
        (
          ix,
          row, // loop through m items
        ) => ix.set(row[primary], row), // populate index for primary table
        new Map(),
      ); // create an index for primary table

      return ys.map(
        (
          row, // loop through n items
        ) =>
          sel(
            ix.get(row[foreign]), // get corresponding row from primary
            row,
          ),
      ); // select only the columns you need
    };
    const a = this.data;
    const b = second.data;

    const result = equijoin(a, b, keyA, keyB, (a, b) => ({ ...a, ...b }));
    console.log(result);

    // TODO: implement
    return new DataFrame(result);
  };
}

