import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { DataFrame } from '../../classes/DataFrame';
import { TABLE_ROWS_PER_PAGE_OPTIONS } from '../../constants';

const HeaderTableCellContent = styled.div`
  display: flex;
  flex-direction: column;
`;

interface Props {
  dataFrame: DataFrame;
}

export const DataGrid = memo(({ dataFrame }: Props) => {
  const { t } = useTranslation();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(TABLE_ROWS_PER_PAGE_OPTIONS[0]);

  const rows = useMemo(
    () => dataFrame?.rows.slice(page * rowsPerPage, (page + 1) * rowsPerPage),
    [dataFrame, page, rowsPerPage],
  );

  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, page: number) => {
    setPage(page);
  };

  const handleChangeRowsPerPage: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper>
      <TableContainer sx={{ maxHeight: '75vh' }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {dataFrame?.columns.map((c, index) => (
                <TableCell key={index}>
                  <HeaderTableCellContent>
                    {c.name}
                    <em>{c.type}</em>
                  </HeaderTableCellContent>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                {dataFrame?.columns
                  .map((c) => c.name)
                  .map((columnName, index) => (
                    <TableCell key={index}>{row[columnName]}</TableCell>
                  ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={TABLE_ROWS_PER_PAGE_OPTIONS}
        colSpan={3}
        count={dataFrame.count}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={t('dataGrid.rowsPerPage')}
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} ${t('dataGrid.of')} ${count}`}
      />
    </Paper>
  );
});
