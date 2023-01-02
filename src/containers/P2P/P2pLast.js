import React from "react";
import { useNavigate } from "react-router-dom";
import { PulseBubbleLoader } from 'react-loaders-kit';
import { makeStyles } from "@material-ui/core/styles";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { DataGrid } from "@material-ui/data-grid";
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";
import Avatar from '@mui/material/Avatar';
import "@djthoms/pretty-checkbox";
import Box from "@mui/material/Box";
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Paper from "@material-ui/core/Paper";
import Hidden from "@material-ui/core/Hidden";
import Grid from "@mui/material/Grid";
import ButtonGroup from '@mui/material/ButtonGroup';
import "./SCSS/P2P.css";
import MenuItem from '@mui/material/MenuItem';
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
import Select from '@mui/material/Select';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { event } from "jquery";
import ListItemText from '@mui/material/ListItemText';
import Slide from '@mui/material/Slide';
import Checkbox from '@mui/material/Checkbox';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import "./P2porder.css"

const steps = ['Transfer payment to seller', 'Pending Seller to Release Coins', 'Completed'];
const stepd = ['Pending Payment', 'Release Crypto to the buyer ?', 'Completed'];


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
  'UPI',
  'PayTM',
  'IMPS',
  'Banck Transfer'
];

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

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};


