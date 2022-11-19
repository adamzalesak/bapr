import { parse, unparse } from 'papaparse';
import { Column, DataFrame, DataFrameRow } from '../classes/DataFrame';

export const parseCSVFile = async (file: File, rowsLimit?: number): Promise<DataFrame> => {
  const promise = new Promise<DataFrame>((resolve, _reject) => {
    parse(file, {
      skipEmptyLines: true,
      header: true,
      fastMode: true,
      worker: true,
      preview: rowsLimit,
      complete: (result) => {
        const data = result.data as DataFrameRow[];
        const columnsNames = result.meta.fields;

        const columns: Column[] = [];

        // get column types
        columnsNames?.forEach((columnName) => {
          let type: 'string' | 'number' = 'number';

          let rowNumber = 0;
          while (
            rowNumber < data.length &&
            (data[rowNumber][columnName] == null || !isNaN(+data[rowNumber][columnName]))
          ) {
            rowNumber++;
          }

          if (rowNumber !== data.length) {
            type = 'string';
          }

          columns.push({ name: columnName, type });
        });

        // parse values of number columns to number type
        columns.forEach((column) => {
          if (column.type === 'string') return;

          let rowNumber = 0;
          while (rowNumber < data.length) {
            data[rowNumber][column.name] =
              data[rowNumber][column.name] === null ? null : +data[rowNumber][column.name];
            rowNumber++;
          }
        });

        const dataFrame = new DataFrame(data, columns);

        resolve(dataFrame);
      },
      // TODO: error handling
    });
  });

  return promise;
};

export const saveDataToCSVFile = (data: DataFrame) => {
  const csv = unparse(data?.rows);

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

