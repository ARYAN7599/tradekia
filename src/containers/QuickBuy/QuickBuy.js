import React , {memo} from "react";
import { useNavigate } from "react-router-dom";
import { PulseBubbleLoader } from 'react-loaders-kit';
// import DollarSvg from "../../assets/images/totalBalance.svg";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
// import Loader from "../../components/Loader/Loader";
// import QRCode from "react-qr-code";
import Qrcode from '../../assets/images/Qrcode.png';
import "@djthoms/pretty-checkbox";
import Box from "@mui/material/Box";
import "./SCSS/QuickBuy.css";
import { connect } from "react-redux";
import { URL } from "../../helpers/global";
import axios from "axios";
import Swal from "sweetalert2";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import walletIcone from "../../assets/images/icons8-euro-account-64.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import FormHelperText from "@mui/material/FormHelperText";
import PaymentIframe from './PaymentIframe';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { event } from "jquery";
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
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
            position: "absolute",
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
  { label: "Spot Wallet", value: 'sw' },
  // { label: "Funding Wallet", value: 'fw' }
];

const animatedComponents = makeAnimated();

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const QuickBuy = (props) => {
  const [ischecked, setIschecked] = React.useState(false);
  const [isiframeopen, setIsiframeopen] = React.useState(false);
  const [symble, setSymble] = React.useState([]);
  const [rowData, setRowData] = React.useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [orderAmount, setOrderAmount] = React.useState(1000);
  const [trxprize, setTrxprize] = React.useState();
  const [loading, setLoading] = React.useState(false);
  const [isdtaloding, setIsdtaloding] = React.useState(true);
  const [fromcoin, setFromcoin] = React.useState();
  const [usdtPrize, setUsdtPrize] = React.useState();
  const [scoinPrizeI, setScoinPrizeI] = React.useState();
  const [scoinPrizeUsdt, setScoinPrizeUsdt] = React.useState();
  const [sellOpen, setSellOpen] = React.useState(false);
  const [coinAmount, setCoinAmount] = React.useState("00");
  const [sellCoinAmount, setSellCoinAmount] = React.useState(10);
  const [sellCoin, setSellCoin] = React.useState();
  const [reCoin, setReCoin] = React.useState();
  const [orderROpen, setOrderROpen] = React.useState(false);
  const [buyCoinNetwork, setBuyCoinNetwork] = React.useState();
  const [payData, setPayData] = React.useState({});
  const [minutes, setMinutes] = React.useState("5");
  const [seconds, setSeconds] = React.useState("01");
  const [paymet, setPatmet] = React.useState('qrcode');
  const [copySuccess, setCopySuccess] = React.useState('');
  const [payDetOpen, setPayDetOpen] = React.useState(false);
  const [trxId, setTrxID] = React.useState('');
  const [fufiaddress, setFufiaddress] = React.useState();
  const [payAmount, setPayAmount] = React.useState();
  const [payScShort, setPayScShort] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [value, setValue] = React.useState("1");
  const [totalcoinsget, setTotalcoinsget] = React.useState(parseFloat(orderAmount) / parseFloat(trxprize));
  const [sidOpen, setSidOpen] = React.useState(false);
  const [tusdt, setTusdt] = React.useState();
  const [sfufiaddress, setSfufiaddress] = React.useState();
  const [uUsdtWallet, setUUsdtWallet] = React.useState();
  const [rwusdt, setRwusdt] = React.useState();
  const [appemail, setAppemail] = React.useState();
  const [issubmit, setIssubmit] = React.useState(false);
  const [waltype , setWaltype] = React.useState('sw'); 
  const [isappemail, setIsappemail] = React.useState(true); 

  const handileChangeWallteOptions = (event) => {
    console.log("wall",event.value );

    let isap = (event.value==='sw'?true:false);
    setIsappemail(isap);
    getUserwalletInfo(event.value); 
    setWaltype(event.value); 
    
      }

  const handileApplyenEmail = (event) => {
    setAppemail(event.target.value);
  }
  const reqTObeaSidold = () => {
    setIssubmit(true);
    if (!sfufiaddress || !sfufiaddress.length) {
      setIssubmit(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Address should not be empty",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSidClose();

        }
      });

    }

    if (!tusdt || !tusdt.length) {
      setIssubmit(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Amount should not be empty",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSidClose();

        }
      });

    }
    let data = JSON.stringify({
      "userId": props.userId,
      "address": sfufiaddress,
      "usdtamount": tusdt,
      "lastPrice": usdtPrize,
      "apemail": appemail,
      "wtype" : waltype
    });

    var config = {
      method: 'post',
      url: `${URL}requesttobeasid`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${props.token}`
      },
      data: data
    };
    axios(config).then(function (response) {
      console.log("dehjbdfbhd", response);
      setIssubmit(false);
      if (response.data.status) {
        Swal.fire(
          'Well Done',
          'Your Request has been Successfully submitted',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            // navigate('/wallet');
            handleSidClose();
            window.location.reload();
          }
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response.data.message,
        }).then((result) => {
          if (result.isConfirmed) {
            handleSidClose();
            window.location.reload();
          }
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  }
  
  const reqTObeaSid = () => {
    setIssubmit(true);
    if (!sfufiaddress || !sfufiaddress.length) {
      setIssubmit(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Address should not be empty",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSidClose();

        }
      });

    }

    if (!tusdt || !tusdt.length) {
      setIssubmit(false);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "Amount should not be empty",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSidClose();

        }
      });

    }
    let data = JSON.stringify({
      "userId": props.userId,
      "address": sfufiaddress,
      "usdtamount": tusdt,
      "lastPrice": usdtPrize,
      "apemail": appemail,
      "wtype" : waltype
    });
    
    const waitTime = 5000;
    const handleError = error => {
        // this makes sure that the FAIL output isn't repeated in the case when there's a failure before the timeout
        if (!error.handled) {
            if (error.timedout) {
                Swal.fire(
                    'Well Done',
                    'Your Request has been Successfully submitted',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                      // navigate('/wallet');
                      handleSidClose();
                      window.location.reload();
                    }
                  });
            } else {
                console.log("FAIL!", error.message);
                error.handled = true;
                throw error;
            }
        }
    };
    var config = {
        method: 'post',
        url: `${URL}requesttobeasid`,
        headers: {
          'Content-Type': 'application/json',
          'x-access-token' : `${props.token}`
        },
        data: data
      };
      const myRequest = axios(config).then(function (response) {
        console.log("dehjbdfbhd", response);
        setIssubmit(false);
        if (response.data.status) {
          Swal.fire(
            'Well Done',
            'Your Request has been Successfully submitted',
            'success'
          ).then((result) => {
            if (result.isConfirmed) {
              // navigate('/wallet');
              handleSidClose();
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response.data.message,
          }).then((result) => {
            if (result.isConfirmed) {
              handleSidClose();
              window.location.reload();
            }
          });
        }
      }).catch(handleError);
    const timer = new Promise((_, reject) => setTimeout(reject, waitTime, {timedout: "request taking a long time"}));
    console.log("KKKKKKKK",timer); 
    
    return Promise.race([myRequest, timer]).catch(handleError);
};

  const getUserwalletInfo = (wtype) => {
    var data = {
      user_id: props.userId,
    };
    let config = {
      method: "post",
      url: (wtype ==='sw')?`${URL}getTotalWaletData`: `${URL}getTotalFundingWaletData`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : `${props.token}`
      },
      data: data,
    };
   
    axios(config).then((res) => {
      let r = res.data.data;
      console.log("**********************", r);

      // const result = r.find((el) => {
      //   if (el.coin === "FUFI") return true;
      // });
      const rest = r.find((el) => {
        if (el.coin === "USDT(TRC20)") return true;
      });
      // if (result !== undefined) {
      //   setToSb(result.totalWalet);
      // }
      if (rest !== undefined) {
        setUUsdtWallet(rest.totalWalet);
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        // toast.error("Some error occured, please try again some time.", {
        //   position: "bottom-center",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        // });
      }
    });
  };

  const handleMaxAmount = () => {
    setRwusdt("0")
    setTusdt(uUsdtWallet);
  }

  //Sell Side Code Start
  const handilePaymentOptionsChange = async (e, option) => {
    setPatmet(option);
  }

  const handileSidFufiAddress = (event) => {
    let str = event.target.value;
    const toCheckString = '0';
    if (!str.startsWith(toCheckString)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: "invalid address",
      }).then((result) => {
        if (result.isConfirmed) {
          handleSidClose();

        }
      });

    }
    setSfufiaddress(event.target.value);
  }

  const handileUSDTAMount = (event) => {
    let rus = parseFloat(uUsdtWallet) - parseFloat(event.target.value);
    setRwusdt(rus);
    setTusdt(event.target.value);
  }

  const handleCoinAmountChange = (event) => {
    setTotalcoinsget(event.target.value);
    let oamount = parseFloat(event.target.value) * parseFloat(trxprize);
    setOrderAmount(oamount);
  }
  //get wallet amount with coin letest prize
  const getWalletAmount = async (coi) => {
    setSellCoin(coi);
    let data = JSON.stringify({
      userId: `${props.userId}`,
    });
    let config = {
      method: "post",
      url: `${URL}getCoinWalletWithLetestPrize`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : `${props.token}`
      },
      data: data,
    };
    await axios(config)
      .then(async function (res) {
        if (res.data.data && res.data.data.length > 0) {
          const result = res.data.data.find((ele) => ele.coin === coi);
          setScoinPrizeI(result?.Inrprize);
          setCoinAmount(result?.amount);
          setScoinPrizeUsdt(result?.UsdtPrize);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handletrxSubmit = () => {
    setIsLoading(true);
    let bodyFormData = new FormData();
    bodyFormData.append('toamount', parseFloat(orderAmount) / parseFloat(trxprize));
    bodyFormData.append('trx_id', trxId);
    bodyFormData.append('tocurrency', fromcoin);
    bodyFormData.append('userId', props.userId);
    bodyFormData.append('currency', "INR");
    bodyFormData.append('amount', orderAmount);
    bodyFormData.append('fufi_address', fufiaddress);
    bodyFormData.append('images[]', payScShort);
    bodyFormData.append('last_prize', usdtPrize);
    axios.post(`${URL}paymentInciated`, bodyFormData, {
      headers: {
        'x-access-token': props.token,
        'Content-Type': 'multipart/form-data, application/json',
        'Accept': 'application/json, multipart/form-data',
      }
    }).then(res => {

      if (res.data.status) {
        setIsLoading(false);
        Swal.fire(
          'Well Done',
          'Your Payment  has been  Successfully submitted',
          'success'
        ).then((result) => {
          if (result.isConfirmed) {
            navigate('/wallet');
          }
        });
      } else {
        setIsLoading(false);

      }
    }).catch(error => {
      console.log("res *********************************", error);
      setIsLoading(false);
      if (error.response.status === 401) {

      }
    });
  }
  const scShortChangeHandler = (event) => {
    setPayScShort(event.target.files[0]);
    // if (event.target.files[0]) {
    //     setFrontImagesPreview({
    //         frontSrc: URL.createObjectURL(event.target.files[0]),
    //         alt: event.target.files[0].name
    //     });
    // }
  }
  const handleSellSideOpen = (e, coin) => {
    getWalletAmount(coin);
    setFromcoin(coin);
    setSellOpen(true);
  };
  const handleSellSideClose = (e, coin) => {
    setSellOpen(false);
  };

  // const Paytimer=()=>{
  React.useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  // }

  const handleSellCoinChange = (event) => {
    let r = parseFloat(coinAmount) - parseFloat(event.target.value);
    setReCoin(r);
    setSellCoinAmount(event.target.value);
  };
  const handleOrderRClose = () => {
    setOrderROpen(false);

  };
  const handleOrderROpen = () => {
    setOrderROpen(true);
    setSellOpen(false);
    // Paytimer(); 
  };
  const tradeHandler = (e, coin, network) => {
    // navigate('/trade');
    navigate("/trade", { state: { pairdata: coin } });
    window.location.reload();
  };

  const handleSidOpen = (e, coin, network) => {
    getallSymble(coin);
    getUserwalletInfo(waltype);
    setSidOpen(true);

  }

  const handleSidClose = () => {
    setTusdt();
    setSidOpen(false);

  }
  const SellCoinHandler = async () => {
    var data = JSON.stringify({
      amount: sellCoinAmount,
      tocoin: sellCoin,
      fromcoin: "INR",
      fromamount: sellCoinAmount * scoinPrizeI,
      userId: `${props.userId}`,
      usdtvalue: parseFloat(sellCoinAmount) * parseFloat(scoinPrizeUsdt),
    });
    var config = {
      method: "post",
      url: `${URL}sellOrder`,
      headers: {
        //'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDk3NTk5NzEsImV4cCI6MTY0OTc2MDg3MX0.5eLj_CGzXUnnLXZ7uucTMpyuNKf4_FJseLOkSEMNZ78',
        "Content-Type": "application/json",
        'x-access-token' : `${props.token}`
      },
      data: data,
    };
    await axios(config).then(function (response) {
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: response.data.msg,
          showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            // window.location.reload();
            navigate("/wallet");
          }
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  };

  //Sell Side code End
  // buy Side Code  Start
  const limtQpHandler = (e, lpa) => {
    let am = parseFloat(orderAmount);
    let total = lpa + am;
    let gcoin = parseFloat(total) / parseFloat(trxprize);
    setTotalcoinsget(gcoin);
    setOrderAmount(total);
  };
  //get trx letest prize
  const getallSymble = (coi) => {
    let data = JSON.stringify({
      coin: coi,
    });
    let config = {
      method: "post",
      url: `${URL}getsymbleLetestPrize`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : `${props.token}`
      },
      data: data,
    };
    // axios.get(`https://api.wazirx.com/sapi/v1/tickers/24hr`)
    // axios.get(`https://api.tradekia.com/api/getallsymbleWithLetestPrize`)///
    axios(config).then((res) => {
      if (res.data.status) {
        // const result = res.data.data.find(ele => ele.coin === coi);
        // console.log("result?.Inrprize",result?.Inrprize,"result?.UsdtPrize",result?.UsdtPrize,"coi",coi);
        setTrxprize(res?.data?.data?.cInrprize);
        setUsdtPrize(res?.data?.data?.cUsdtPrize);
        console.log("res?.data?.data?.cUsdtPrize",res?.data?.data?.cUsdtPrize)
      }
    }).catch((error) => {
      console.log("error", error);
    });
  };
  //load razorPay
  const RedirectPage = () => {
    setPaymentOpen(false);
    let data = {
      amount: orderAmount,
      name: props.name,
      fromcoin: fromcoin,
      tocoin: "INR",
      trxprize: trxprize,
      userId: props.userId,
      network: buyCoinNetwork,
      usdtPrize: usdtPrize,
      email: props.email
    }
    setPayData(data);
    setPayDetOpen(false);
    setIsiframeopen(true);

  }
  React.useEffect(() => {
    let cg = parseFloat(orderAmount) / parseFloat(trxprize);
    setTotalcoinsget(cg);
  }, [trxprize]);
  const handleIframeClose = () => {
    setIsiframeopen(false);
  }

  const handleClickOpen = (e, coin, network) => {
    getallSymble(coin);
    setFromcoin(coin);
    setBuyCoinNetwork(network);
    setOpen(true);
  };

  const tecnicalUsies = () => {
    Swal.fire({
      icon: "info",
      title: "Due to some technical issues ,Your payment will not proceed . Please wait and try some time later ",
      showCancelButton: true,
      confirmButtonText: "Ok",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.reload();
        // navigate("/wallet");
      }
    });
  }
  const copyToClipBoard = async (copyMe) => {
    try {
      await navigator.clipboard.writeText(copyMe);
      setCopySuccess('Copied!');
    } catch (err) {
      setCopySuccess('Failed to copy!');
    }
  };
  const handlePaymentOpen = () => {
    setPaymentOpen(true);
    setOpen(false);
  };
  const handleWalletChange = (event) => {
    let gcoin = parseFloat(event.target.value) / parseFloat(trxprize);
    setTotalcoinsget(gcoin);
    setOrderAmount(event.target.value);
  };

  const handlepayAmountchange = (event) => {
    // setPayAmount(event.target.value); 
    setOrderAmount(event.target.value)
  }
  const handleFUFIAddressChange = (event) => {
    setFufiaddress(event.target.value);
  }

  const handleTrxIdChange = (event) => {
    setTrxID(event.target.value);
  }
  const handlePayDetClose = () => {
    setOpen(false);
    setPayDetOpen(false);
  }
  const handlePayDetOpen = () => {
    setOpen(false);
    setIsiframeopen(false);
    setPayDetOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
    let cg = 1000 / parseFloat(trxprize);
    setTotalcoinsget(cg);
    setOrderAmount(1000);
  };

  const handlePaymentClose = () => {
    setPaymentOpen(false);
  };

  const getUserInfo = async () => {
    setIsdtaloding(true);
    try {
      let config = {
        method: "get",
        // url: `${URL}getallsymbleWithLetestPrize`,
        url: `${URL}/getallsymbleWithLetestPrize`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token' : `${props.token}`
        },
      };
      await axios(config).then(async function (res) {
        if (res?.data?.data?.length > 0) {
          let rdata = res?.data?.data;
          setIsdtaloding(false);
          setRowData(rdata);
        }
      })
        .catch(function (error) {
          console.log("first Error", error);
        });
    } catch (err) {
      console.log(err);
    }
  };
  // Buy Side code End

  React.useEffect(() => {
    getUserInfo();
    setSymble(props.symbleP);
  }, [ischecked]);

  let internationalNumberFormat = new Intl.NumberFormat("en-US");
  const columns = [
    {
      field: "coin",
      headerName: " Popular Coins",
      minWidth: 150,
      flex: 0.3,
      renderCell: (params) => {
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
            }}
          >
            <span>
              <img
                style={{ height: "20px", width: "20px" }}
                src={params.row.symble_url}
              />
            </span>
            <span style={{ marginLeft: "10px" }}>
              {params.row.coin + "/" + params.row.pair}
            </span>
          </Box>
        );
      },
    },
    {
      field: "cprize",
      headerName: "Price",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      // format: (value) => value.toFixed(4),
      // format: (value) => value.toLocaleString('en-US'),
      alignItems: "center",
    },
    {
      field: "change24h",
      headerName: "24h Change",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      // alignItems: 'center',
      renderCell: (params) => {
        console.log("params.row.change24h",params.row.change24h)
        let ch24h = params.row.change24h.toString();
        let cd = ch24h.substring(1);
        cd = Number(cd);
        return ch24h.slice(0, 1) == "-" ? (
          <span
            style={{
              color: "#d9442e",
              minWidth: "125.855px",
              maxWidth: "171.855px",
              lineHeight: "51px",
              minHeight: "52px",
              maxHeight: "52px",
            }}
          >
            {/* {"+"+internationalNumberFormat.format((cd).toFixed(5))+"%"} */}
            {ch24h}
          </span>
        ) : (
          <span
            style={{
              color: "#76b840",
              minWidth: "125.855px",
              maxWidth: "171.855px",
              lineHeight: "51px",
              minHeight: "52px",
              maxHeight: "52px",
            }}
          >
            {/* {"-"+internationalNumberFormat.format((cd).toFixed(5))+"%"} */}
            {ch24h}
          </span>
        );
      },
    },
    {
      field: "hInrprize",
      headerName: "24h High",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      alignItems: "center",
    },
    {
      field: "lInrprize",
      headerName: "24h Low",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      alignItems: "center",
    },
    {
      field: "valume24h",
      headerName: "24h Volume",
      minWidth: 150,
      lineHeight: 2,
      // type: "number",
      flex: 0.3,
      // format: (value) => value.toFixed(4),
      alignItems: "center",
      renderCell: (params) => {
        return params.row.pair === "USDT" ? (
          <span>
            {"$ " +
              internationalNumberFormat.format(params.row.valume24h.toFixed(5))}
          </span>
        ) : (
          <span>
            {"INR " +
              internationalNumberFormat.format(params.row.valume24h.toFixed(5))}
          </span>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        return (
          <>
            {(props.token && props.userId) ?
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {params.row.pair === "USDT" ? (
                  <Box sx={{
                    display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
                    width: "100%"
                  }}>
                    <span
                      className="quickb"
                      onClick={(e) => {
                        tradeHandler(e, params.row.coin, params.row.network);
                      }}
                    >
                      Trade
                    </span>
                    <span
                      className="quickb"
                      onClick={(e) => {
                        //  tecnicalUsies(); 
                        handleSidOpen(e, params.row.coin, params.row.network);

                      }}
                    >
                      SID
                    </span>

                  </Box>
                ) : (
                  <>
                    {/* <span style={{ color: '#29e70c' }} onClick={handleClickOpen}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#29e70c" }} />Deposit</span> */}
                    {/* <span
                      className="quickbuys"
                      onClick={(e) => {
                        //  tecnicalUsies(); 
                        handleClickOpen(e, params.row.coin, params.row.network);

                      }}
                    >
                      BUY SID'S
                    </span> */}
                    {/* <span style={{ color: '#be3232',cursor: "pointer", marginLeft: "10px" }} onClick={(e) => { handleSellSideOpen(e, params.row.coin); }}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#be3232" }} />Sell</span> */}
                    {/* <span  title="Comming Soon"><SwapHorizontalCircleIcon style={{ fontSize: "small", color: "slategrey" }} />Trade</span> */}
                  </>
                )

                }
              </Box>
              :
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                {params.row.pair === "USDT" ? (
                  <span
                    className="quickb"
                  // onClick={(e) => {
                  //   tradeHandler(e, params.row.coin, params.row.network);
                  // }}
                  >
                    Trade
                  </span>
                ) : (
                  <>
                    {/* <span style={{ color: '#29e70c' }} onClick={handleClickOpen}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#29e70c" }} />Deposit</span> */}
                    {/* <span
                      className="quickbuys"
                    // onClick={(e) => {
                    //   handleClickOpen(e, params.row.coin, params.row.network);
                    // }}
                    // >
                    //   BUY SID'S
                    // </span> */}
                    {/* <span style={{ color: '#be3232',cursor: "pointer", marginLeft: "10px" }} onClick={(e) => { handleSellSideOpen(e, params.row.coin); }}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#be3232" }} />Sell</span> */}
                    {/* <span  title="Comming Soon"><SwapHorizontalCircleIcon style={{ fontSize: "small", color: "slategrey" }} />Trade</span> */}
                  </>
                )}
              </Box>
            }
          </>

        )

      },
    },
  ];


  return (
    <div className="quickby" style={{ marginTop: "35px" }}>
      <div className="balanceSheet">
        <h1 className="balance" style={{ paddingLeft: "15px" }}>
          Markets
        </h1>
        <div className="balanceSheet_div" id="popularoins">
          {isdtaloding ? (
            <Box sx={{ height: 500 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <DataGrid
              rows={rowData}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              autoPageSize="true"
            />
          )}
          {/* Start First Payment Model  */}
        </div>
      </div>
      <BootstrapDialog xs={3}
        className="bootbuyform"
        // onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={open}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title"
          onClose={handleClose}
        >
          {/* Add money to wallet */}
          {fromcoin}
        </BootstrapDialogTitle>

        <DialogContent className="dlogtent" dividers>
          <Typography gutterBottom>
            <img src={walletIcone} style={{ height: "20px", width: "20px" }} />
            <span style={{ paddingLeft: "5px" }}>
              {" "}
              Amount You Pay : ₹ {orderAmount}
            </span>
          </Typography>
          <Typography gutterBottom>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                    Amount(INR)
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    fullWidth="true"
                    value={orderAmount}
                    onChange={handleWalletChange}
                    endAdornment={
                      <InputAdornment position="end">
                        Min ₹ 1000 - Max ₹ 5L
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">₹</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => {
                      limtQpHandler(e, 1000);
                    }}
                    id="outlined-weight-helper-text"
                  >
                    +₹ 1000
                  </Button>
                  <Button
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => {
                      limtQpHandler(e, 5000);
                    }}
                    id="outlined-weight-helper-text"
                  >
                    +₹ 5000
                  </Button>
                  <Button
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => {
                      limtQpHandler(e, 10000);
                    }}
                    id="outlined-weight-helper-text"
                  >
                    +₹ 10000
                  </Button>

                  {/* <Button onClick={(e) => { limtQpHandler(e, 1000); }} id="outlined-weight-helper-text">+1000</Button> */}
                </Box>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                    Coins You Get
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    value={totalcoinsget}
                    onChange={handleCoinAmountChange}
                    fullWidth="true"
                    endAdornment={
                      <InputAdornment position="end">
                        {
                          "(" +
                          fromcoin +
                          ")"}
                      </InputAdornment>
                    }
                    // startAdornment={
                    //   <InputAdornment position="start">{
                    //     "(  " +
                    //     fromcoin +
                    //     ") Coin " } </InputAdornment>
                    // }
                    label="Amount"
                  />
                </FormControl>
              </div>
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button id="paybutton" className="paybton" onClick={handlePaymentOpen}>
            Order Review
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* End First Payment Model */}
      {/* Start Seccond Payment Model  */}
      <BootstrapDialog xs={3}
        className="bootbuyform"
        // onClose={handlePaymentClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={paymentOpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title"
          onClose={handlePaymentClose}
        >
          {fromcoin}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Card sx={{ maxWidth: 445, border: "1px solid green" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    <span style={{ textAlign: "left" }}>Amount You Pay </span>{" "}
                    <br />
                    <span style={{ textAlign: "left" }}>₹ {orderAmount}</span>
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <span style={{ textAlign: "left" }}>Coins You Get </span>
                    <br />
                    <span style={{ textAlign: "left" }}>
                      {parseFloat(orderAmount) / parseFloat(trxprize) +
                        "(" +
                        fromcoin +
                        ")"}
                    </span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <button
                  id="paybutton"
                  disabled={loading}
                  onClick={loadRazorpay}
                > */}
                <button id="paybutton" disabled={loading} onClick={RedirectPage}>
                  Continue To Pay
                  {/* </Link> */}
                </button>
                {/* </button> */}
              </CardActions>
            </Card>
          </Typography>
        </DialogContent>
        <DialogActions></DialogActions>
      </BootstrapDialog>
      {/* End Seccond Payment Model */}
      {/* Start Sell Side First Model  */}

      <BootstrapDialog xs={3}
        className="bootbuyform"
        // onClose={handleSellSideClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={sellOpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title"
          onClose={handleSellSideClose}
        >
          {sellCoin}
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {/* <img src={walletIcone} style={{ height: "20px", width: "20px" }} /> */}
            <span style={{ paddingLeft: "5px" }}>
              {" "}
              No. Of Coins You Want to Sell :{" "}
            </span>
            <span style={{ color: "blue" }}>{sellCoinAmount}</span>
          </Typography>
          <Typography gutterBottom>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Coins
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    value={sellCoinAmount}
                    onChange={handleSellCoinChange}
                    endAdornment={
                      <InputAdornment position="end">{sellCoin}</InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
                <Box sx={{ display: "flex" }}>
                  <Typography gutterBottom>
                    <img
                      src={walletIcone}
                      style={{ height: "20px", width: "20px" }}
                    />

                    <span style={{ paddingLeft: "5px" }}>
                      {" "}
                      Current Available Bal. :{" "}
                      {reCoin !== undefined ? (
                        reCoin >= 0 ? (
                          reCoin
                        ) : (
                          <span style={{ color: "red" }}>
                            Insufficient Balance
                          </span>
                        )
                      ) : (
                        coinAmount
                      )}
                    </span>
                  </Typography>
                </Box>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel htmlFor="outlined-adornment-amount">
                    Amount You Get
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    startAdornment={
                      <InputAdornment position="start">
                        ₹{sellCoinAmount * scoinPrizeI}
                      </InputAdornment>
                    }
                    label="Amount"
                  />
                </FormControl>
              </div>
            </Box>
          </Typography>
          <Typography gutterBottom></Typography>
        </DialogContent>
        <DialogActions>
          {reCoin !== undefined && reCoin >= 0 ? (
            <Button id="sellbutton" onClick={handleOrderROpen}>
              Order Review
            </Button>
          ) : (
            <button className="otp_acc_btn grey_submit">Order Review</button>
          )}
          {/* <Button id="sellbutton" onClick={handleOrderROpen}>
                Order Review
              </Button> */}
        </DialogActions>
      </BootstrapDialog>
      {/* End Sell Side  first Model End  */}
      {/* Start Sell Side Seccond Model */}
      <BootstrapDialog xs={3}
        className="bootbuyform"
        // onClose={handleOrderRClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={orderROpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title"
          onClose={handleOrderRClose}
        >
          Order Review
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Card sx={{ maxWidth: 445, border: "1px solid green" }}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    <span>Selling Amount (Coins) </span> <br />
                    <span>{sellCoinAmount + "(" + sellCoin + ")"}</span>
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    <span>Amount You Get (INR) </span>
                    <br />
                    <span>₹ {sellCoinAmount * scoinPrizeI}</span>
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <button
                  id="sellbutton"
                  disabled={loading}
                  onClick={SellCoinHandler}
                >
                  Ready To Sell
                </button>
              </CardActions>
            </Card>
          </Typography>
        </DialogContent>
      </BootstrapDialog>
      {/* end Sell Side Seccond Model  */}


      <BootstrapDialog xs={3}
        className="bootbuyform"
        // onClose={handleIframeClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={isiframeopen}
      >
        <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleIframeClose}>
          Preferred Payment Options
        </BootstrapDialogTitle>
        <Box>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  className="mtghjy"
                  label="UPI Id"
                  onClick={(e) => setPatmet("qrcode")}
                  value="1"
                />
                <Tab
                  className="mtghjy"
                  label="Account"
                  onClick={(e) => setPatmet("account")}
                  value="2"
                />
              </TabList>
            </Box>
            {/* Limit Side Buy Or Sell Code Start  */}
            <TabPanel
              id="tabOutline"
              value="2"
              style={{ marginTop: "8px" }}
            >
              <Typography gutterBottom>
                <Card sx={{ maxWidth: 445, border: "1px solid green" }}>
                  <CardActionArea>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
                        <span>Account Holder Name</span> <br />
                        <span> NINETEEN REALTECH LABS PRIVATE LIMITED </span>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span>Account Number:-</span>
                        <span> 10074947406 </span>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span>IFSC CODE :-</span>
                        <span> IDFB0021252</span>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span>Payment Type :-</span>
                        <span> IMPS</span>
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        <span>Amount payable:-</span>
                        <span> {orderAmount}</span>
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Typography>
              <CardActions>
                <button
                  id="sellbutton"
                  disabled={loading}
                  onClick={handlePayDetOpen}
                >
                  Next
                </button>
              </CardActions>
            </TabPanel>



            {/* Limit Side Buy Or Sell Code End  */}
            {/* Marcket  Side Buy Or Sell Code Start  */}
            <TabPanel
              id="tabOutline"
              value="1"
              style={{ marginTop: "8px" }}
            >
              <DialogContent dividers>
                <Typography gutterBottom>
                  {/* <Card sx={{ maxWidth: 445, border: "1px solid green" }}> */}
                  <CardActionArea>
                    <CardContent style={{ margin: '0', padding: '0' }}>
                      {/* <div style={{ background: 'white', padding: '0' ,textAlign: 'center' }}>
                    <img src={Qrcode} alt="login" />
                    </div> */}
                      <Typography variant="body2" color="text.secondary">
                        <div className="wallateaddres_codeCard">
                          <IconButton onClick={() => copyToClipBoard("nineteen@kotak")}>
                            <span>UPI Id:</span><p className='fa2_num'>nineteen@kotak</p>
                            <ContentCopyIcon />
                          </IconButton>
                        </div>
                        <p className='alert'>{copySuccess}</p>
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        <div className="wallateaddres_codeCard">
                          <span>Amount payable:</span><p className='fa2_num'>{orderAmount}</p>
                        </div>
                      </Typography>
                    </CardContent>
                  </CardActionArea>

                </Typography>
              </DialogContent>
              <CardActions>
                <button
                  id="sellbutton"
                  disabled={loading}
                  onClick={handlePayDetOpen}
                >
                  Next
                </button>
              </CardActions>
            </TabPanel>
          </TabContext>
        </Box>


      </BootstrapDialog>

      {/* Choose Payment Options End */}
      {/* Start Payment detaiels open Model */}

      <BootstrapDialog xs={3}
        className="bootbuyform"
        aria-labelledby="customized-dialog-title"
        open={payDetOpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title"
          onClose={handlePayDetClose}
        >
          <ArrowBackIos disabled={loading} onClick={RedirectPage} sx={{ fontSize: 12, cursor: "pointer" }} />
        </BootstrapDialogTitle>
        <DialogContent className="dlogtent" dividers>
          <Typography gutterBottom>
            {/* <div className="vpers_card"> */}
            <div className="vpers_firstdiv">
              <h3>Payment details </h3>
              <div >
                <div>
                  <input
                    type="text"
                    placeholder="Amount"
                    required
                    className="vpers_inp12"
                    value={orderAmount}
                    onChange={handlepayAmountchange} />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="Trx Id"
                    className="vpers_inp12"
                    value={trxId}
                    onChange={handleTrxIdChange} />
                </div>

                <div>
                  <input
                    type="text"
                    placeholder="FUFI Wallet Address"
                    required
                    className="vpers_inp12"
                    value={fufiaddress}
                    onChange={handleFUFIAddressChange} />
                </div>

                {/* <div className='uploadDiv'>
                            <label htmlFor="attachIdPhoto"  className='vself_upl'><p>Upload</p> <ArrowUpwardIcon fontSize='16' /></label>
                            <input type="file" id="attachIdPhoto" accept="image/*" style={{ display: 'none' }} onChange={scShortChangeHandler} />
                            {idFilePhoto ? idFilePhoto.name : null}
                        </div> */}

                {/* <label htmlFor="attachIdPhoto"  className='vself_upl'><p>Upload</p></label> */}
                <h3> Upload Payment Screenshot</h3>
                <div>
                  <input
                    type="file"
                    required
                    className="vpers_inp12 vper_width"
                    accept="image/*"
                    onChange={scShortChangeHandler} />
                </div>
              </div>
            </div>

          </Typography>

        </DialogContent>

        <DialogActions>
          {isLoading ?
            <Button id="paybutton" className="paybton" onClick={handletrxSubmit}>
              <PulseBubbleLoader />
            </Button>
            :
            <Button id="paybutton" className="paybton" onClick={handletrxSubmit}>
              Submit
            </Button>
          }


          {/* 
          <Button id="paybutton" className="paybton" onClick={handletrxSubmit}>
           Payment Submit
          </Button> */}
        </DialogActions>
      </BootstrapDialog>


      {/* Start Sid Section Code  */}
      <BootstrapDialog xs={3}
        className="bootbuyform"
        // onClose={handleSidClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={sidOpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title"
          onClose={handleSidClose}
        >
          {/* Add money to wallet */}
          {fromcoin}
        </BootstrapDialogTitle>

        <DialogContent className="dlogtent" dividers>
          <Typography gutterBottom>
            <img src={walletIcone} style={{ height: "20px", width: "20px" }} />
            <span style={{ paddingLeft: "5px" }}>
              {" "}
              USDT Amount : $ {uUsdtWallet}
            </span>
          </Typography>
          <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                  Choose Wallet 
                  </InputLabel>
          <div className="col-md-12">
            <Select options={WalletOptions} onChange={handileChangeWallteOptions} components={animatedComponents}  />
          </div>

          <Typography gutterBottom>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                    Amount($)
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    fullWidth="true"
                    value={tusdt}
                    onChange={handileUSDTAMount}
                    endAdornment={
                      <InputAdornment position="end" style={{ cursor: "pointer" }} onClick={handleMaxAmount}>
                        Max
                      </InputAdornment>
                    }
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                    label="Enter USDT Amount"
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
                    Total
                  </FormHelperText>
                  <FormHelperText
                    className="labelnm"
                    id="outlined-weight-helper-text"
                  >
                    Balance:{" "}
                    {rwusdt !== undefined ? (
                      rwusdt >= 0 ? (
                        rwusdt
                      ) : (
                        <span style={{ color: "red" }}>
                          Insufficient Balance
                        </span>
                      )
                    ) : (
                      uUsdtWallet
                    )}
                  </FormHelperText>
                </Box>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                    FufiEdge Address
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="text"
                    value={sfufiaddress}
                    onChange={handileSidFufiAddress}
                    fullWidth="true"
                    label="Enter Fufi Edige Address."
                  />
                </FormControl>
                    {(isappemail)?
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                    User Email id 
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="email"
                    value={appemail}
                    onChange={handileApplyenEmail}
                    fullWidth="true"
                    label="Enter Fufi Edige Address."
                  />
                </FormControl>
                :''}
              </div>
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          {issubmit ?
            <Button id="paybutton" className="paybton" onClick={reqTObeaSid}>
              <PulseBubbleLoader />BeaSid
            </Button>
            :
            <Button id="paybutton" className="paybton" onClick={reqTObeaSid}>
              BeaSid
            </Button>
          }
        </DialogActions>
      </BootstrapDialog>

      {/* End SId Section Code */}

    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    id: state.id,
    userId: state.user_id,
    token: state.token,
    email: state.email,
    name: state.name,
    symbleP: state.payerSymble,
  };
};

export default connect(mapStateToProps)(memo(QuickBuy));