const P2p = (props) => {
  const [coin, setCoin] = React.useState("FUSD");
  const [etype, setEtype] = React.useState("BUY");
  const [orderType, setOrderType] = React.useState("BUY");
  const [totalcoinsget, setTotalcoinsget] = React.useState();
  const [sLimitPrize, setSLimitPrize] = React.useState();
  const [rowData, setRowData] = React.useState([]);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [usernameopen, setUsernameopen] = React.useState(false);
  const [paymentOpen, setPaymentOpen] = React.useState(false);
  const [orderAmount, setOrderAmount] = React.useState();
  const [isdtaloding, setIsdtaloding] = React.useState(true);
  const [value, setValue] = React.useState("1");
  const [coinAmInW, setCoinAmInW] = React.useState(0);
  const [remCoinAmountw, setRemCoinAmountw] = React.useState();
  const [buyPrize, setBuyPrize] = React.useState();
  const [buyCoinAmount, setBuyCoinAmount] = React.useState();
  const [sendInrAmount, setSendInrAmount] = React.useState();
  const [isUserNameExiest, setIsUserNameExiest] = React.useState(false);
  const [buyOpen, setBuyOpen] = React.useState(false);
  const [buySecondOpne, setBuySecondOpen] = React.useState(false);
  const [buyPayConf, setBuyPayConf] = React.useState(false);
  const [sellOpen, setSellOpen] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [payAmount, setPayAmount] = React.useState();
  const [wToSellPrize, setWToSellPrize] = React.useState('84.5');
  const [reciveAmount, setReciveAmount] = React.useState();
  const [personName, setPersonName] = React.useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});
  const [activehStep, setActivehStep] = React.useState(0);
  const [spayMethod, setSpayMethod] = React.useState();
  const [spayTimeLimit, setSpayTimeLimit] = React.useState(0);
  const [avAmount, setAvAmount] = React.useState(0);
  const [slecOrderId, setSlecOrderId] = React.useState();
  const [buyOrderId, setBuyOrderId] = React.useState();
  const [sellOpenTwo, setSellOpenTwo] = React.useState(false);
  const [sellOpenOne, setSellOpenOne] = React.useState(false);
  const [sellOpenThree, setSellOpenThree] = React.useState(false);
  const setSellThree = () => {
    setSellOpenOne(false);
    setSellOpenThree(true);
  };
  const handileSellCloseOne = () => {
    setSellOpenOne(false);
  }
  const handileSellCloseTwo = () => {
    setSellOpenTwo(false);
  }

  const stepsh = [
    {
      label: 'Confirm Order info ',
      description: ``,
    },
    {
      label: 'Create an ad group',
      description:
        'An ad group contains one or more ads which target a shared set of keywords.',
    },
    {
      label: 'Create an ad',
      description: `Try out different ad text to see what brings in the most customers,
                and learn how to enhance your ads using features like ad extensions.
                If you run into any problems with your ads, find out how to tell if
                they're running and how to resolve approval issues.`,
    },
  ];

  const trnasferAndNotify = async () => {
    var data = JSON.stringify({
      "sel_order_id": slecOrderId,
      "buy_order_id": buyOrderId
    });

    var config = {
      method: 'post',
      url: `${URL}trnasferAndNotify`,
      headers: {
        'x-access-token': `${props.token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    await axios(config).then(function (res) {
      console.log(JSON.stringify(res.data));
      if (res.data.status) {
        setBuyPayConf(true);
      }
    }).catch(function (error) {
      console.log(error);
    });
  }

  const handleCancelP2pOrder = async () => {
    var data = JSON.stringify({
      "sel_order_id": slecOrderId,
      "buy_order_id": buyOrderId
    });

    var config = {
      method: 'post',
      url: `${URL}canclebuyP2PSellOrder`,
      headers: {
        'x-access-token': `${props.token}`,
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios(config).then(function (response) {
      console.log(JSON.stringify(response.data));
      if (response.data.status) {
        setBuySecondOpen(false);
        setBuyOpen(false);
      }

    }).catch(function (error) {
      console.log(error);
    });

  }
  // my newcode

  const getOrderInfo = async (id) => {
    var data = JSON.stringify({
      "order_id": id
    });

    var config = {
      method: 'post',
      url: `${URL}/getp2pOrderInfo`,
      headers: {
        'x-access-token': props.token,
        'Content-Type': 'application/json'
      },
      data: data
    };
    await axios(config).then(function (res) {
      if (res.data.status && res.data.data && res.data.data.length > 0) {
        setWToSellPrize(res.data.data[0].lastPrize);
        setAvAmount(res.data.data[0].avl_from_am)
        setSpayTimeLimit(res.data.data[0].frq_time);
        let str = res.data.data[0].accept_pay_method;
        let paym = str.split(',');
        setSpayMethod(paym);

      }
    }).catch(function (error) {
      console.log(error);
    });

  }

  const BuyP2PHaindaler = async () => {
    var data = JSON.stringify({
      amount: buyCoinAmount,
      fromcoin: "INR",
      tocoin: coin,
      lastPrice: buyPrize,
      network: "FEP20",
      accept_pay_method: '1,2,3',
      user_id: `${props.userId}`,
      action: 1,
    });
    var config = {
      method: "post",
      url: `${URL}p2pSelOrderOrbuyOrder`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token': `${props.token}`
      },
      data: data,
    };
    await axios(config).then(function (response) {
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/wallet");
          }
        });
      }
    }).catch(function (error) {
      console.log(error);
    });
  };
  const buyP2pSellOrder = async () => {
    var data = JSON.stringify({
      "user_id": props.userId,
      "order_id": slecOrderId,
      "fromamount": payAmount,
      "toamount": reciveAmount,
      "action": 1,
      "tocoin": "FUSD",
      "fromcoin": "INR",
      "pay_method": 1
    });

    var config = {
      method: 'post',
      url: `${URL}buyP2PSellOrder`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${props.token}`
      },
      data: data
    };
    await axios(config).then(function (res) {
      // console.log(JSON.stringify(response.data));
      console.log(res.data);
      if (res.data.status) {
        setBuyOrderId(res.data.buyOrderId);
        setBuySecondOpen(true);
        setBuyOpen(false);
      } else {
        console.log(res.data)
      }

    }).catch(function (error) {
      console.log(error);
    });

  }
  const handlehNext = () => {
    setActivehStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlehBack = () => {
    setActivehStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handlehReset = () => {
    setActivehStep(0);
  };
  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
        // find the first step that has been completed
        steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setBuyPayConf(true);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handilePayAmountChange = (event) => {
    let recam = (parseFloat(event.target.value) / parseFloat(wToSellPrize));
    if (parseFloat(recam) > parseFloat(avAmount)) {
      toast.error("Max buy quantity is " + avAmount + " usdt.", {
        position: "bottom-center",
        autoClose: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;

    }


    setPayAmount(event.target.value);
    setReciveAmount(recam);

  }

  const handleReciveAmountChange = (event) => {
    let recam = (parseFloat(event.target.value) * parseFloat(wToSellPrize));
    if (parseFloat(event.target.value) > parseFloat(avAmount)) {
      toast.error("Max buy quantity is " + avAmount + " usdt.", {
        position: "bottom-center",
        autoClose: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;

    }
    setPayAmount(recam);
    setReciveAmount(event.target.value);
  }

  const handileMAxBUY = () => {
    setPayAmount(parseFloat(avAmount) * parseFloat(wToSellPrize));
    setReciveAmount(avAmount);
  }

  const handileBuyOpen = (event, coin, id) => {
    getOrderInfo(id);
    setSlecOrderId(id);
    setBuyOpen(true);
  }
  const handileBuyClose = () => {
    setPayAmount(0);
    setReciveAmount(0);
    setBuyOpen(false);
  }
  const handileBuy2ndOpen = (event, coin) => {

    setBuySecondOpen(true);
    setBuyOpen(false);
  }
  const handileBuy2ndClose = () => {
    setBuySecondOpen(false);
  }

  const handileBuyPayConfOpen = (event, coin) => {
    setBuyPayConf(true);
  }
  const handileBuyPayConfClose = () => {
    setBuyPayConf(false);
  }

  const handileSellOpen = (event, coin) => {
    setSellOpen(true);
  }
  const handileSellClose = () => {
    setSellOpen(false);
  }
  const handleBuyPrizeChange = (event) => {
    setBuyPrize(event.target.value);
    let bucoi = parseFloat(buyCoinAmount) * parseFloat(event.target.value);
    setSendInrAmount(bucoi)

  }

  const handleBuyCoinAmount = (event) => {
    setBuyCoinAmount(event.target.value);
    let oamount = parseFloat(event.target.value) * parseFloat(buyPrize);
    setSendInrAmount(oamount);
  }

  const handleSendInrAmount = (event) => {
    setSendInrAmount(event.target.value);
    let oamount = parseFloat(event.target.value) / parseFloat(buyPrize);
    setBuyCoinAmount(oamount);
  }


  const getUserWaletAmount = () => {
    var data = {
      user_id: props.userId,
      coin: coin
    };
    let config = {
      headers: {
        "x-access-token": props.token,
        "Content-Type": "application/json",
      },
    };

    axios.post(`${URL}getCoinP2PUserWallet`, data, config).then((res) => {
      if (res.data.status) {
        let r = res.data.data;
        console.log("YYYYYYYYYYY", r[0].avalable_bl);
        setCoinAmInW(r[0].avalable_bl);
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

    }).catch((error) => {
      if (error.response.status === 401) {
        toast.error("Some error occured, please try again some time.", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  };

  const handileUsernameSave = () => {
    var data = JSON.stringify({
      "user_id": props.userId,
      "username": username
    });

    var config = {
      method: 'post',
      url: `${URL}/createP2pUserName`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${props.token}`
      },
      data: data
    };

    axios(config)
      .then(function (response) {
        if (response.data.status) {
          Swal.fire({
            icon: "success",
            title: response.data.message,
            showCancelButton: true,
            confirmButtonText: "Ok",
          }).then((result) => {
            if (result.isConfirmed) {
              // window.location.reload();
              // navigate("/wallet");
              setOpen(true);
            }
          });
        } else {
          toast.error(response.data.message, {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });

          setUsernameopen(false);
        }
      }).catch(function (error) {
        console.log(error);
      });
  }

  const checkUserNameExiest = () => {
    var data = JSON.stringify({
      "user_id": props.userId
    });

    var config = {
      method: 'post',
      url: `${URL}/checkUserNameexiest`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': `${props.token}`
      },
      data: data
    };

    axios(config).then(function (res) {
      if (res.data.status) {
        setIsUserNameExiest(true);
        setUsername(res.data.username);
      } else {
        setIsUserNameExiest(false)
      }
    }).catch(function (error) {
      console.log(error);
    });
  }


  const handileSellLimitPrize = (event) => {
    setSLimitPrize(event.target.value);

  }

  const handileUserNameChange = (event) => {
    setUsername(event.target.value);
  }

  const handlePayMentChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const handleCoinAmountChange = (event) => {
    setTotalcoinsget(event.target.value);
    let oamount = parseFloat(event.target.value) * parseFloat(sLimitPrize);
    let remam = parseFloat(coinAmInW) - parseFloat(oamount);
    setRemCoinAmountw(remam);
    setOrderAmount(oamount);
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const SellP2PHaindaler = async () => {
    var data = JSON.stringify({
      amount: orderAmount,
      fromcoin: coin,
      tocoin: "INR",
      lastPrice: sLimitPrize,
      network: "FEP20",
      accept_pay_method: '1,2,3',
      user_id: `${props.userId}`,
      action: 2,
    });
    var config = {
      method: "post",
      url: `${URL}p2pSelOrderOrbuyOrder`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token': `${props.token}`
      },
      data: data,
    };
    await axios(config).then(function (response) {
      if (response.data.status) {
        Swal.fire({
          icon: "success",
          title: response.data.message,
          showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
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
    let total = (parseFloat(coinAmInW) * parseFloat(lpa)) / 100;
    let gcoin = parseFloat(total) * parseFloat(sLimitPrize);
    let remam = parseFloat(coinAmInW) - parseFloat(total);
    setRemCoinAmountw(remam);
    setTotalcoinsget(gcoin);
    setOrderAmount(total);
  };


  React.useEffect(() => {
    let cg = parseFloat(orderAmount) * parseFloat(sLimitPrize);
    setTotalcoinsget(cg);
  }, [sLimitPrize]);

  React.useEffect(() => {
    checkUserNameExiest();
  }, []);

  const handlePaymentOpen = () => {
    setPaymentOpen(true);
    setOpen(false);
  };

  const handleWalletChange = (event) => {
    let gcoin = parseFloat(event.target.value) * parseFloat(sLimitPrize);
    setTotalcoinsget(gcoin);
    let remam = parseFloat(coinAmInW) - parseFloat(event.target.value);
    setRemCoinAmountw(remam);
    setOrderAmount(event.target.value);
  };


  const handleClose = () => {
    setOpen(false);
    let cg = 10 * parseFloat(sLimitPrize);
    setTotalcoinsget(cg);
    setOrderAmount();

  };

  const handleusernameOpen = () => {
    setUsernameopen(true);
  }

  const handleusernameClose = () => {
    setUsernameopen(false);
  }


  const handleOpen = () => {
    if (!isUserNameExiest) {
      setUsernameopen(true);
      setOpen(false);
    } else {
      setOpen(true);
    }

  }



  const getUserInfo = async () => {
    setIsdtaloding(true);
    try {
      let config = {
        method: "get",
        url: (etype === "BUY") ? `${URL}/getP2pBuyOrder` : `${URL}/getallSellP2POrder`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': `${props.token}`
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
    getUserWaletAmount(coin);
    getUserInfo();

  }, [etype]);

  React.useEffect(() => {
    setRemCoinAmountw();
    setCoinAmInW();
    getUserWaletAmount(coin);
  }, [coin]);

  const handileCoinChange = (event, coin) => {
    setCoin(coin);
  }

  const handileBuyOrSellChange = (event, type) => {
    setEtype(type);
  }
  const handleOrderType = (event, oty) => {
    setOrderType(oty);
  }



  let internationalNumberFormat = new Intl.NumberFormat("en-US");
  const columns = [
    {
      field: "tocoin",
      headerName: "Advertisers (Completion rate)",
      minWidth: 150,
      flex: 0.3,
      // renderCell: (params) => {
      //   return (
      //     <Box
      //       sx={{
      //         display: "flex",
      //         flexDirection: "row",
      //         alignItems: "center",
      //         width: "100%",
      //       }}
      //     >
      //       <span>
      //         <img
      //           style={{ height: "20px", width: "20px" }}
      //           src={params.row.symble_url}
      //         />
      //       </span>
      //       <span style={{ marginLeft: "10px" }}>
      //         {params.row.coin + "/" + params.row.pair}
      //       </span>
      //     </Box>
      //   );
      // },
    },
    {
      field: "lastPrize",
      headerName: "Price",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      // format: (value) => value.toFixed(4),
      // format: (value) => value.toLocaleString('en-US'),
      alignItems: "center",
    },
    {
      field: "avl_from_am",
      headerName: "Limit/Available",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      // alignItems: 'center',
      // renderCell: (params) => {
      //   let ch24h = params.row.change24h.toString();
      //   let cd = ch24h.substring(1);
      //   cd = Number(cd);
      //   return ch24h.slice(0, 1) == "-" ? (
      //     <span
      //       style={{
      //         color: "#d9442e",
      //         minWidth: "125.855px",
      //         maxWidth: "171.855px",
      //         lineHeight: "51px",
      //         minHeight: "52px",
      //         maxHeight: "52px",
      //       }}
      //     >
      //       {/* {"+"+internationalNumberFormat.format((cd).toFixed(5))+"%"} */}
      //       {ch24h}
      //     </span>
      //   ) : (
      //     <span
      //       style={{
      //         color: "#76b840",
      //         minWidth: "125.855px",
      //         maxWidth: "171.855px",
      //         lineHeight: "51px",
      //         minHeight: "52px",
      //         maxHeight: "52px",
      //       }}
      //     >
      //       {/* {"-"+internationalNumberFormat.format((cd).toFixed(5))+"%"} */}
      //       {ch24h}
      //     </span>
      //   );
      // },
    },
    {
      field: "avl_to_am",
      headerName: "INR (amount)",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
    },


    {
      field: "accept_pay_method",
      headerName: "Payment",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      alignItems: "center",
      renderCell: (params) => {
        let str = params.row.accept_pay_method;
        let paym = str.split(',');
        return (
          <>
            <Box sx={{
              display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
              width: "100%"
            }}>
              {/* <span
                >
                  Hello
                </span> */}
              {/* 
                {paym && paym.length > 0?
                paym.forEach(element => { */}
              <span>
                {(paym[0] && paym[0] != '1') ? paym[0] == '2' ? "PAYTM" : "IMPS" : "UPI"}


              </span>
              <span>
                {(paym[1] && paym[1] != '1') ? paym[1] == '2' ? "PAYTM" : "IMPS" : "UPI"}


              </span>
              <span>
                {(paym[2] && paym[2] != '1') ? paym[2] == '2' ? "PAYTM" : "IMPS" : "UPI"}


              </span>


            </Box>



          </>

        )

      },
    },

    {
      field: "action",
      headerName: "Trade 0 Fee",
      type: "number",
      minWidth: 150,
      flex: 0.5,
      renderCell: (params) => {
        console.log("paramsyyyy", params.row.action)
        return (
          <>
            {(props.token && props.userId) ?
              <Box sx={{
                display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
                width: "100%"
              }}>
                {params.row.action === 2 ?
                  <span
                    className="quickb"
                    onClick={(e) => {
                      handileBuyOpen(e, params.row.tocoin, params.row.id);
                    }}
                  >
                    BUY {params.row.tocoin}
                  </span>
                  :
                  <span
                    className="sellh"
                    onClick={(e) => {
                      handileSellOpen(e, params.row.tocoin);
                    }}
                  >
                    Sell {params.row.tocoin}
                  </span>
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

              </Box>
            }
          </>

        )

      },
    },
  ];


  return (
    <div className="quickby" style={{ marginTop: "35px" }}>
      <Box className="container-fluid container-xl wraed"
        sx={{
          background: "#e0e0e0",
        }}
      >
        <div class="Grid Grid--gutters Grid--cols-6 u-textCenter" id="p21pg">
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">
              <div className="balanceSheet_header">
                <div className="totalBal_div">
                  <Stack direction="row" spacing={2}>
                    <Button id={(etype === "BUY") ? "etypeactive" : "etype"} onClick={(e) => { handileBuyOrSellChange(e, "BUY") }}>
                      Buy
                    </Button>
                    <Button id={(etype === "Sell") ? "etypeactive" : "etype"} onClick={(e) => { handileBuyOrSellChange(e, "Sell") }} >Sell</Button>
                  </Stack>
                </div>
              </div>

            </div>
          </div>
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">
              <Box>
                <span id={(coin === 'FUSD') ? "lcoinSelected" : "lcoin"} onClick={(e) => handileCoinChange(e, "FUSD")} >FUSD</span>
                <span id={(coin === 'FUFI') ? "lcoinSelected" : "lcoin"} onClick={(e) => handileCoinChange(e, "FUFI")}>FUFI</span>
                <span id={(coin === 'TRON') ? "lcoinSelected" : "lcoin"} onClick={(e) => handileCoinChange(e, "TRON")}>Tron </span>

              </Box>

            </div>
          </div>
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">


            </div>
          </div>
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">


            </div>
          </div>
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">


            </div>
          </div>

          <div class="Grid-cell">
            <div class="Demo1 content-1of6">


            </div>
          </div>
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">


            </div>
          </div>

          <div class="Grid-cell">
            <div class="Demo1 content-1of6">


            </div>
          </div>
          <div class="Grid-cell">
            <div class="Demo1 content-1of6">
              <Button id="etype" onClick={handleOpen}>
                Place P2P Order
              </Button>

            </div>
          </div>

        </div>
      </Box>

      <div className="balanceSheet" style={{ marginTop: "35px" }}>

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
        </div>
      </div>
      <BootstrapDialog xs={3}
        className="bootbuyform"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={open}
      >
        <TabContext value={value}>
          <BootstrapDialogTitle
            id={(value === 1) ? "customizeddd-dialog-title_option_buy" : "customizeddd-dialog-title_option_sell"}
            onClose={handleClose}
          >

            <Box id="coption" sx={{ width: '100%' }}>
              <Tabs
                onChange={handleChange}
                value={value}
                aria-label="Tabs where selection follows focus"
              // selectionFollowsFocus
              >
                <Tab onClick={(e) => { handleOrderType(e, "BUY") }} label="BUY" value="1" />
                <Tab onClick={(e) => { handleOrderType(e, "Sell") }} label="Sell" value="2" />
              </Tabs>
            </Box>
          </BootstrapDialogTitle>
          <TabPanel
            id="tabOutline"
            value="2"
            style={{ marginTop: "8px" }}
          >
            <DialogContent className="dlogtent" dividers>
              <Typography gutterBottom>

              </Typography>
              <Typography gutterBottom>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <div>
                    <FormControl sx={{ m: 1, width: 300 }}>
                      <InputLabel id="demo-multiple-checkbox-label">Payment Method</InputLabel>
                      <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        fullWidth="true"
                        value={personName}
                        onChange={handlePayMentChange}
                        input={<OutlinedInput label="Payment Method" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                      >
                        {names.map((name) => (
                          <MenuItem key={name} value={name}>
                            <Checkbox checked={personName.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Price
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        fullWidth="true"
                        value={sLimitPrize}
                        onChange={handileSellLimitPrize}
                        label="Price"
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Amount({coin})
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        fullWidth="true"
                        value={orderAmount}
                        onChange={handleWalletChange}
                        endAdornment={
                          <InputAdornment position="end">
                            ({coin}
                            )
                          </InputAdornment>
                        }
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>
                    <Box sx={{ display: "flex" }}>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 10);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 10
                      </Button>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 20);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 20
                      </Button>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 50);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 50
                      </Button>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 100);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 100
                      </Button>
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
                        Total
                      </FormHelperText>
                      <FormHelperText
                        className="labelnm"
                        id="outlined-weight-helper-text"
                      >
                        Balance:{" "}
                        {remCoinAmountw !== undefined ? (
                          remCoinAmountw >= 0 ? (
                            remCoinAmountw
                          ) : (
                            <span style={{ color: "red" }}>
                              Insufficient Balance
                            </span>
                          )
                        ) : (
                          coinAmInW
                        )}
                      </FormHelperText>
                    </Box>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Total INR
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={totalcoinsget}
                        onChange={handleCoinAmountChange}
                        fullWidth="true"
                        endAdornment={
                          <InputAdornment position="end">
                            (INR
                            )
                          </InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>
                  </div>
                </Box>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button id="sellbutton" className="sellbutton" onClick={SellP2PHaindaler}>
                Sell {coin}
              </Button>
            </DialogActions>
          </TabPanel>

          <TabPanel
            id="tabOutline"
            value="1"
            style={{ marginTop: "8px" }}
          >
            <DialogContent className="dlogtent" dividers>
              <Typography gutterBottom>
              </Typography>
              <Typography gutterBottom>
                <Box sx={{ display: "flex", flexWrap: "wrap" }}>
                  <div>
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Price
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        fullWidth="true"
                        value={buyPrize}
                        onChange={handleBuyPrizeChange}

                        label="Price"
                      />
                    </FormControl>

                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Amount({coin})
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        fullWidth="true"
                        value={buyCoinAmount}
                        onChange={handleBuyCoinAmount}
                        endAdornment={
                          <InputAdornment position="end">
                            ({coin}
                            )
                          </InputAdornment>
                        }
                        startAdornment={
                          <InputAdornment position="start">$</InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>

                    {/* <Box sx={{ display: "flex" }}>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 10);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 10
                      </Button>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 20);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 20
                      </Button>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 50);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 50
                      </Button>
                      <Button
                        sx={{ cursor: "pointer" }}
                        onClick={(e) => {
                          limtQpHandler(e, 100);
                        }}
                        id="outlined-weight-helper-text"
                      >
                        +% 100
                      </Button>

                    </Box> */}
                    <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Total INR
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={sendInrAmount}
                        onChange={handleSendInrAmount}
                        fullWidth="true"
                        endAdornment={
                          <InputAdornment position="end">
                            (INR)
                          </InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl>
                  </div>
                </Box>
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button id="paybutton" className="paybton" onClick={BuyP2PHaindaler}>
                BUY {coin}
              </Button>
            </DialogActions>
          </TabPanel>
        </TabContext>
      </BootstrapDialog>

      {/* Create Username Start  */}

      <BootstrapDialog xs={3}
        className="bootbuyform"
        onClose={handleusernameClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        open={usernameopen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handleusernameClose}
        >

          <Box id="coption" sx={{ width: '100%' }}>
            <span>Create User Name</span>
          </Box>
        </BootstrapDialogTitle>
        <DialogContent className="dlogtent" dividers>


          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <div>
              <FormControl fullWidth sx={{ m: 1 }}>
                <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                  Username
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="string"
                  fullWidth="true"
                  value={username}
                  onChange={handileUserNameChange}
                  label="Username"
                />
              </FormControl>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button id="sellbutton" className="sellbutton" onClick={handileUsernameSave}>
            Create Username
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* userName Code End */}

      {/* Buy Side Model Code Start  */}






      <BootstrapDialog lg={5}
        className="bootbhuyform"
        onClose={handileBuyClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={buyOpen}
      >
        <BootstrapDialogTitle
          id={(value === 1) ? "customizeddd-dialog-title_option_buy" : "customizeddd-dialog-title_option_sell"}
          onClose={handileBuyClose}
        >
          Buy FUSD
        </BootstrapDialogTitle>




        <div className="wrapper2">

          <div className="content2">
            <Box className="boesdf" >
              <div className="topGhjty">
                <ul>
                  <li>  <IconButton sx={{ p: 0 }}>
                    <Avatar alt={username} src="/static/images/avatar/2.jpg" />
                  </IconButton></li>
                  <li>{username}</li>
                  <li><span>2525</span><span>Orders</span></li>
                  <li><span>96.85%</span><span>Complition</span></li>
                </ul>
              </div>
            </Box>



            <Grid container spacing={2} style={{ marginTop: "12px" }}>
              <Grid item xs={6} md={5} style={{ paddingTop: "0" }}>
                <div className="clLeftContaner">

                  <ul>

                    <li><span>Price</span><span>{wToSellPrize}INR</span></li>
                    <li><span>Payment Time Limit</span><span>{spayTimeLimit} Minutes</span></li>
                  </ul>
                </div>

              </Grid>
              <Grid item xs={6} md={7} style={{ paddingTop: "0" }}>
                <div className="clLeftContaner">
                  <ul>
                    <li><span>Available</span><span>{avAmount} FUSD</span></li>
                    <li>
                      {/* <span>Seller's Payment Method</span> */}
                      {/* <span>UPI</span> */}
                      <Box sx={{
                        display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
                        width: "100%"
                      }}>
                        {/* <span>Payment time Limit</span>
                  <span>{spayTimeLimit} Minutes</span> */}
                        <span>Seller's payment method</span>
                        {spayMethod && spayMethod.length > 0 ?
                          <>
                            <Box sx={{
                              display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
                              width: "100%"
                            }}>

                              <span>
                                {(spayMethod[0] && spayMethod[0] != '1') ? spayMethod[0] == '2' ? "PAYTM" : "IMPS" : "UPI"}
                              </span>
                              <span>
                                {(spayMethod[1] && spayMethod[1] != '1') ? spayMethod[1] == '2' ? "PAYTM" : "IMPS" : "UPI"}
                              </span>
                              <span>
                                {(spayMethod[2] && spayMethod[2] != '1') ? spayMethod[2] == '2' ? "PAYTM" : "IMPS" : "UPI"}
                              </span>
                            </Box>
                          </>
                          : ''}

                        {/* <span>{spayMethod}</span> */}
                      </Box>
                    </li>

                  </ul>
                </div>

              </Grid>
            </Grid>

            <div className="gtKopyt">
              <h6>Terms & Conditions</h6>
              <span>
                Bank Account Holder Holder Name & Tradekia KYC should be Same.
                No Therd Party Payment
                For Any Query message me on Tradekiya
                Then money will be refunded immediately by deducation 5%
              </span>
            </div>

          </div>







          <div className="sidebar2">
            <div>
              <FormControl sx={{ m: 1 }}>
                <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                  <span>I want to pay</span>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  fullWidth="true"
                  value={payAmount}
                  onChange={handilePayAmountChange}
                  label="Pay Amount"
                />
              </FormControl>

              <FormControl sx={{ m: 1 }}>
                <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                  {/* Amount({coin}) */}
                  <span>I will receive</span>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  fullWidth="true"
                  value={reciveAmount}
                  onChange={handleReciveAmountChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <spnan onClick={handileMAxBUY}> Max </spnan>  ({coin}
                      )
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <div className="btonSeld">
                <Button
                  className="canclUsd"
                  onClick={handileBuyClose}
                  id="outlined-weight-helper-text"
                >
                  Cancel
                </Button>
                <Button
                  className="sellUsdt"
                  onClick={buyP2pSellOrder}
                  id="buybutton"
                >
                  BUY {coin}
                </Button>

              </div>

              {/* <Box
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
                        {remCoinAmountw !== undefined ? (
                          remCoinAmountw >= 0 ? (
                            remCoinAmountw
                          ) : (
                            <span style={{ color: "red" }}>
                              Insufficient Balance
                            </span>
                          )
                        ) : (
                          coinAmInW
                        )}
                      </FormHelperText>
                    </Box> */}
              {/* <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Total INR
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={totalcoinsget}
                        onChange={handleCoinAmountChange}
                        fullWidth="true"
                        endAdornment={
                          <InputAdornment position="end">
                            (INR
                            )
                          </InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl> */}
            </div>
          </div>

        </div>


        {/* <DialogActions>
              <Button id="sellbutton" className="sellbutton" onClick={SellP2PHaindaler}>
                Sell {coin}
              </Button>
            </DialogActions> */}
      </BootstrapDialog>
      {/* Buy Side Model Code End  */}


















      {/* Buy Side Second model  */}
      <BootstrapDialog lg={5}
        className="bootbuyform"
        onClose={handileBuy2ndClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={buySecondOpne}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handileBuy2ndClose}
        >
        </BootstrapDialogTitle>
        <DialogContent className="dlogtent" dividers>

          {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}> */}

          <Box sx={{
            display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
            width: "100%"
          }}>
            <div>
              <Box sx={{ width: '100%' }}>
                <Stepper className="FoGoiuy" nonLinear activeStep={activeStep}>
                  {steps.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton className="txtAlidfg" color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
                <div>
                  {allStepsCompleted() ? (
                    <React.Fragment>
                      <Typography sx={{ mt: 2, mb: 1 }}>
                        All steps completed - you&apos;re finished
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Box sx={{ flex: '1 1 auto' }} />
                        <Button onClick={handleReset}>Reset</Button>
                      </Box>
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <Typography>
                        <Box sx={{
                          display: 'flex', flexDirection: "row", justifyContent: "flex-start",
                          width: "100%"
                        }}>

                          <h5 className="bFgh5">Confirm Order Info</h5>
                        </Box>
                        <Box className="Gihhdis">
                          <div>
                            <ul>
                              <li>
                                <span>Amount</span>
                              </li>
                              <li>
                                <span>{payAmount} Rs</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <ul>
                              <li><span>Price</span></li>
                              <li>
                                <span>{wToSellPrize} Rs</span>
                              </li>
                            </ul>
                          </div>
                          <div>
                            <ul>
                              <li><span>Quantity</span></li>
                              <li>
                                <span>{reciveAmount} FUSD</span>
                              </li>
                            </ul>
                          </div>
                        </Box>

                        <Box className="biFigs">
                          <p>Transfer the funds to the seller's account provided below </p>
                          <p>Tradekiya only supported real-name verified payment Method</p>
                        </Box>

                        <Box sx={{
                          display: 'flex', flexWrap: "wrap", flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                          width: "100%"
                        }}>
                          <div id="LeftPay" style={{ border: "1px solide black", height: "50px" }}>
                            <button>UPI</button>
                          </div>
                          <div id="rightPay">
                            <Box>
                              <div class="clLeftContaner4"><ul><li><span>Name</span><span>Sanjay</span></li>

                                <li><span>UPI ID</span><span>dkgupta8953@ybl</span></li>
                                <li><span>Payment QR Code</span><span>dkgupta8953@ybl</span></li>
                              </ul></div>


                            </Box>
                          </div>


                        </Box>
                        <Box sx={{
                          display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                          width: "100%"
                        }}>
                          <p> After tranferring the funds , click on the  "Transferred , notify seller" button . </p>
                        </Box>
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                          color="inherit"
                          // disabled={activeStep === 0}
                          onClick={handleCancelP2pOrder}
                          sx={{ mr: 1 }}
                        >
                          Cancel Order
                        </Button>
                        <Box sx={{ flex: '1 1 auto' }} />
                        {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                          </Button> */}
                        {activeStep !== steps.length &&
                          (completed[activeStep] ? (
                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                              Step {activeStep + 1} already completed
                            </Typography>
                          ) : (
                            <Button onClick={trnasferAndNotify}>
                              {completedSteps() === totalSteps() - 1
                                ? 'Finish'
                                : 'Transferred, notify seller'}
                            </Button>
                          ))}
                      </Box>
                    </React.Fragment>
                  )}
                </div>
              </Box>


            </div>


          </Box>

        </DialogContent>
        {/* <DialogActions>
              <Button id="sellbutton" className="sellbutton" onClick={SellP2PHaindaler}>
                Sell {coin}
              </Button>
            </DialogActions> */}
      </BootstrapDialog>



























      {/* Buy side 2nd Model End */}

      {/* buy side payment confer mation */}
      <BootstrapDialog lg={5}
        className="bootbuyform"
        onClose={handileBuyPayConfClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={buyPayConf}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handileBuyPayConfClose}
        >
          Payment Conformation
        </BootstrapDialogTitle>
        <DialogContent className="dlogtent" dividers>
          <Typography gutterBottom>
            <p> Please Confirm that you have successfully Transferred  the money to the seller through the following payment method  befor clicking the "Transctions,notify" Button </p>
          </Typography>
          <Typography gutterBottom>
            {/* <Box sx={{ display: "flex", flexWrap: "wrap" }}> */}

            <Box sx={{
              display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between",
              width: "100%"
            }}>
              <div>
                <Box sx={{ width: '100%' }}>
                  <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((label, index) => (
                      <Step key={label} completed={completed[index]}>
                        <StepButton color="inherit" onClick={handleStep(index)}>
                          {label}
                        </StepButton>
                      </Step>
                    ))}
                  </Stepper>
                  <div>
                    {allStepsCompleted() ? (
                      <React.Fragment>
                        <Typography sx={{ mt: 2, mb: 1 }}>
                          All steps completed - you&apos;re finished
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Box sx={{ flex: '1 1 auto' }} />
                          <Button onClick={handleReset}>Reset</Button>
                        </Box>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <Typography>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", justifyContent: "flex-start",
                            width: "100%"
                          }}>

                            <h5 className="bFgh5">Confirm Order Info</h5>
                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                            width: "100%"
                          }}>
                            {/* <IconButton sx={{ p: 0 }}>
                      <Avatar alt="Ankit@123" src="/static/images/avatar/2.jpg" />
                    </IconButton> */}
                            {/* </span> */}
                            <span>Amount</span>
                            <span>Price</span>
                            <span>Quantity</span>

                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                            width: "100%"
                          }}>

                            <span>1100.00</span>
                            <span>88.34</span>
                            <span>12.45 FUSD</span>

                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                            width: "100%"
                          }}>
                            <info>Transfer the funds to the seller's account provided below </info>
                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                            width: "100%"
                          }}>
                            <info>Tradekiya only supported real-name verified payment Method</info>

                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                            width: "100%"
                          }}>
                            <div id="LeftPay" style={{ border: "1px solide black", height: "50px" }}>
                              <button>UPI</button>
                            </div>
                            <div id="rightPay">
                              <Box sx={{
                                display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                                width: "100%"
                              }}>
                                <span>Name</span>
                              </Box>
                              <Box sx={{
                                display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                                width: "100%"
                              }}>
                                <span>Sanjay </span>
                              </Box>
                              <Box sx={{
                                display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                                width: "100%"
                              }}>
                                <span>UPI ID</span>
                              </Box>
                              <Box sx={{
                                display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                                width: "100%"
                              }}>
                                <span>dkgupta8953@ybl </span>
                              </Box>
                              <Box sx={{
                                display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                                width: "100%"
                              }}>
                                <span>Payment QR Code </span>
                              </Box>
                              <Box sx={{
                                display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                                width: "100%"
                              }}>
                                <span>dkgupta8953@ybl </span>
                              </Box>

                            </div>


                          </Box>
                          <Box sx={{
                            display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                            width: "100%"
                          }}>
                            <p> After tranferring the funds , click on the  "Transferred , notify seller" button . </p>
                          </Box>
                        </Typography>
                        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                          <Button
                            color="inherit"
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1 }}
                          >
                            Cancel Order
                          </Button>
                          <Box sx={{ flex: '1 1 auto' }} />
                          {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                          </Button> */}
                          {activeStep !== steps.length &&
                            (completed[activeStep] ? (
                              <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                Step {activeStep + 1} already completed
                              </Typography>
                            ) : (
                              <Button onClick={handleComplete}>
                                {completedSteps() === totalSteps() - 1
                                  ? 'Finish'
                                  : 'Transferred, notify seller'}
                              </Button>
                            ))}
                        </Box>
                      </React.Fragment>
                    )}
                  </div>
                </Box>


              </div>


            </Box>
          </Typography>
        </DialogContent>
        {/* <DialogActions>
              <Button id="sellbutton" className="sellbutton" onClick={SellP2PHaindaler}>
                Sell {coin}
              </Button>
            </DialogActions> */}
      </BootstrapDialog>

      {/* buy side payment Conformations close  */}

      {/* Sell Side Model Code Start  */}
      <BootstrapDialog lg={5}
        className="bootbhuyform"
        onClose={handileSellClose}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={sellOpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handileSellClose}
        >
          SELL USDT
        </BootstrapDialogTitle>




        <div className="wrapper2">

          <div className="content2">
            <Box className="boesdf" >
              <div className="topGhjty">
                <ul>
                  <li>  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Ankit@123" src="/static/images/avatar/2.jpg" />
                  </IconButton></li>
                  <li>Ankit@123</li>
                  <li><span>2525</span><span>Orders</span></li>
                  <li><span>96.85%</span><span>Complition</span></li>
                </ul>
              </div>
            </Box>



            <Grid container spacing={2} style={{ marginTop: "12px" }}>
              <Grid item xs={6} md={5} style={{ paddingTop: "0" }}>
                <div className="clLeftContaner">

                  <ul>

                    <li><span>Price</span><span>84.5 INR</span></li>
                    <li><span>Payment Time Limit</span><span>15 Minutes</span></li>
                  </ul>
                </div>

              </Grid>
              <Grid item xs={6} md={7} style={{ paddingTop: "0" }}>
                <div className="clLeftContaner">
                  <ul>
                    <li><span>Available</span><span>82.90 USDT</span></li>
                    <li><span>Seller's Payment Method</span><span>UPI</span></li>
                  </ul>
                </div>

              </Grid>
            </Grid>

            <div className="gtKopyt">
              <h6>Terms & Conditions</h6>
              <span>
                Bank Account Holder Holder Name & Tradekia KYC should be Same.
                No Therd Party Payment
                For Any Query message me on Tradekiya
                Then money will be refunded immediately by deducation 5%
              </span>
            </div>

          </div>



          <div className="sidebar2">
            <div>
              <FormControl sx={{ m: 1 }}>
                <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                  <span>I want to pay</span>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  fullWidth="true"
                  value={payAmount}
                  onChange={handilePayAmountChange}
                  label="Pay Amount"
                />
              </FormControl>

              <FormControl sx={{ m: 1 }}>
                <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                  {/* Amount({coin}) */}
                  <span>I will receive</span>
                </InputLabel>
                <OutlinedInput
                  id="outlined-adornment-amount"
                  type="number"
                  fullWidth="true"
                  value={reciveAmount}
                  onChange={handleReciveAmountChange}
                  endAdornment={
                    <InputAdornment position="end">
                      ({coin}
                      )
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position="start">$</InputAdornment>
                  }
                  label="Amount"
                />
              </FormControl>
              <div className="btonSeld">
                <Box sx={{ display: "flex" }}>
                  <Button
                    sx={{ cursor: "pointer", backgroundColor: "#f5faf7" }}
                    onClick={(e) => {
                      limtQpHandler(e, 10);
                    }}
                    id="outlined-weight-helper-text"
                  >
                    Cancle8888
                  </Button>
                  <Button
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => {
                      limtQpHandler(e, 20);
                    }}
                    id="buybutton"
                  >
                    BUY {coin}
                  </Button>

                </Box>

              </div>

              {/* <Box
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
                        {remCoinAmountw !== undefined ? (
                          remCoinAmountw >= 0 ? (
                            remCoinAmountw
                          ) : (
                            <span style={{ color: "red" }}>
                              Insufficient Balance
                            </span>
                          )
                        ) : (
                          coinAmInW
                        )}
                      </FormHelperText>
                    </Box> */}
              {/* <FormControl fullWidth sx={{ m: 1 }}>
                      <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                        Total INR
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-amount"
                        type="number"
                        value={totalcoinsget}
                        onChange={handleCoinAmountChange}
                        fullWidth="true"
                        endAdornment={
                          <InputAdornment position="end">
                            (INR
                            )
                          </InputAdornment>
                        }
                        label="Amount"
                      />
                    </FormControl> */}
            </div>
          </div>

        </div>


    
      </BootstrapDialog>
      {/* Sell Side Model Code End  */}

      <BootstrapDialog style={{ marginTop: '5rem' }} lg={5}
        className="bootbhuyform"
        onClose={handileSellCloseTwo}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={sellOpenTwo}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handileSellCloseTwo}
        >
          999999999999
        </BootstrapDialogTitle>
        <div className="wrapper2">

          <div className="content2">
            <Box className="boesdf" >
              <div className="topGhjty">
                <ul>
                  <li>  <IconButton sx={{ p: 0 }}>
                    <Avatar alt="Ankit@123" src="/static/images/avatar/2.jpg" />
                  </IconButton></li>
                  <li>Ankit@123</li>
                  <li><span>2525</span><span>Orders</span></li>
                  <li><span>96.85%</span><span>Complition</span></li>
                </ul>
              </div>
            </Box>



            <Grid container spacing={2} style={{ marginTop: "12px" }}>
              <Grid item xs={6} md={5} style={{ paddingTop: "0" }}>
                <div className="clLeftContaner">

                  <ul>

                    <li><span>Price</span><span>84.5 INR</span></li>
                    <li><span>Payment Time Limit</span><span>15 Minutes</span></li>
                  </ul>
                </div>

              </Grid>
              <Grid item xs={6} md={7} style={{ paddingTop: "0" }}>
                <div className="clLeftContaner">
                  <ul>
                    <li><span>Available</span><span>82.90 USDT</span></li>
                    <li><span>Seller's Payment Method</span><span>UPI</span></li>
                  </ul>
                </div>

              </Grid>
            </Grid>

            <div className="gtKopyt">
              <h6>Terms & Conditions</h6>
              <span>
                Bank Account Holder Holder Name & Tradekia KYC should be Same.
                No Therd Party Payment
                For Any Query message me on Tradekiya
                Then money will be refunded immediately by deducation 5%
              </span>
            </div>

          </div>



          <div className="sidebar2">
            <div>
              xxxxxxxxxxxxx
              <div className="btonSeld">
                <Box sx={{ display: "flex" }}>

                  {/* <Button
          sx={{ cursor: "pointer" }}
          onClick={(e) => {
            limtQpHand(e, 20);
          }}
          id="buybutton"
        > */}
                  <Button>
                    BUY999 {coin}
                  </Button>

                </Box>

              </div>

              {/* <Box
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
              {remCoinAmountw !== undefined ? (
                remCoinAmountw >= 0 ? (
                  remCoinAmountw
                ) : (
                  <span style={{ color: "red" }}>
                    Insufficient Balance
                  </span>
                )
              ) : (
                coinAmInW
              )}
            </FormHelperText>
          </Box> */}
              {/* <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
              Total INR
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-amount"
              type="number"
              value={totalcoinsget}
              onChange={handleCoinAmountChange}
              fullWidth="true"
              endAdornment={
                <InputAdornment position="end">
                  (INR
                  )
                </InputAdornment>
              }
              label="Amount"
            />
          </FormControl> */}
            </div>
          </div>

        </div>

      </BootstrapDialog>
      <BootstrapDialog lg={5}
        className="bootbhuyform"
        onClose={handileSellCloseOne}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={sellOpenThree}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handileSellCloseOne}
        >
          33333333333333333333333
        </BootstrapDialogTitle>

        setSellThree ,,,,,,,,,,,,,,,,,

      </BootstrapDialog>



      <BootstrapDialog lg={5}
        className="bootbhuyform"
        onClose={handileSellCloseOne}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        // fullWidth={true}
        maxWidth='xl'
        TransitionComponent={Transition}
        open={sellOpenOne}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={handileSellCloseOne}
        >
          888888888888888
        </BootstrapDialogTitle>
        <div className="wrapper2">

          <div className="content4">
            <Box sx={{ width: '100%' }}>
              <ul className="Boksheiujh"><li>
                <Stepper className="FoGoiuy" nonLinear activeStep={activeStep}>
                  {stepd.map((label, index) => (
                    <Step key={label} completed={completed[index]}>
                      <StepButton className="txtAlidfg" color="inherit" onClick={handleStep(index)}>
                        {label}
                      </StepButton>
                    </Step>
                  ))}
                </Stepper>
              </li></ul>
              <div>

                <React.Fragment>
                  <Typography>
                    <Box sx={{
                      display: 'flex', flexDirection: "row", justifyContent: "flex-start",
                      width: "100%"
                    }}>

                      <h5 className="bFgh5">Confirm Order Info...</h5>
                    </Box>


                    <Box className="Gihhdis">
                      <div>
                        <ul>
                          <li>
                            <span>Amount..</span>
                          </li>
                          <li>
                            <span>1100.00 Rs</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul>
                          <li><span>Price</span></li>
                          <li>
                            <span>82.90 Rs</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <ul>
                          <li><span>Quantity</span></li>
                          <li>
                            <span>12.45 USDT</span>
                          </li>
                        </ul>
                      </div>
                    </Box>

                    <Box className="biFigs">
                      <h5>Payment Method</h5>
                    </Box>

                    <Box sx={{
                      display: 'flex', flexWrap: "wrap", flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                      width: "100%"
                    }}>
                      <div id="LeftPay" style={{ border: "1px solide black", height: "50px" }}>
                        <button>UPI</button>
                      </div>
                      <div id="rightPay">
                        <Box>
                          <div class="clLeftContaner4"><ul><li><span>Name</span><span>Sanjay</span></li>

                            <li><span>UPI ID</span><span>dkgupta8953@ybl</span></li>
                            <li><span>Payment QR Code</span><span>dkgupta8953@ybl</span></li>
                          </ul></div>


                        </Box>
                      </div>


                    </Box>



                    <Box sx={{
                      display: 'flex', flexDirection: "row", alignItems: 'left', justifyContent: "space-between",
                      width: "100%"
                    }}>
                      <p style={{ fontSize: "13px", marginBottom: "0", marginTop: "7px" }}> After tranferring the funds , click on the  "Transferred , notify seller" button . </p>
                    </Box>
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button className="ctransfedr"
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Cancel Order
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {/* <Button onClick={handleNext} sx={{ mr: 1 }}>
                            Next
                          </Button> */}
                    {activeStep !== steps.length &&
                      (completed[activeStep] ? (
                        <Typography variant="caption" sx={{ display: 'inline-block' }}>
                          Step {activeStep + 1} already completed
                        </Typography>
                      ) : (
                        <Button className="transfedr" onClick={setSellThree}>
                          {completedSteps() === totalSteps() - 1
                            ? 'Finish'
                            : 'Transferred, notify seller'}
                        </Button>
                      ))}
                  </Box>
                </React.Fragment>

              </div>
            </Box>




          </div>



          <div className="sidebar4">
            <div className="sidbr4">
              <ul>
                <li>

                  <span>Rdx Balaji</span>
                </li>
                <li>
                  <span>Verified user</span>
                </li>
              </ul>
            </div>
            <Box className="Gihhdisf">

              <div>
                <ul>
                  <li>
                    <span>30d Trades</span>
                  </li>
                  <li>
                    <span>1100.00 Rs</span>
                  </li>
                </ul>
              </div>
              <div>
                <ul>
                  <li><span>30d Completion Rate</span></li>
                  <li>
                    <span>82.90 Rs</span>
                  </li>
                </ul>
              </div>

            </Box>

          </div>

        </div>

      </BootstrapDialog>



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

export default connect(mapStateToProps)(P2p);
