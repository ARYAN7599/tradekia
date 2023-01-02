import React , {memo} from 'react';
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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
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

const WalletOptions = [
  { label: "P2P Wallet", value: 'pw' },
  { label: "Funding Wallet", value: 'fw' }
];

const animatedComponents = makeAnimated();

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const Wallet = (props) => {
  const [ischecked, setIschecked] = React.useState(true);
  const [toTalWalet, setToTalWalet] = React.useState();
  const [totalusdt, setTotalusdt] = React.useState();
  const [symble, setSymble] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [transferOpen, setTransferOpen] = React.useState(false);
  const [reciveOpen, setReciveOpen] = React.useState(false);
  const [sCAmount, setSCAmount] = React.useState();
  const [sCAddress, setSCAddress] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [isdtaloding, setIsdtaloding] = React.useState(true);
  const [fromcoin, setFromcoin] = React.useState();
  const [copySuccess, setCopySuccess] = React.useState('');
  const [recieverCoin, setRecieverCoin] = React.useState();
  const [reciNetwork, setReciNetwork] = React.useState();
  const [address, setAddress] = React.useState();
  const [dtext, setDtext] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState('1');
  const [etype, setEtype] = React.useState("E");
  const [limitusdt, setLimitusdt] = React.useState();
  const [coinamount, setCoinamount] = React.useState();
  const [remCoinamount, setRemCoinamount] = React.useState();
  const [trnfAmount, setTrnfAmount] = React.useState();
  const [trnsferCoin, setTrnsferCoin] = React.useState();
  const [swapOpen, setSwapOpen] = React.useState(false);
  const [lastPrice, setLastPrice] = React.useState();
  const [swapam, setSwapam] = React.useState();
  const [swapusdtam, setSwapusdtam] = React.useState();

  const handleMaxvalueTransfer = () => {
    setTrnfAmount(coinamount);
    setRemCoinamount(0);
  }

  const handleMaxvalueSwap = () => {
    let usdtvalue = (parseFloat(coinamount) * parseFloat(lastPrice));
    setSwapusdtam(usdtvalue);
    setSwapam(coinamount);
    setRemCoinamount(0);

  }

  const handleSwapAmountChange = (event) => {
    let remam = parseFloat(coinamount) - parseFloat(event.target.value);
    setRemCoinamount(remam);
    let usdtvalue = (parseFloat(event.target.value) * parseFloat(lastPrice));
    setSwapusdtam(usdtvalue);
    setSwapam(event.target.value);
  }

  const handleTransferAmountChange = (event) => {
    let remam = parseFloat(coinamount) - parseFloat(event.target.value);
    setRemCoinamount(remam);
    setTrnfAmount(event.target.value);
  }

  const handleSwapUsdtAmountChange = (event) => {
    let fufi = parseFloat(event.target.value) / parseFloat(lastPrice);
    let remam = parseFloat(coinamount) - parseFloat(fufi);
    setRemCoinamount(remam);
    setSwapusdtam(event.target.value);
    setSwapam(fufi);
  }

  const handleChange = (event, newValue) => {
    checkUsdtLimit(newValue);
    setValue(newValue);
  };
  const getCoinWalletAmount = async (coin) => {
    var data = JSON.stringify({
      "userId": `${props.userId}`,
      "coin": coin
    });
    var config = {
      method: 'post',
      url: `${URL}getUserCoinWalletAmount`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': props.token,
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
      'wType': trnfWallet,
    });
    var config = {
      method: 'post',
      url: `${URL}transsferhotWToP2PW`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': props.token

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

  const handleSwapFufiToUsdtSubmit = async () => {
    var data = JSON.stringify({
      "user_id": `${props.userId}`,
      "coin": trnsferCoin,
      "amount": swapam,
      'lastPrice': lastPrice,
    });
    var config = {
      method: 'post',
      url: `${URL}swapFufiToUsdt`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': props.token

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

  const checkUsdtLimit = async (va) => {
    try {
      let data = JSON.stringify({
        "user_id": `${props.userId}`,
        "type": va
      });
      let config = {
        method: 'post',
        url: `${URL}checkWithdrowLimit`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': props.token
        },
        data: data
      };
      await axios(config).then(function (res) {
        if (res.data.status) {
          console.log("hfdhfdhfh", res.data);
          let rema = (50 - parseFloat(res.data.data))
          setLimitusdt(rema);
        }

      }).catch(function (error) {
        console.log(error);
      });
    } catch (err) {
      console.log(err);
    }

  }
  const getFufiPrize = async (va) => {
    try {

      let config = {
        method: 'get',
        url: `${URL}getFufiPrize`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': props.token
        }
        // data: data
      };
      await axios(config).then(function (res) {
        if (res.data.status) {
          setLastPrice(res.data.usd);
        }

      }).catch(function (error) {
        console.log(error);
      });
    } catch (err) {
      console.log(err);
    }

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

  const handleSwapOpen = (e, coin) => {
    getCoinWalletAmount(coin);
    getFufiPrize();
    setTrnsferCoin(coin);
    setSwapOpen(true);
  }

  const handleSwapClose = () => {
    setSwapOpen(false);
    setTrnsferCoin();
    setSwapusdtam();
    setSwapam();
    setRemCoinamount();
  }
  const handleSendOpen = (e, coin) => {
    // if(coin==='USDT(TRC20)'){
    //   Swal.fire({
    //     icon: "info",
    //     title: "Due to technical issues withdrawal has been paused for a few hours. Our team is currently working on it. Please bear with us, thank you for your patience..",
    //     showCancelButton: true,
    //     confirmButtonText:  "Ok",
    //   }).then((result) => {
    //     if (result.isConfirmed) {
    //       window.location.reload()
    //     }
    //   });
    //   return;
    // }
    console.log("JKJKJJJJJJJJ", value)
    checkUsdtLimit(value);
    setFromcoin(coin);
    setOpen(true);
  };

  const handleSendClose = () => {
    setFromcoin();
    setSCAmount();
    setSCAddress()
    setOpen(false);
  };
  const handleSendCoin = async () => {
    setIsLoading(true);
    let prop = {
      "user_id": props.userId,
      "toaddress": sCAddress,
      "coin": fromcoin,
      "amount": sCAmount,
      "type": etype
    }
    if (fromcoin === "FUFI") {
      if (sCAmount < 1000) {
        Swal.fire({
          icon: "error",
          title: "Minimum withdrawable amount 1000 FUFI coins.",
          showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        });
        return;
      }
    } else {
      // if(sCAmount<limitusdt){}

      if (sCAmount < 2) {
        Swal.fire({
          icon: "error",
          title: "Minimum withdrawable amount 10 USDT.",
          showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
          }
        });
        return;
      }
      // if (limitusdt < sCAmount && etype==='A' ) {
      //   Swal.fire({
      //     icon: "error",
      //     title: "Daily withdrawal limit exceeded.Please try after 24 hours",
      //     showCancelButton: true,
      //     confirmButtonText: "Ok",
      //   }).then((result) => {
      //     if (result.isConfirmed) {
      //       window.location.reload()
      //     }
      //   });
      //   return;
      // }
    }

    try {
      let config = {
        method: 'Post',
        url: `${URL}sendFufi`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${props.token}`
        },
        data: prop
      };
      await axios(config).then(async function (res) {
        setIsLoading(false);
        if (res?.status === 200) {
          console.log("res?.data?.sa", res?.data);
          setOpen(false);
          if (res?.data?.status) {
            setIsLoading(false);
            Swal.fire(
              'Congratulations',
              'Withdraw Processing !',
              'success'
            ).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          } else {
            setIsLoading(false);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: res.data.message,
              // footer: '<a href="">Why do I have this issue?</a>'
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });

          }
        }
      }).catch(function (error) {
        console.log("first Error", error);
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleAmountChange = (event) => {
    setSCAmount(event.target.value);
  }

  const handleAddressChange = (event) => {
    let str = event.target.value;
    const toCheckString = '0';
    const trccheck = 'T';
    if (etype === "A") {
      if (fromcoin === 'FUFI' && !str.startsWith(toCheckString)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "invalid address",
        }).then((result) => {
          if (result.isConfirmed) {
            handleSendClose();
          }
        });

      } else if (fromcoin === 'USDT(TRC20)' && !str.startsWith(trccheck)) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "invalid address",
        }).then((result) => {
          if (result.isConfirmed) {
            handleSendClose();
          };
        });
      }
    }
    setSCAddress(event.target.value);
  }



  //Recive Section Open 
  const handleReciveClose = () => {
    setAddress();
    setReciveOpen(false);
  }

  const handleReciveOpen = (e, coin, network) => {
    setRecieverCoin(coin);
    setReciNetwork(network);
    let te = (network === 'TRC20') ? `Disclaimer:• 
    Send only using the Tron (TRC20) network. Using any other network will result in loss of funds.•
     Deposit only USDT to this deposit address. Depositing any other asset will result in loss of funds.
     • Deposit may take up to 15 minutes to add in your Wallet.`:
      `Disclaimer:
         • Send only using the FutureFi (FEP20) network. Using any other network will result in loss of funds.
         • Deposit only FUFI Coin to this deposit address. Depositing any other asset will result in loss of funds.
         • Deposit may take up to 15 minutes to add in your Wallet.`
    setDtext(te);
    setReciveOpen(true);
    handleReciveAdress(coin, network)
  }

  const handleReciveAdress = async (coin, network) => {
    try {
      let data = JSON.stringify({
        "userId": `${props.userId}`,
        "network": network,
        "coin": coin

      });
      let config = {
        method: 'post',
        url: `${URL}reciveToWallet`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${props.token}`
        },
        data: data
      };
      await axios(config).then(function (res) {
        if (res.data.status) {
          setAddress(res.data.address);
        }

      }).catch(function (error) {
        console.log(error);
      });
    } catch (err) {
      console.log(err);
    }

  }



  // copy address
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };

  //Recive Section Close 
  const getUserInfo = async () => {
    setIsdtaloding(true);
    try {
      let data = JSON.stringify({
        "userId": `${props.userId}`,
      });
      let config = {
        method: 'post',
        url: `${URL}getOrderData`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': `${props.token}`
        },
        data: data
      };
      await axios(config).then(function (res) {
        setToTalWalet(res?.data?.walletAmount);
        setTotalusdt(res?.data?.usdt);
        if (res?.data?.data?.length > 0) {
          setIsdtaloding(false);
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
    setSymble(props.symbleP);
  }, [ischecked]);

  const [trnfWallet, setTrnfWallet] = React.useState();
  const [walletLebal, setWalletLebal] = React.useState();


  const handileChangeWallteOptions = (event) => {
    console.log("event", event.label);
    setWalletLebal(event.label);
    setTrnfWallet(event.value);
  }


  const TradeHamdilerQuickBuy = () => {
    navigate('/quickbuy');
  }

  const handleHistoryOpen = (e, coin, network) => {
    // navigate('/orders'); 
    navigate("/transcations", { state: { pairdata: coin, user_id: props.userId } });
    window.location.reload();

  }

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
            <span ><img style={{ height: "20px", width: "20px" }} src={params.row.symble_url} /></span>
            <span style={{ marginLeft: "10px" }}>{params.row.coin}</span>
          </Box>
        );
      }
    },
    {
      field: "totalBalance",
      headerName: "Total Balance",
      minWidth: 150,
      type: "number",
      flex: 0.3,
      alignItems: 'center'
    },
    {
      field: "availableBalance",
      headerName: "Available Balance",
      type: "number",
      minWidth: 180,
      flex: 0.3,
      alignItems: 'center'
    },
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
            <>
              {(params.row.network === 'TRC20') ?
                <span style={{ color: '#29e70c', cursor: "pointer", top: "0" }} onClick={(e) => { handleTransferOpen(e, params.row.coin); }}>Transfer</span>
                : ''}

              {(params.row.network === 'FEP20') ?
                <span style={{ color: '#29e70c', cursor: "pointer", top: "0" }} onClick={(e) => { handleSwapOpen(e, params.row.coin); }}>Swap</span>
                : ''}
              <span style={{ color: '#29e70c', cursor: "pointer", top: "0" }} onClick={(e) => { handleSendOpen(e, params.row.coin); }}>Send</span>
              <span style={{ color: '#be3232', cursor: "pointer", top: "0" }} onClick={(e) => handleReciveOpen(e, params.row.coin, params.row.network)}>Receive</span>
              <span style={{ color: '#be3232', cursor: "pointer", top: "0" }} onClick={(e) => handleHistoryOpen(e, params.row.coin, params.row.network)}>History</span>
              <span style={{ color: '#be3232', cursor: "pointer", top: "0" }} onClick={TradeHamdilerQuickBuy}>Trade</span>
            </>

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
                <h4><span>$</span> {totalusdt} USDT </h4>
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

          {/* Send Section Start */}
          <BootstrapDialog id="sedCoin"
            // onClose={handleSendClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleSendClose}>
              Transfer
            </BootstrapDialogTitle>
            <TabContext value={value}>
              <Box>
                <TabList onChange={handleChange} >
                  <Tab label="Send via Email" onClick={(e) => setEtype("E")} value="1" />
                  <Tab label="Send via Address" onClick={(e) => setEtype("A")} value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">

                <DialogContent dividers>
                  <Typography gutterBottom>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                      <div>
                        <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            type="text"
                            placeholder="Enter Reciever Email"
                            value={sCAddress}
                            multiline="true"
                            onChange={handleAddressChange}
                            label="Email"
                          />
                        </FormControl>
                        <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                          <OutlinedInput
                            id="outlined-adornment-amount"
                            type="number"
                            placeholder="Enter Amount"
                            value={sCAmount}
                            onChange={handleAmountChange}

                            endAdornment={
                              <InputAdornment position="end">
                                {(fromcoin === 'FUFI') ? 'Min 1000(FUFI)' : 'Min $10'}
                              </InputAdornment>
                            }
                            aria-describedby="outlined-weight-helper-text"
                            inputProps={{
                              "aria-label": "Total Sale",
                              type: "number",
                              pattern: "[0-9]*",
                              inputmode: "numeric",
                            }}
                            label="Amount"
                          />
                        </FormControl>
                      </div>
                    </Box>
                  </Typography>
                </DialogContent>
              </TabPanel>
              <TabPanel value="2">   <DialogContent dividers>
                <Typography gutterBottom>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <div>
                      <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Address</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          type="text"
                          placeholder="Enter Reciever Address"
                          value={sCAddress}
                          multiline="true"
                          onChange={handleAddressChange}
                          label="Address"
                        />
                      </FormControl>
                      <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-amount"
                          type="number"
                          placeholder="Enter Amount"
                          // multiline="true"
                          value={sCAmount}
                          onChange={handleAmountChange}
                          endAdornment={
                            <InputAdornment position="end">
                              {(fromcoin === 'FUFI') ? 'Min 1000(FUFI)' : 'Min $10'}
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
                      {(fromcoin === 'USDT(TRC20)') ?
                      <Box sx={{ display: 'flex',justifyContent: "space-between"}}>
                      <span><strong>Receive amount:</strong>{(sCAmount>0)?sCAmount-1:0.00} USDT </span>
                      <span><strong>Network fee:</strong>{(sCAmount>0)?1:0} USDT</span>
                      </Box>
                      :''}
                    </div>
                  </Box>
                </Typography>
              </DialogContent>
              </TabPanel>
            </TabContext>

            <DialogActions>

              {(isLoading) ?
                <Button id="paybutton">
                  <PulseBubbleLoader />
                  {/* Send Amount */}
                </Button> :
                <Button id="paybutton" onClick={handleSendCoin}>
                  Send Amount
                </Button>
              }

            </DialogActions>
            <p>  <strong>Disclaimer:-</strong><span style={{ fontSize: "small" }}>{(fromcoin === 'FUFI') ?
              'Please make sure that the currency is withdrawn on the FutureFi (FEP20) network, otherwise the withdrawal cannot be successful.'
              : 'Please make sure that the USDT is withdrawn on the TRC20 network, otherwise the withdrawal cannot be successful.Daily withdrawal amount 50 USDT'}</span></p>
          </BootstrapDialog>
          {/* send Section End */}
          {/* Recive Model Start  */}
          <BootstrapDialog style={{ marginTop: '5rem' }} id="sedCoin"
            aria-labelledby="customized-dialog-title"
            open={reciveOpen}
          >
            <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleReciveClose}>
              Receive
            </BootstrapDialogTitle>
            <DialogContent dividers>
              <Typography gutterBottom>
                <CardActionArea>
                  <CardContent style={{ margin: '0', padding: '0' }}>
                    <div style={{ background: 'white', padding: '0', textAlign: 'center' }}>
                      {address ? <QRCode value={address} /> : <QRCode value="" />}

                    </div>
                    <Typography variant="body2" color="text.secondary">
                      <div className="wallateaddres_codeCard">
                        <IconButton onClick={() => copyToClipBoard(address)}>
                          <p className='fa2_num'>{address}</p>
                          <ContentCopyIcon />
                        </IconButton>
                      </div>
                      <p className='alert'>{copySuccess}</p>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <span>{dtext}</span>
                {/* <CardActions>
      <button id="paybutton" disabled={loading}>
      Continue
        </button>
      </CardActions> */}
                {/* </Card> */}
              </Typography>
            </DialogContent>
            <DialogActions>
            </DialogActions>
          </BootstrapDialog>
          {/* Recive Model End  */}

          {/* Transfer hotWallet To p2p Wallet */}
          <BootstrapDialog id="sedCoin"
            // onClose={handleSendClose}
            aria-labelledby="customized-dialog-title"
            open={transferOpen}
          >
            <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleTransferClose}>
              Transfer USDT
            </BootstrapDialogTitle>
            <TabContext value={value}>
              <Typography gutterBottom>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div>
                    <InputLabel style={{ textAlign: "center", background: "#fc0" }} htmlFor="outlined-adornment-amount">
                      Choose Wallet
                    </InputLabel>
                    <div className="col-md-12" style={{ padding: 1 }}>
                      <Select className='WalletOptns' options={WalletOptions} onChange={handileChangeWallteOptions} components={animatedComponents} />
                    </div>

                    <FormControl className='frmControls' fullWidth sx={{ m: 1 }}>
                      {/* <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel> */}
                      {/* <OutlinedInput
                          id="outlined-adornment-amount"
                          type="number"
                          placeholder="Enter Amount"
                          // multiline="true"
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


                        /> */}
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
                        From Wallet
                      </FormHelperText>

                      <FormHelperText
                        className="labelnm"
                        id="outlined-weight-helper-text"
                      >
                        To Wallet
                      </FormHelperText>
                    </Box>

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
                        Spot Wallet
                      </FormHelperText>

                      <FormHelperText
                        className="labelnm"
                        id="outlined-weight-helper-text"
                      >
                        {walletLebal}

                      </FormHelperText>
                    </Box>

                    <FormControl className='frmControls frmrols' fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                      <OutlinedInput
                        className='outadount'
                        id="outlined-adornment-amount"
                        type="number"
                        placeholder="Enter Amount"
                        value={trnfAmount}
                        onChange={handleTransferAmountChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <button className='handlTransfer' onClick={handleMaxvalueTransfer}>Max</button>
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
                        Total Balance:{" "}
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
            <DialogActions>

              {(isLoading) ?
                <Button id="paybutton">
                  <PulseBubbleLoader />
                </Button> :
                <Button id="paybutton" onClick={handleTransferAmountSubmit}>
                  Transfer Amount
                </Button>
              }
            </DialogActions>
          </BootstrapDialog>


          {/* swap fufi to usdt funding wallet */}
          <BootstrapDialog id="sedCoin"
            // onClose={handleSendClose}
            aria-labelledby="customized-dialog-title"
            open={swapOpen}
          >
            <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleSwapClose}>
              Swap Fufi to Usdt
            </BootstrapDialogTitle>
            <TabContext value={value}>
              <Typography gutterBottom>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                  <div>
                    <FormControl className='frmControls frmrols' fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount">Amount You Pay</InputLabel>
                      <OutlinedInput
                        className='outadount'
                        id="outlined-adornment-amount"
                        type="number"
                        placeholder="Enter Amount"
                        value={swapam}
                        onChange={handleSwapAmountChange}
                        endAdornment={
                          <InputAdornment position="end">
                            <button className='handlTransfer' onClick={handleMaxvalueSwap}>Max</button>
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
                        Total Balance:{" "}
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

                    <FormControl className='frmControls frmrols' fullWidth sx={{ m: 1 }}>
                      <InputLabel htmlFor="outlined-adornment-amount"> Amount You Get</InputLabel>
                      <OutlinedInput
                        className='outadount'
                        id="outlined-adornment-amount"
                        type="number"
                        placeholder="Enter Amount"
                        value={swapusdtam}
                        onChange={handleSwapUsdtAmountChange}
                        label="Amount"
                        aria-describedby="outlined-weight-helper-text"
                        endAdornment={
                          <InputAdornment position="end">
                          </InputAdornment>
                        }
                        inputProps={{
                          "aria-label": "Total Sale",
                          type: "number",
                          pattern: "[0-9]*",
                          inputmode: "numeric",
                        }}


                      />
                    </FormControl>
                  </div>
                </Box>
              </Typography>
            </TabContext>
            <DialogActions>

              {(isLoading) ?
                <Button id="paybutton">
                  <PulseBubbleLoader />
                </Button> :
                <Button id="paybutton" onClick={handleSwapFufiToUsdtSubmit}>
                  Swap To Usdt
                </Button>
              }
              
            </DialogActions>
            <text><strong>Important -</strong> <span style={{fontSize:'12px'}}>Instantly, your FUFI Coin will be Converted to USDT <br></br> and Transferred to Funding  Wallet.</span></text>
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