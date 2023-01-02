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
import { URL } from "../../helpers/global";
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import "./CSS/Trading.css";
import { Grid } from "@mui/material";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from 'react-redux';
import { saveSymblePair } from "../../store/actions";
import axios from 'axios';
// import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
const client = new W3CWebSocket('wss://fstream.binance.com/ws/!ticker@arr');
// const client=new W3CWebSocket('wss://fstream.binance.com/ws/btcusdt@markPrice');
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

const Trading = (props) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [newTrlist, setNewTrlist] = React.useState([""]);
    const [items, setItems] = React.useState([]);
    const [pair, setPair] = React.useState();
    const [searchTest, setSearchTest] = React.useState();
    const [filterData, setFilterData] = React.useState([]);
    const [symble, setSymble] = React.useState([]);
    const [allsymble, setAllsymble] = React.useState([]);

    const navigate = useNavigate();
    client.onmessage = (message) => {
        const json = JSON.parse(message.data);
        if (items.length === 0) {
            json.forEach((e, i) => {
                const result = items.find((el) => {
                    if (el === e.s) return true;
                });
                const sym = allsymble.find((ele) => {
                    if (ele.symble === e.s) return true;
                });
                if (result === undefined) {
                    var str = e.s;
                    var substr = str.substring(str.length - 4, str.length);
                    if (substr != "BUSD") {
                        let d = changeformate(e);
                        items.push(d);
                        symble.push(d.s);
                    }

                }
                if (sym===undefined){
                    let st = e.s;
                    let subs = st.substring(st.length - 4, st.length);
                    if (subs != "BUSD") {
                        let d = saveSymble(e.s);
                    }
                }
            });
        }
        setNewTrlist(json);
    };


    React.useEffect(() => {
        props.saveSymble(symble);
        addNepair();
        return updateData(); 
    }, [newTrlist]);
    React.useEffect(() => {
        getallSymble();
    }, []);
 
    const changePair = (e, rowData) => {
        let p = rowData?.s.toLowerCase();
        setPair(p);
        navigate('/trade', { state: { pairdata: p } });
    }
    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
  
    const handleserachSymble = (e) => {
     
        const data = items.filter((item) =>
            item.s.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilterData(data);
   
    }
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    if (newTrlist.length < 1) {
        return <Loader />;
    }
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
    const updateData = () => {
        return items.forEach((it, j) => {
            newTrlist.forEach((row, i) => {
                if (row.s === it.s){
                    items[j] = changeformate(row);
                }
            
            })
        })
    }
    const addNepair=()=>{
      for(var i = 0; i < allsymble.length; i++) {
            let syme = items.find((ele) => {
                if (ele.s === allsymble[i].symble) return true;
            });
            if(syme===undefined){
                let symed = newTrlist.find((ele) => {
                    if (ele.s === allsymble[i].symble) return ele;
                });
                console.log("allsymble",symed);
                if(symed){
                    console.log("ghhh",symed); 
                       let da = changeformate(symed);
                        items.push(da); 
                        return; 
                }
            }
          }
    }
// console.log("hellofriends",allsymble); 
    const getallSymble = () => {
        let config = {
            headers: {
                'x-access-token': props.token
            }
        }
        axios.post(`${URL}getAllSymble`)
            .then(res => {
             
                setAllsymble(res.data.data);

            }).catch(error => {
                console.log("error", error);
            });
    }

    const saveSymble = (symble) => {
        var data = {
            "symble": symble
        }
        let config = {
            headers: {
                'x-access-token': props.token
            }
        }
        axios.post(`${URL}savesymble`, data, config)
            .then(res => {
                console.log("res.data", res.data);
            }).catch(error => {
                console.log("error", error);
            });
    }

    return (
        <>
            {/* <Grid container className="trls_icns"> */}
            {/* <h2 className="trls_title">Futures Market</h2> */}

            <div className='trading_headers' style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "90%"
            }}>
                <h2 className="balance">
                    Futures Market
                </h2>

                <div className="coinAddressDiv">
                    <div className="coinAddress">
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Search</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={'text'}
                                value={searchTest}
                                onChange={handleserachSymble}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            edge="end"
                                        >
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                </div>

                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        '& > *': {
                            m: 1,
                        },
                    }}
                >
                    {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
                        <Button>Open</Button>
                        <Button>History</Button>
                    </ButtonGroup> */}
                </Box>
            </div>



            {/* </Grid>  */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">

                    <TableHead style={{ backgroundColor: '#d6d6d6' }}>
                        <TableRow>
                            <TableCell >Name</TableCell>
                            <TableCell >Price</TableCell>
                            <TableCell >24h Change</TableCell>
                            <TableCell>24h High</TableCell>
                            <TableCell>24h Low</TableCell>
                            <TableCell>24h Volume</TableCell>
                        </TableRow>
                    </TableHead>


                    <TableBody>
                        {(filterData && filterData?.length > 0 ? rowsPerPage > 0 ? filterData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : filterData : rowsPerPage > 0
                            ? items.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            : items
                        ).map((row, index) => (
                            <TableRow onClick={(e) => { changePair(e, row); }} key={index}>

                                <TableCell component="th" scope="row">
                                    {row.s} perpetual
                                </TableCell>

                                <TableCell >
                                    {row.c}
                                </TableCell>
                                {
                                    (row.P.slice(0, 1) == "-") ?
                                        <TableCell style={{ color: '#d9442e' }}>
                                            {row.P}
                                        </TableCell> :

                                        <TableCell style={{ color: '#76b840' }}>
                                            {row.P}
                                        </TableCell>
                                }
                                <TableCell >
                                    {row.h}
                                </TableCell>
                                <TableCell >
                                    {row.l}
                                </TableCell>
                                <TableCell>
                                    {row.q}
                                </TableCell>

                            </TableRow>
                        ))}

                        {emptyRows > 0 && (
                            <TableRow style={{ height: 53 * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>

                    <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                count={items.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: {
                                        'aria-label': 'rows per page',
                                    },
                                    native: true,
                                }}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
        </>
    );
}

const mapDispatchToProps = (dispatch) => {
    return ({
        saveSymble: (syPair) => dispatch(saveSymblePair(syPair))
    })
}
export default connect(null, mapDispatchToProps)(Trading);