import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import listicn from '../../../assets/images/list.svg';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: '#8c8c8c',
    },
    [`&.${tableCellClasses.body}`]: {
        color: '#666666',
        fontSize: 13,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function LgnHistoryTable(props) {

    if (!props.lgnhist) {
        return (<h2>No History</h2>);
    }


    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead >
                    <TableRow>
                        <StyledTableCell align="center">User Id <img src={listicn} className="lst_icn"/></StyledTableCell>
                        <StyledTableCell align="center">IP Address <img src={listicn} className="lst_icn"/></StyledTableCell>
                        <StyledTableCell align="center">Device Id <img src={listicn} className="lst_icn"/></StyledTableCell>
                        <StyledTableCell align="center">Time <img src={listicn} className="lst_icn"/></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {props.lgnhist.map((t, index) => {

                        return (
                            <StyledTableRow key={index}>
                                <StyledTableCell component="th" scope="row" >{t.id}</StyledTableCell>

                                <StyledTableCell align="center">{t.ip_address} </StyledTableCell>

                                <StyledTableCell align="center">{t.device_id}</StyledTableCell>

                                <StyledTableCell align="center">{t.created_date}</StyledTableCell>

                            </StyledTableRow>
                        )
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
