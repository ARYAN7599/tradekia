import React , { memo } from 'react';
import { useNavigate } from "react-router-dom";
import DollarSvg from "../../assets/images/totalBalance.svg";
import SwapHorizontalCircleIcon from '@material-ui/icons/SwapHorizontalCircle';
import SwapVerticalCircleIcon from '@material-ui/icons/SwapVerticalCircle';
import { PulseBubbleLoader } from 'react-loaders-kit';
import { NavLink } from "react-router-dom";
import InputAdornment from "@mui/material/InputAdornment";
import { DataGrid } from "@material-ui/data-grid";
import { Switch } from 'pretty-checkbox-react';
import '@djthoms/pretty-checkbox';
import Box from '@mui/material/Box';
import "./SCSS/Wallet.css";
import { connect } from 'react-redux';
import { URL } from "../../helpers/global";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Swal from 'sweetalert2';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import FormHelperText from "@mui/material/FormHelperText";
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import CardContent from '@mui/material/CardContent';
import { CardActionArea, CardActions } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Skeleton from '@mui/material/Skeleton';
import QRCode from "react-qr-code";
import { event } from 'jquery';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

const Wallet = (props) => {
    const [ischecked, setIschecked] = React.useState(true);
    const [toTalWalet, setToTalWalet] = React.useState(0);
    const [totalusdt, setTotalusdt] = React.useState();
    const [rowData, setRowData] = React.useState([]);
    const [transferOpen, setTransferOpen] = React.useState(false);
    const [isdtaloding, setIsdtaloding] = React.useState(true);
    const [isLoading, setIsLoading] = React.useState(false);
    const [value, setValue] = React.useState('1');
    const [coinamount, setCoinamount] = React.useState();
    const [remCoinamount, setRemCoinamount] = React.useState();
    const [trnfAmount, setTrnfAmount] = React.useState();
    const [trnsferCoin, setTrnsferCoin] = React.useState();
    const [recemail, setRecemail] = React.useState();

    const handleReciverEmailChange = (event) => {
        setRecemail(event.target.value);
    }
    const handleMaxvalueTransfer = () => {
        setTrnfAmount(coinamount);
        setRemCoinamount(0);
    }

    const handleTransferAmountChange = (event) => {
        let remam = parseFloat(coinamount) - parseFloat(event.target.value);
        setRemCoinamount(remam);
        setTrnfAmount(event.target.value);
    }

    const getCoinWalletAmount = async (coin) => {
        var data = JSON.stringify({
            "user_id": `${props.userId}`,
            "coin": coin
        });
        var config = {
            method: 'post',
            url: `${URL}getCoinfundingUserWallet`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${props.token}`
            },
            data: data
        };

        await axios(config).then(function (res) {
            if (res.data.status) {
                setCoinamount(res.data.data[0].amount);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleTransferAmountSubmit = async () => {
        var data = JSON.stringify({
            "user_id": `${props.userId}`,
            "coin": trnsferCoin,
            "amount": trnfAmount,
            "toaddress": recemail,
            "type": 'E',
        });

        var config = {
            method: 'post',
            url: `${URL}withdrowOnFundingWallet`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${props.token}`
            },
            data: data
        };

        await axios(config).then(function (res) {
            if (res.data.status) {
                Swal.fire({
                    icon: "success",
                    title: res.data.message,
                    confirmButtonText: "Ok",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });

            } else {
                toast.error(res.data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(function (error) {
            console.log(error);
        });

    }

    const handleSwapAmountSubmit = async () => {
        setIsLoading(true);
        var data = JSON.stringify({
            "user_id": `${props.userId}`,
            "coin": trnsferCoin,
            "amount": trnfAmount,
            "address": recemail
        });

        var config = {
            method: 'post',
            url: `${URL}swapUsdtToFusdt`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `${props.token}`
            },
            data: data
        };

        await axios(config).then(function (res) {
            setIsLoading(false);
            if (res.data.status) {
                Swal.fire({
                    icon: "success",
                    title: res.data.message,
                    confirmButtonText: "Ok",
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });

            } else {
                setIsLoading(false);
                toast.error(res.data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(function (error) {
            console.log(error);
        });

    }


    const handleTransferOpen = (e, coin) => {
        getCoinWalletAmount(coin);
        setTrnsferCoin(coin);
        setTransferOpen(true);

    }
    const handleTransferClose = () => {
        setTransferOpen(false);
        setTrnsferCoin();
        setTrnfAmount();
        setRemCoinamount();
    }

    const [swapOpen, setSwapOpen] = React.useState(false);

    const handleSwapOpen = (e, coin) => {
        getCoinWalletAmount(coin);
        setTrnsferCoin(coin);
        setSwapOpen(true);

    }
    const handleSwaprClose = () => {
        setSwapOpen(false);
        setTrnsferCoin();
        setTrnfAmount();
        setRemCoinamount();
    }



    //Recive Section Close 
    const getUserInfo = async () => {
        setIsdtaloding(true);
        try {
            let data = JSON.stringify({
                "user_id": `${props.userId}`,
            });
            let config = {
                method: 'post',
                url: `${URL}getUserfundingWallet`,
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${props.token}`
                },
                data: data
            };
            await axios(config).then(function (res) {
                setToTalWalet(res?.data?.walletAmount);
                setTotalusdt(res?.data?.usdt);
                console.log("JJJJJJJJJJJJ", res?.data?.data);
                setIsdtaloding(false);
                if (res?.data?.data?.length > 0) {
                    let rdata = res?.data?.data;

                    if (ischecked) {
                        setRowData(rdata);
                    } else {
                        let bigCities = rdata.filter(function (e) {
                            return e.totalBalance > 0;
                        });
                        setRowData(bigCities);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        } catch (err) {
            console.log(err);
        }
    };

    React.useEffect(() => {
        getUserInfo();

    }, [ischecked]);


    const columns = [
        {
            field: "coin",
            headerName: "Coin..",
            headerName: "Coin",
            minWidth: 150,
            flex: 0.3,
            renderCell: (params) => {
                return (
                    <Box sx={{
                        display: 'flex', flexDirection: "row", alignItems: 'center',
                        width: "100%"
                    }}>
                        <span ><img style={{ height: "20px", width: "20px" }} src="https://assets.coingecko.com/coins/images/24012/small/logo.jpg?1646030643" /></span>
                        <span style={{ marginLeft: "10px" }}>{params.row.coin}</span>
                    </Box>
                );
            }
        },
        {
            field: "amount",
            headerName: "Total Balance",
            minWidth: 150,
            type: "number",
            flex: 0.3,
            alignItems: 'center'
        },
        {
            field: "avalable_bl",
            headerName: "Available Balance",
            type: "number",
            minWidth: 180,
            flex: 0.3,
            alignItems: 'center',
            renderCell: (params) => {
                // console.log("nhfjn",params.row); 
                return (
                    <Box sx={{
                        display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
                        width: "100%"
                    }}>
                        {/* //     {(params.row.network === 'FEP20' || params.row.network === 'TRC20') ? */}
                        <>
                            {/* <span style={{ color: '#29e70c', cursor: "pointer" }} onClick={(e) => { handleTransferOpen(e, params.row.coin); }}>Transfer</span> */}
                            <p>{params.row.amount}</p>
                            {/* <span>{params.row.amount}</span> */}
                        </>
                        {/* : null */}
                        {/* } */}
                    </Box>
                );
            },
        },
        // {
        //     field: "locked_bl",
        //     headerName: "Locked Balance",
        //     type: "number",
        //     minWidth: 180,
        //     flex: 0.3,
        //     alignItems: 'center'
        // },
        {
            field: "action",
            headerName: "Action",
            type: "number",
            minWidth: 300,
            flex: 0.3,
            renderCell: (params) => {
                // console.log("nhfjn",params.row); 
                return (
                    <Box sx={{
                        display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
                        width: "100%"
                    }}>
                        {(params.row.network === 'FEP20' || params.row.network === 'TRC20') ?
                            <>
                                <span style={{ color: '#29e70c', cursor: "pointer" }} onClick={(e) => { handleTransferOpen(e, params.row.coin); }}>Withdraw</span>
                                <span style={{ color: '#29e70c', cursor: "pointer" }} onClick={(e) => { handleSwapOpen(e, params.row.coin); }}>Swap </span>
                                <div></div>
                                <div></div>
                            </> : null
                        }
                    </Box>
                );
            },
        },
    ];

    return (
        <div className='wallet'>


            <div className='balanceSheet'>
                <h1 className="balance" style={{ paddingLeft: '18px' }}>
                    Balance
                </h1>
                <div className="balanceSheet_div">
                    <div className='balanceSheet_header'>
                        <div className='totalBal_div'>
                            <img src={DollarSvg} alt="totalBalance" />

                            <div className="balDetails_div">
                                <p>Your Portfolio Value</p>
                                <h4><span>$</span> {toTalWalet} USDT </h4>
                                {/* <p>{toTalWalet}<span>BTC</span></p> */}
                            </div>
                        </div>

                        <div className="withDrawLimit_div">
                            {/* <p><span>24h</span>Withdrawal Limit:</p>
              <p> <span>2</span>BTC</p> */}
                        </div>

                        <div className="zeroBalanceWallet_div">

                            <Switch onChange={() => setIschecked(!ischecked)} shape="fill" color="warning" checked={ischecked}></Switch>
                            <p>{ischecked ? "Hide zero balance" : "Show zero balance wallets"}</p>
                        </div>
                    </div>

                    {isdtaloding ?
                        (
                            <Box sx={{ height: 300 }}>
                                <Skeleton />
                                <Skeleton animation="wave" />
                                <Skeleton animation={false} />
                            </Box>
                        ) :
                        (<DataGrid
                            rows={rowData}
                            columns={columns}
                            pageSize={5}
                            disableSelectionOnClick
                            className="productListTable"
                            autoHeight
                            autoPageSize="true"
                        />
                        )}


                    <BootstrapDialog id="sedCoin1232"
                        onClose={handleTransferClose}
                        aria-labelledby="customized-dialog-title"
                        open={transferOpen}
                    >
                        <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleTransferClose}>
                            <span style={{ "fontsize": "2px" }}>Withdraw amount </span>
                        </BootstrapDialogTitle>
                        <TabContext value={value}>
                            <Typography gutterBottom>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div>
                                        <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                type="text"
                                                placeholder="Enter Reciever Email"
                                                value={recemail}
                                                multiline="true"
                                                onChange={handleReciverEmailChange}
                                                label="Email"
                                            />
                                        </FormControl>
                                        <FormControl className='frmControls' fullWidth="true" variant='filled' sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                type="number"
                                                placeholder="Enter Amount"

                                                value={trnfAmount}
                                                onChange={handleTransferAmountChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <button onClick={handleMaxvalueTransfer}>Max</button>
                                                    </InputAdornment>
                                                }
                                                label="Amount"
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    "aria-label": "Total Sale",
                                                    type: "number",
                                                    pattern: "[0-9]*",
                                                    inputmode: "numeric",
                                                }}
                                            />
                                        </FormControl>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            <FormHelperText
                                                className="labelnm"
                                                id="outlined-weight-helper-text"
                                            >
                                                {/* Total */}
                                            </FormHelperText>
                                            <FormHelperText
                                                className="labelnm"
                                                id="outlined-weight-helper-text"
                                            >
                                                Available Balance:{" "}
                                                {remCoinamount !== undefined ? (
                                                    remCoinamount >= 0 ? (
                                                        remCoinamount
                                                    ) : (
                                                        <span style={{ color: "red" }}>
                                                            Insufficient Balance
                                                        </span>
                                                    )
                                                ) : (
                                                    coinamount
                                                )}
                                            </FormHelperText>
                                        </Box>
                                    </div>
                                </Box>
                            </Typography>
                        </TabContext>
                        <text><strong>NOTE:</strong><span>You can Withdraw your Funding Wallet Balance to another User Funding Wallet via Email Id.</span> </text>
                        <DialogActions>

                            {(isLoading) ?
                                <Button id="paybutton">
                                    <PulseBubbleLoader />
                                </Button> :
                                <Button id="paybutton" onClick={handleTransferAmountSubmit}>
                                    Withdraw
                                </Button>
                            }
                        </DialogActions>
                    </BootstrapDialog>


                    <BootstrapDialog id="sedCoin1232"
                        onClose={handleSwaprClose}
                        aria-labelledby="customized-dialog-title"
                        open={swapOpen}
                    >
                        <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleSwaprClose}>
                            <span style={{ "fontsize": "2px" }}>Swap USDT To FUSD</span>
                        </BootstrapDialogTitle>
                        <TabContext value={value}>
                            <Typography gutterBottom>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    <div>
                                        <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Fufi Edage Address</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                type="text"
                                                placeholder="Enter Reciever Address"
                                                value={recemail}
                                                multiline="true"
                                                onChange={handleReciverEmailChange}
                                                label="Address"
                                            />
                                        </FormControl>
                                        <FormControl className='frmControls' fullWidth="true" variant='filled' sx={{ m: 1 }}>
                                            <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-amount"
                                                type="number"
                                                placeholder="Enter Amount"

                                                value={trnfAmount}
                                                onChange={handleTransferAmountChange}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <button onClick={handleMaxvalueTransfer}>Max</button>
                                                    </InputAdornment>
                                                }
                                                label="Amount"
                                                aria-describedby="outlined-weight-helper-text"
                                                inputProps={{
                                                    "aria-label": "Total Sale",
                                                    type: "number",
                                                    pattern: "[0-9]*",
                                                    inputmode: "numeric",
                                                }}
                                            />
                                        </FormControl>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                width: "100%",
                                            }}
                                        >
                                            <FormHelperText
                                                className="labelnm"
                                                id="outlined-weight-helper-text"
                                            >
                                                {/* Total */}
                                            </FormHelperText>
                                            <FormHelperText
                                                className="labelnm"
                                                id="outlined-weight-helper-text"
                                            >
                                                Available Balance:{" "}
                                                {remCoinamount !== undefined ? (
                                                    remCoinamount >= 0 ? (
                                                        remCoinamount
                                                    ) : (
                                                        <span style={{ color: "red" }}>
                                                            Insufficient Balance
                                                        </span>
                                                    )
                                                ) : (
                                                    coinamount
                                                )}
                                            </FormHelperText>
                                        </Box>
                                    </div>
                                </Box>
                            </Typography>
                        </TabContext>
                        <text><strong>NOTE:-</strong><span> Instantly, your USDT Coin will be Converted to FUSD and Transferred to given addres..</span> </text>
                        <DialogActions>
                            {(isLoading) ?
                                <Button id="paybutton">
                                    <PulseBubbleLoader />
                                </Button> :
                                <Button id="paybutton" onClick={handleSwapAmountSubmit}>
                                    Swap USDT to FUSD
                                </Button>
                            }
                        </DialogActions>
                    </BootstrapDialog>
                </div>
            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        id: state.id,
        userId: state.user_id,
        token: state.token,
        email: state.email,
        symbleP: state.payerSymble,

    });
}
export default connect(mapStateToProps)(memo(Wallet));