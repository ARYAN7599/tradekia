import * as React from 'react';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import "./CSS/Trading.css";

function TablePaginationActions(props) {
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <Box sx={{ flexShrink: 0, ml: 2.5 }}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton
                onClick={handleBackButtonClick}
                disabled={page === 0}
                aria-label="previous page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </Box>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};




export default function Trading(props) {
    const [page, setPage] = React.useState(0);
    const [items, setItems] = React.useState({});
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    setInterval(() => {
        const client = new W3CWebSocket(`wss://fstream.binance.com/ws/${props?.data.toLowerCase()}@ticker`);
        client.onmessage = (message) => {
            let narr = [];
            let it;
            // const json = JSON.parse(message.data);
            //     if(items.length===0){
            //     json.forEach((e, i) => {
            //         var obj = null;

            //         const result = items.find((el) => {
            //             if (el=== e.s) return true;
            //           });


            //         if(result===undefined){
            //             items.push(e.s);    
            //         }


            //     });
            // }
            setItems(message.data);
            // console.log("hfhfhh3345",message.data); 
            // setNewTrlist(json);
        };
    }, 1000);
    //let shym={"e":"24hrTicker","E":1646975056593,"s":"BTCUSDT","p":"-1031.30","P":"-2.612","w":"39119.97","c":"38457.00","Q":"0.152","o":"39488.30","h":"40288.70","l":"38200.10","v":"469556.427","q":"18369035431.61","O":1646888640000,"C":1646975056586,"F":2024926121,"L":2029456707,"n":4529548};

    // if(items?.length>0){
    //     console.log("hgdhjgsdh",shym.e); 
    // }

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - props.data.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <TableBody>
                {
                    // (rowsPerPage > 0
                    //     ? props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    //     : props.data
                    // )
                    items?.length > 0 ?
                        // items.map((row, index) => (

                        <TableRow  >
                            {/* {console.log("hfhhfd",row)} */}
                            <TableCell component="th" scope="row">
                                {items.s} perpetual
                            </TableCell>

                            <TableCell >
                                {items.p}
                            </TableCell>
                            {/* {
                                (row.priceChangePercent.slice(0, 1) == "-") ?
                                    <TableCell style={{ color: '#d9442e' }}>
                                        {row.priceChangePercent}
                                    </TableCell> :

                                    <TableCell style={{ color: '#76b840' }}>
                                        {row.priceChangePercent}
                                    </TableCell>
                            } */}
                            <TableCell >
                                {items.q}/{items.l}
                            </TableCell>

                            <TableCell>
                                {items.n}
                            </TableCell>
                        </TableRow>
                        // ))
                        : null
                }

                {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                        <TableCell colSpan={6} />
                    </TableRow>
                )}
            </TableBody>
        </div>
    );
}
