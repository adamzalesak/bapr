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
            (data[rowNumber][columnName] === null ||
              data[rowNumber][columnName].match(/^ *$/) !== null ||
              !isNaN(+data[rowNumber][columnName]))
          ) {
            rowNumber++;
          }

          if (rowNumber !== data.length) {
            type = 'string';
          }

          columns.push({ name: columnName, type });
        });

        columns.forEach((column) => {
          for (let rowNumber = 0; rowNumber < data.length; rowNumber++) {
            if (column.type === 'number') {
              // parse values of number columns to number type
              data[rowNumber][column.name] =
                data[rowNumber][column.name] === null ||
                data[rowNumber][column.name].match(/^ *$/) !== null
                  ? null
                  : +data[rowNumber][column.name];
            } else if (column.type === 'string') {
              // substitute empty strings with null
              data[rowNumber][column.name] =
                data[rowNumber][column.name].match(/^ *$/) !== null
                  ? null
                  : data[rowNumber][column.name];
            }
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

export const saveDataToCSVFile = (dataFrame: DataFrame) => {
  const csv = unparse(dataFrame?.rows, {
    columns: dataFrame.columns.map((column) => column.name),
  });

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

