import React , {memo} from "react";
import { useNavigate } from "react-router-dom";
// import DollarSvg from "../../assets/images/totalBalance.svg";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import SwapVerticalCircleIcon from "@material-ui/icons/SwapVerticalCircle";
import { DataGrid } from "@material-ui/data-grid";
// import Loader from "../../components/Loader/Loader";

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
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import walletIcone from "../../assets/images/icons8-euro-account-64.png";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CardActionArea, CardActions } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";
import PaymentIframe from './PaymentIframe';
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

const QuickBuy = (props) => {
  const [ischecked, setIschecked] = React.useState(false);
  // const [refCount, setRefCount] = React.useState(true);
  // const [toTalWalet, setToTalWalet] = React.useState();
  // const [totalusdt, setTotalusdt] = React.useState();
  // const [totalbtc, setTotalbtc] = React.useState();
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
  //Sell Side Code Start
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

  const handleSellSideOpen = (e, coin) => {
    getWalletAmount(coin);
    setFromcoin(coin);
    setSellOpen(true);
  };
  const handleSellSideClose = (e, coin) => {
    setSellOpen(false);
  };

  // const Paytimer=()=>{
    React.useEffect(()=>{
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
    console.log("df", e, coin, network);
    // navigate('/trade');
    navigate("/trade", { state: { pairdata: coin } });
    window.location.reload();
  };
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
    await axios(config)
      .then(function (response) {
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
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  //Sell Side code End
  // buy Side Code  Start
  const limtQpHandler = (e, lpa) => {
    let am = parseFloat(orderAmount);
    let total = lpa + am;
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
    axios(config)
      .then((res) => {
        console.log("Res", res.data.data);
        if (res.data.status) {
          // const result = res.data.data.find(ele => ele.coin === coi);
          // console.log("result?.Inrprize",result?.Inrprize,"result?.UsdtPrize",result?.UsdtPrize,"coi",coi);
          setTrxprize(res?.data?.data?.cInrprize);
          setUsdtPrize(res?.data?.data?.cUsdtPrize);
        }
      })
      .catch((error) => {
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
    setIsiframeopen(true);
    // React.useEffect(() => {
    // window.location.replace('https://oneninelabs.com/')
    // }, []);
  }
  const handleIframeClose = () => {
    setIsiframeopen(false);
  }
  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onerror = () => {
      alert("Razorpay SDK failed to load. Are you online?");
    };
    script.onload = async () => {
      try {
        setLoading(true);
        const result = await axios.post(`${URL}/create-order`, {
          amount: orderAmount + "00",
        });
        const { amount, id: order_id, currency } = result.data;
        const {
          data: { key: razorpayKey },
        } = await axios.get(`${URL}/get-razorpay-key`);
        let trx = parseFloat(amount) / (parseFloat(trxprize) * 100);
        // let btcvalue=parseFloat(trx)*parseFloat(btcPrize);
        let usdtvalue = parseFloat(trx) * parseFloat(usdtPrize);
        const options = {
          key: razorpayKey,
          amount: amount.toString(),
          currency: currency,
          name: props.name,
          description: "Payment receipt",
          order_id: order_id,
          handler: async function (response) {
            let prop = {
              amount: parseFloat(amount) / 100,
              tocoin: "INR",
              fromcoin: fromcoin,
              fromamount: trx,
              userId: props.userId,
              network: buyCoinNetwork,
              // btcvalue:btcvalue,
              usdtvalue: usdtvalue,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature,
            };
            console.log("Hellofri", prop);
            const result = await axios.post(`${URL}/pay-order`, prop);
            console.log("<<<final Result>>>>", result);
            Swal.fire({
              icon: "success",
              title: result.data.msg,
              showCancelButton: true,
              confirmButtonText: "Ok",
            }).then((result) => {
              if (result.isConfirmed) {
                // window.location.reload();
                navigate("/wallet");
              }
            });
          },
          prefill: {
            name: props.name,
            email: props.email,
            contact: "000 0000 000",
          },
          notes: {
            address: "example address",
          },
          theme: {
            color: "#80c0f0",
          },
        };
        setLoading(false);
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (err) {
        alert(err);
        setLoading(false);
      }
    };
    document.body.appendChild(script);
  }

  const handleClickOpen = (e, coin, network) => {
    getallSymble(coin);
    setFromcoin(coin);
    setBuyCoinNetwork(network);
    setOpen(true);
  };

  const handlePaymentOpen = () => {
    setPaymentOpen(true);
    setOpen(false);
  };
  const handleWalletChange = (event) => {
    setOrderAmount(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
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
      await axios(config)
        .then(async function (res) {
          console.log("ressd", res);
          if (res?.data?.data?.length > 0) {
            let rdata = res?.data?.data;
            // axios.get(`https://api.wazirx.com/sapi/v1/tickers/24hr`).then(function (r){

            // await axios.get(`https://api.latoken.com/v2/ticker`).then(function (r) {
            // console.log("hdfjfd",r);
            // rdata.forEach((e,i) => {
            //   let c=e.coin+"/USDT";
            // // c=c.toLowerCase();
            //   const usersdata=r.data.find(ele=>ele.symbol===c);
            //   rdata[i].prize=usersdata?.lastPrice;
            // });
            console.log("*&*&*&*&", rdata);
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
        console.log("djjd", params.row);
        let ch24h = params.row.change24h.toString();
        console.log("Hellojfj", ch24h.substring(1));
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
          {(props.token && props.userId )?
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
                onClick={(e) => {
                  tradeHandler(e, params.row.coin, params.row.network);
                }}
              >
                Trade
              </span>
            ) : (
              <>
                {/* <span style={{ color: '#29e70c' }} onClick={handleClickOpen}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#29e70c" }} />Deposit</span> */}
                <span
                  className="quickbuys"
                  onClick={(e) => {
                    handleClickOpen(e, params.row.coin, params.row.network);
                  }}
                >
                  QuickBuy
                </span>
                {/* <span style={{ color: '#be3232',cursor: "pointer", marginLeft: "10px" }} onClick={(e) => { handleSellSideOpen(e, params.row.coin); }}><SwapVerticalCircleIcon style={{ fontSize: "small", color: "#be3232" }} />Sell</span> */}
                {/* <span  title="Comming Soon"><SwapHorizontalCircleIcon style={{ fontSize: "small", color: "slategrey" }} />Trade</span> */}
              </>
            )}
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
              <span
                className="quickbuys"
                // onClick={(e) => {
                //   handleClickOpen(e, params.row.coin, params.row.network);
                // }}
              >
                QuickBuy
              </span>
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
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
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
                    startAdornment={
                      <InputAdornment position="start">
                        {parseFloat(orderAmount) / parseFloat(trxprize) +
                          "(" +
                          fromcoin +
                          ")"}
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
          <Button id="paybutton" className="paybton" onClick={handlePaymentOpen}>
            Order Review
          </Button>
        </DialogActions>
      </BootstrapDialog>
      {/* End First Payment Model */}
      {/* Start Seccond Payment Model  */}
      <BootstrapDialog xs={3}
        className="bootbuyform"
        onClose={handlePaymentClose}
        aria-labelledby="customized-dialog-title"
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
        onClose={handleSellSideClose}
        aria-labelledby="customized-dialog-title"
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
        onClose={handleOrderRClose}
        aria-labelledby="customized-dialog-title"
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
       {/* Start payment ifrom model start  */}
      
       <BootstrapDialog xs={3}
       className="bootbuyform"
            onClose={handleIframeClose}
            aria-labelledby="customized-dialog-title"
            open={isiframeopen}
          >
            <BootstrapDialogTitle id="customizeddd-dialog-title" onClose={handleIframeClose}>
            Payment
            </BootstrapDialogTitle>
            <PaymentIframe data={payData} />
           {minutes === 0 && seconds === 0 ? (
          <p className="otp_sub">
            Please refresh Your page .
          </p>
        ) : (
          <>
            <p className="otp_sub">
              <span color="red"> Please Wait .....</span> {minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
          </>
        )}

            
          </BootstrapDialog>

          {/* End Payment model  */}
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
