import React , {memo}  from 'react';
import Paper from '@material-ui/core/Paper';
import TableScrollbar from 'react-table-scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '@djthoms/pretty-checkbox';
import "../TradChart.css";

const Tordergreen = () => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [value, setValue] = React.useState('1');
    const columns = [
        {
            id: 'price',
            label: 'Price',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'amount',
            label: 'Amount',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toLocaleString('en-US'),
        },
        {
            id: 'total',
            label: 'Total',
            minWidth: 60,
            align: 'right',
            format: (value) => value.toFixed(2),
        },
    ];
    function createData(price, amount) {
        const total = price + amount;
        return { price, amount, total };
    }
    const rows = [
        createData(1324171354, 3287263),
        createData(1403500365, 9596961),
        createData(60483973, 301340),
        createData(327167434, 9833520),
        createData(37602103, 9984670),
        createData(25475400, 7692024),
        createData(83019200, 357578),
        createData(4857000, 70273),
        createData(126577691, 1972550),
        createData(126317000, 377973),
        createData(67022000, 640679),
        createData(67545757, 242495),
        createData(146793744, 17098246),
        createData(200962417, 923768),
        createData(210147125, 8515767),
    ];

    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
        <TableScrollbar  rows={15}>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {columns.map((column) => (
                            <TableCell id="tablecell"
                                key={column.id}
                                align={column.align}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                    {columns.map((column) => {
                                        const value = row[column.id];
                                        return (
                                            <TableCell id="tablecell" key={column.id} align={column.align}>
                                                {column.format && typeof value === 'number'
                                                    ? column.format(value)
                                                    : value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                </TableBody>
            </Table>
            </TableScrollbar>
        </TableContainer>
        {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
    </Paper>
    )
}

export default memo(Tordergreen);