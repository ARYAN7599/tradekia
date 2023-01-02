
import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import listicn from '../../../assets/images/list.svg';
import ReactPaginate from "react-paginate";

// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [&.${tableCellClasses.head`}]: {
//         color: '#8c8c8c',
//     },
//     [&.${tableCellClasses.body}]: {
//         color: '#666666',
//         fontSize: 13,
//     },
// }));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {

    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));



export default function LgnHistoryTable(props) {

    const [gh, setGh] = useState([])
    const [currentImages, setCurrentImages] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [imagesOffset, setImagesOffset] = useState(0);

    useEffect(() => {
        const endOffset = imagesOffset + 15;
        setCurrentImages(props.lgnhist.slice(imagesOffset, endOffset));
        setPageCount(Math.ceil(props.lgnhist.length / 15));
    }, [props.lgnhist, imagesOffset]);


    useEffect(() => {
        console.log("vvvvvvvvvvvvvvvvvvvvvv", currentImages)
    }, []);

    if (!props.lgnhist) {
        return (<h2>No History</h2>);
    }

    const handlePageClick = (event) => {
        const newOffset = (event.selected * 15) % props.lgnhist.length;
        setImagesOffset(newOffset);
    };

    return (
        <>
            <table id="table20">
                <thead>
                    <tr>
                        <th>User Id</th>
                        <th>IP Address</th>
                        <th>Device Id</th>
                        <th>Time</th>
                    </tr>
                </thead>
                {currentImages.map((t, index) => {
                    return (
                        <tbody>
                            <tr>
                                <td data-column="User Id">
                                    {t.id}
                                </td>
                                <td data-column="IP Address">
                                    {t.ip_address}
                                </td>
                                <td data-column="Device Id">
                                    {t.device_id}
                                </td>
                                <td data-column="Time">
                                    {t.created_date}
                                </td>

                            </tr>

                        </tbody>
                    );
                })}
            </table>
            <div className="pagination">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                />
            </div>


{/* <TableContainer component={Paper}>
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
        </TableContainer> */}


        </>
    );
}