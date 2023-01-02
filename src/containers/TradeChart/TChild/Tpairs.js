import React, { memo } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@material-ui/core/Paper';
import TableScrollbar from 'react-table-scrollbar';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { URL } from "../../../helpers/global";
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { toast } from 'react-toastify';
import { Oval } from 'react-loader-spinner';
import Skeleton from "@mui/material/Skeleton";
import axios from "axios";
import '@djthoms/pretty-checkbox';
import "../TradChart.css";
import { WifiLock } from '@mui/icons-material';
const Tpairs = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [value, setValue] = React.useState('1');
    const [newTrlist, setNewTrlist] = React.useState([]);
    const [items, setItems] = React.useState([]);
    const [isrander, setIsrander] = React.useState(false);
    const [pair, setPair] = React.useState();
    const [isLoading, setIsLoading] = React.useState(true);
    const [allsymble, setAllsymble] = React.useState([]);
    const getUserInfo = async () => {
        setIsrander(true);
        try {
            let config = {
                method: 'get',
                url: `${URL}getallsymbleWithLetestPrize`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            await axios(config).then(async function (res) {
                if (res?.data?.data?.length > 0) {
                    let rdata = res?.data?.data;

                    let rd = rdata.find((e) => e.pair === "USDT");
                    const data = [];

                    if (rd !== undefined) {
                        data.push(rd);
                    }
                    setIsLoading(false);
                    setNewTrlist(data);
                    setIsrander(false);
                }
            }).catch(function (error) {
                console.log("first Error", error);
            });
        } catch (err) {
            console.log(err);
        }
    };

    // console.log("hdsfdsf",aitems); 
    React.useEffect(() => {
        // getalltickerdatat();
        // getallSymble();
        // connect();
        getUserInfo();
    }, []);

    // React.useEffect(() => {
    //     try {
    //         addNepair();
    //         return updateData();
    //     } catch (error) {
    //         console.error(error);
    //     } finally {
    //         setIsrander(false);
    //     }
    // }, [newTrlist]);

    let internationalNumberFormat = new Intl.NumberFormat('en-US');
    const changeformate = (r) => {
        let volChang = internationalNumberFormat.format(((r.q) / 1000000).toFixed(2));
        r.c = internationalNumberFormat.format(r.c);
        r.h = internationalNumberFormat.format(r.h);
        r.l = internationalNumberFormat.format(r.l);
        r.P = r.P + " %";
        r.q = volChang.toLocaleString("en", { useGrouping: false, minimumFractionDigits: 2 }) + "M";
        return r;

    }

    // const updateData = () => {
    //     return items.forEach((it, j) => {
    //         newTrlist.forEach((row, i) => {
    //             if (row.s === it.s) {
    //                 items[j] = changeformate(row);
    //             }
    //         })
    //     })

    // }
    const changePair = (e, rowData) => {
        // let p = rowData?.s.toLowerCase();
        // setPair(p);
        // props.pairdata(p);
    }
    const columns = [
        {
            id: "symble",
            headerName: " Popular Coins",
            label: 'Pair',
            minWidth: 50,
            flex: 0.3,
            //   renderCell: (params) => {
            //     return (
            //       <Box sx={{
            //         display: 'flex', flexDirection: "row", alignItems: 'center',
            //         width: "100%"
            //       }}>
            //         <span ><img style={{ height: "20px", width: "20px" }} src={params.row.symble_url} /></span>
            //         <span style={{ marginLeft: "10px" }}>{params.row.coin + "/" + params.row.pair}</span>
            //       </Box>
            //     );
            //   }
        },
        {
            id: "cprize",
            label: 'Price',
            minWidth: 50,
            type: "number",
            flex: 0.3,
            align: 'right',
        },
        {
            id: "change24h",
            label: "24h Change",
            minWidth: 50,

            type: "number",
            flex: 0.3,
            // alignItems: 'center',
            renderCell: (params) => {
                console.log("djjd", params.row);
                let ch24h = (params.row.change24h).toString();
                return (
                    (ch24h.slice(0, 1) == "-") ?
                        <span style={{ color: '#d9442e' }}>
                            {params.row.change24h + "%"}
                        </span> :
                        <span style={{ color: '#76b840' }}>
                            {params.row.change24h + "%"}
                        </span>
                );
            }
        },



        // {
        //   field: "action",
        //   headerName: "Action",
        //   type: "number",
        //   // minWidth: 150,
        //   flex: 0.5,
        // //   renderCell: (params) => {
        //     // console.log("djjd", params.row);
        //     // return (
        //     //   <Box sx={{
        //     //     display: 'flex', flexDirection: "row", alignItems: 'center',
        //     //     width: "100%"
        //     //   }}>
        //     //     {(params.row.pair === "USDT") ?
        //     //       <span style={{ cursor: "pointer" }} onClick={(e) => { tradeHandler(e, params.row.coin, params.row.network); }} ><SwapHorizontalCircleIcon style={{ fontSize: "small", color: "slategrey" }} />Trade</span>

        //     //       : <>
        //     //         {/* <span style={{ color: '#29e70c' }} onClick={handleClickOpen}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#29e70c" }} />Deposit</span> */}
        //     //         <span style={{ color: '#29e70c', cursor: "pointer" }} onClick={(e) => { handleClickOpen(e, params.row.coin, params.row.network); }}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#29e70c" }} />QuickBuy</span>
        //     //         {/* <span style={{ color: '#be3232',cursor: "pointer", marginLeft: "10px" }} onClick={(e) => { handleSellSideOpen(e, params.row.coin); }}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#be3232" }} />Sell</span> */}
        //     //         {/* <span  title="Comming Soon"><SwapHorizontalCircleIcon style={{ fontSize: "small", color: "slategrey" }} />Trade</span> */}
        //     //       </>
        //     //     }
        //     //   </Box>
        //     // );
        // //   },
        // },
    ];
    // const addNepair=()=>{
    //     for(var i = 0; i < allsymble.length; i++) {
    //           let syme = items.find((ele) => {
    //               if (ele.s === allsymble[i].symble) return true;
    //           });
    //           if(syme===undefined){
    //               let symed = newTrlist.find((ele) => {
    //                   if (ele.s === allsymble[i].symble) return ele;
    //               });
    //             //   console.log("allsymble",symed);
    //               if(symed){
    //                 //   console.log("ghhh",symed); 
    //                      let da = changeformate(symed);
    //                       items.push(da); 
    //                       return; 
    //               }
    //           }
    //         }
    //   }

    // const getallSymble = () => {
    //     let config = {
    //         headers: {
    //             'x-access-token': props.token
    //         }
    //     }
    //     axios.post(`https://api.tradekia.com/api/getAllSymble`)
    //         .then(res => {
    //             setAllsymble(res.data.data);
    //         }).catch(error => {
    //             console.log("error", error);
    //         });
    // }

    return (
        <Paper className='leftpapers' style={{ width: '100%', overflow: 'hidden', zIndex: '999999999999', position: 'relative', PointerEvent: 'all !important' }}>
            <Box sx={{ display: 'flex' }}>
                <h6 className='hedpanls'>Pairs</h6>
                <ButtonGroup sx={{ marginLeft: '20px' }} aria-label="outlined primary button group">
                    {/* <Button>BTC</Button>
                    <Button>ETH</Button> */}
                    <Button className='usdatbtn'>
                        <h6>
                            USDT
                        </h6>
                    </Button>
                </ButtonGroup>
            </Box>
            <TableContainer style={{ height: 395 }}>
                <TableScrollbar rows={15}>

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
                            {
                                isLoading ?
                                    <TableRow>
                                        <TableCell

                                        > <Box sx={{ height: 500, width: '100%' }}>
                                                <Skeleton />
                                                <Skeleton animation="wave" />
                                                <Skeleton animation={false} />
                                            </Box></TableCell>
                                        <TableCell

                                        > <Box sx={{ height: 500, width: '100%' }}>
                                                <Skeleton />
                                                <Skeleton animation="wave" />
                                                <Skeleton animation={false} />
                                            </Box></TableCell>
                                        <TableCell
                                        > <Box sx={{ height: 500, width: '100%' }}>
                                                <Skeleton />
                                                <Skeleton animation="wave" />
                                                <Skeleton animation={false} />
                                            </Box></TableCell>
                                    </TableRow>
                                    // <TableRow hover role="checkbox" tabIndex={-1} >
                                    //     <TableCell id="tablecell" align={"center"} >
                                    //     </TableCell>
                                    //     <TableCell id="tablecell" align={"center"} >
                                    //         <Oval color="#00BFFF" height={40} width={40} />
                                    //     </TableCell>
                                    // </TableRow>
                                    : newTrlist
                                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row, i) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        return (
                                                            <TableCell id="tablecell" key={column.id} align={column.align} onClick={(e) => { changePair(e, row); }} >
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

        </Paper>
    )
}

export default memo(Tpairs);