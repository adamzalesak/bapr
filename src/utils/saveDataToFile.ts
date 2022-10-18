import { unparse } from 'papaparse';
import { DataFrame } from '../classes/DataFrame';

export const saveDataToFile = (data: DataFrame) => {
  const csv = unparse(data?.rows);

  var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', 'data.csv');
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

