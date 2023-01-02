import React, { useEffect, useState,memo } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { PulseBubbleLoader } from 'react-loaders-kit';
import Paper from "@material-ui/core/Paper";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import Hidden from "@material-ui/core/Hidden";
import Sliders from "@mui/material/Slider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Box from "@mui/material/Box";
import { URL } from "../../helpers/global";
import TradingViewWidget from "react-tradingview-widget";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import LiveChart from "./ChartLive";
import moment, { relativeTimeRounding } from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import "./TradChart.css";
//chield Component
import Torders from "./TChild/Torders";
import Tpairs from "./TChild/Tpairs";
import Thistory from "./TChild/Thistory";
import axios from "axios";
import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import swal from 'sweetalert';
import Swal from "sweetalert2";
import "../../assets/css/flexgrid.css";
import { grey } from "@mui/material/colors";
import CssBaseline from "@mui/material/CssBaseline";
import { Global } from "@emotion/react";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Tabs from "./Tabs";
import Panel from "./Panel";
import Modal from "@material-ui/core/Modal";
import "./TrdCharts.css";
// import { RadioButton } from "./RadioButton";
import { event } from "jquery";

const show1 = () => {
  document.getElementById("div1").style.display = "block";
  document.getElementById("div2").style.display = "none";
};
const show2 = () => {
  document.getElementById("div1").style.display = "none";
  document.getElementById("div2").style.display = "block";
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    flex: "1 0 auto",
    margin: theme.spacing(1),
  },
}));

const drawerBleeding = 56;



const Root = styled("div")(({ theme }) => ({
  height: "100%",
  backgroundColor:
    theme.palette.mode === "light"
      ? grey[100]
      : theme.palette.background.default,
}));





function TradChart(props) {
  const [valuepra, setValuepra] = React.useState(1);
  const [valueprasail, setValueprasail] = React.useState(1);
  const [valuepraMar, setValuepraMar] = React.useState(1);
  const [valueprasailMar, setValueprasailMar] = React.useState(1);
  const lo = useLocation();
  const [value, setValue] = React.useState("1");
  const [pair, setPair] = React.useState("FUFI");
  const [hd, setHd] = React.useState({});
  const [limitPrice, setLimitPrice] = React.useState();
  const [cprize, setCprize] = React.useState();
  const [buylimitPrice, setBuylimitPrice] = React.useState();
  const [selllimitPrice, setSelllimitPrice] = React.useState();
  const [limitqty, setlimitQty] = React.useState();
  const [marketBuyQty, setMarketBuyQty] = React.useState();
  const [marcketBuyTotal, setMarcketBuyTotal] = React.useState();
  const [marketSellQty, setMarketSellQty] = React.useState();
  const [marcketSellTotal, setMarcketSellTotal] = React.useState();
  const [limitTotal, setLimitTotal] = React.useState();
  const [etype, setEtype] = React.useState("limit");
  const [limitqtyp, setLimitqtyp] = React.useState();
  const [tWB, setTWB] = React.useState("00");
  const [rwA, setRwA] = React.useState();
  const [toSb, setToSb] = React.useState("00");
  const [rswA, setRswA] = React.useState();
  const [issetLimtP, setIssetLimitP] = React.useState(false);
  const [sLimitPrice, setSLimitPrice] = React.useState();
  const [sLimitQty, setSLimitQty] = React.useState();
  const [sTotalAmount, setSTotalAmount] = React.useState();
  const [priceData, setPriceData] = React.useState([]);
  const [paymentMethod, setPaymentMethod] = React.useState("COD");
  const [iskyc, setIskyc] = React.useState();
  const [iscomLoading, setIscomLoading] = React.useState(false);

  const radioChangeHandler = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleOpened = () => {
    setOpen(true);
    document.querySelector(".modelfufis").style.display = "block";
    //  let btns = document.querySelector(".modelfufis");
    //  btns.removeAttribute('tabindex', '-1');
    // return false
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [issubmit, setIssubmit] = useState(false);

  const checkKycStatus = async () => {
    let data = JSON.stringify({
      "email": props.email,
    });
    let config = {
      method: 'post',
      url: `${URL}checkKycStatus`,
      headers: {
        'Content-Type': 'application/json',
        'x-access-token' : `${props.token}`
      },
      data: data
    };

    await axios(config).then(function (response) {
        if (response.data.status) {
          setIskyc(response.data.data);
        }

      }).catch(function (error) {
        console.log(error);
      });
  }
  const getmarcketPrize = async () => {
    var config = {
      method: 'get',
      url: `${URL}getmarketprize`
    };
    await axios(config)
      .then(function (response) {
        if (response.data.status) {
          setLimitPrice(response.data.data.selprize);
          setSLimitPrice(response.data.data.buyprize);
        }

      }).catch(function (error) {
        console.log(error);
      });
  }

  useEffect(() => {
    getmarcketPrize();
  }, [etype])



  useEffect(() => {
    let btns = document.querySelector(".modelfufis");
    if (isLoaded) {
      setIsPageLoaded(true);
      btns.removeAttribute('tabindex', '-1');
    }
  }, [isLoaded]);


  const handleCloseed = () => {
    setOpen(false);

    //reload(); 
  };
  const getChartPriceData = () => {
    // var data = {
    //      "coin": coin
    // }
    let config = {
      headers: {
        "Content-Type": "application/json",
      },
    };


    axios.get(`${URL}getTradeViewData?interval=1D&page=1&datalimit=120`, config).then((res) => {
      let r = res.data.data;
      const cdata = r.data.map((d) => {
        // let ms = new Date(d.time).getTime();
        return {
          time: (d[0] && typeof(d[0]) !== "undefined" && d[0] !== null ) ?d[0] / 1000:1668396606007,
          open: (d[1] && typeof(d[1]) !== "undefined" && d[1] !== null )?parseFloat(d[1]):0.11,
          high: (d[2] && typeof(d[2]) !== "undefined" && d[2] !== null)?parseFloat(d[2]):0.11,
          low: (d[3] && typeof(d[3]) !== "undefined" && d[3] !== null )?parseFloat(d[3]):0.11,
          close:(d[4] && typeof(d[4]) !== "undefined" && d[4] !== null )? parseFloat(d[4]):0.11,
          value: (d[5] && d[5] != null)?parseFloat(d[5]):14959,
        };
      });
      setPriceData(cdata);
    }).catch((error) => { });
  };

  function valueLabelFormatForPra(value) {
    let scaledValue = value;
    return scaledValue + " (%)";
  }
  function calculateValueForPra(value) {
    return value;
  }

  function valueLabelFormatForPraSail(value) {
    let scaledValue = value;
    return scaledValue + " (%)";
  }
  function calculateValueForPraSail(value) {
    return value;
  }




  function dateAdd(date, interval, units) {
    if (!(date instanceof Date)) {
      return undefined;
    } else {
      var ret = new Date(date); //don't change original date
      var checkRollover = function () {
        if (ret.getDate() != date.getDate()) ret.setDate(0);
      };
      switch (String(interval).toLowerCase()) {
        case "month":
          ret.setMonth(ret.getMonth() + units);
          checkRollover();
          break;
        case "weeks":
          ret.setDate(ret.getDate() + 7 * units);
          break;
        case "days":
          ret.setDate(ret.getDate() + units);
          break;
        case "hours":
          ret.setTime(ret.getTime() + units * 3600000);
          break;
        case "minutes":
          ret.setTime(ret.getTime() + units * 60000);
          break;
        case "second":
          ret.setTime(ret.getTime() + units * 1000);
          break;
        default:
          ret = undefined;
          break;
      }
      return ret;
    }
  }
  ///Market sections

  function valueLabelFormatForPraMar(value) {
    let scaledValue = value;
    return scaledValue + " (%)";
  }
  function calculateValueForPraMar(value) {
    return value;
  }

  function valueLabelFormatForPraSailMar(value) {
    let scaledValue = value;
    return scaledValue + " (%)";
  }
  function calculateValueForPraSailMar(value) {
    return value;
  }
  const navigate = useNavigate();
  const handleSaleLimitPrice = (event) => {
    // let pr=(event.target.value).toFixed(3); 
    let le= event.target.value.length;
    if(le>4){
      toast.error("You cannot edit the order price more than two decimal places .", {
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
    
    let qt = (sLimitQty * event.target.value);
    setSTotalAmount(qt);
    setSelllimitPrice(event.target.value);
    if (cprize > event.target.value) {
      let diff = (parseFloat(cprize) - parseFloat(event.target.value));
      let diffp = (diff * 100 / parseFloat(cprize));
      if (diffp > 0 && props.userId !== 45) {
        setIssubmit(false);
        toast.error("Your order price must be greater than last traded price (LTP). ", {
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

    }

  };

  const handleMLimitPrice = (event) => {
    setSLimitPrice(event.target.value);
  };
  const HandileSaleLimitQty = (event) => {
    let to = selllimitPrice * event.target.value;
    setSTotalAmount(to);
    // setRswA(toSb - to);
    setRswA(toSb - event.target.value);
    setSLimitQty(event.target.value);
    let lp = (event.target.value * selllimitPrice);
   
  };
  const handileSaleTotalAmount = (event) => {
    let qt = event.target.value / selllimitPrice;
    let usdtv = parseFloat(toSb) * selllimitPrice;
    let lp = (qt * 100) / toSb;

    // if (event.target.value > 100) {
    //   setIssubmit(false);
    //   toast.error("Maximum sell order limit is 100 usdt per User .", {
    //     position: "bottom-center",
    //     autoClose: false,
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });

    //   return;

    // }
    setSLimitQty(qt);
    setRswA(toSb - qt);
    setSTotalAmount(event.target.value);

    setValueprasail(lp);
  };
  const handileLimitTotal = (event) => {
    let qt = event.target.value / buylimitPrice;
    setlimitQty(qt);
    setLimitTotal(event.target.value);
    setRwA(tWB - event.target.value);
    let lp = (event.target.value * 100) / tWB;
    setValuepra(lp);
  };
  const handleLimitQty = (event) => {
    let to = buylimitPrice * event.target.value;
    setLimitTotal(to);
    setRwA(tWB - to);
    setlimitQty(event.target.value);
    let lp = (to * 100) / tWB;
    setValuepra(lp);
  };
  const handleLimitPrice = (event) => {
    // setLimitPrice(event.target.value);
    setBuylimitPrice(event.target.value);
    // if(cprize > event.target.value){
    //   let diff=(parseFloat(cprize)-parseFloat(event.target.value));
    //    let diffp=(diff*100/parseFloat(cprize));
    //    console.log("&*&*&*&&&&&&",diffp); 
    //    if(diffp>5 && props.userId !==45 ){
    //     setIssubmit(false);
    //     toast.error("Your order price must be close to the last traded price (LTP).", {
    //       position: "bottom-center",
    //       autoClose:false,
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //     // Swal.fire({
    //     //   icon: "info",
    //     //   title: `Your prize is too low so can not procide to places orders `,
    //     //   confirmButtonText: "Ok",
    //     // });

    //     // return;
    //    }

    //   }
    let qty = (limitTotal / event.target.value);
    setlimitQty(qty);


  };

  const handleMBuyLimitPrice = (event) => {
    setLimitPrice(event.target.value);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeForPra = (event, newValue) => {
    if (typeof newValue === "number") {
      setValuepra(newValue);
      let bamount = (tWB * newValue) / 100;
      let q = bamount / buylimitPrice;
      setlimitQty(q);
      setLimitTotal(bamount);
      setRwA(tWB - bamount);
      setLimitqtyp(newValue);
    }
  };

  const handleChangeForPraSail = (event, newValue) => {
    if (typeof newValue === "number") {
      setValueprasail(newValue);
      let bamount = (toSb * newValue) / 100;
      let usdtv = parseFloat(toSb) * selllimitPrice;
      let q = bamount * selllimitPrice;
      setSLimitQty(bamount);
      setSTotalAmount(q);
      setRswA(toSb - bamount);
      setLimitqtyp(newValue);
      // if (q > 100) {
      //   setIssubmit(false);
      //   toast.error("Maximum sell order limit is 100 usdt per User.", {
      //     position: "bottom-center",
      //     autoClose: false,
      //     autoClose: 5000,
      //     hideProgressBar: false,
      //     closeOnClick: true,
      //     pauseOnHover: true,
      //     draggable: true,
      //     progress: undefined,
      //   });

      //   return;

      // }
    }
  };

  //Market Slider

  const handleChangeForPraMar = (event, newValue) => {
    if (typeof newValue === "number") {
      setValuepraMar(newValue);
      let bamount = (tWB * newValue) / 100;
      let q = bamount / limitPrice;
      setMarcketBuyTotal(bamount);
      setRwA(tWB - bamount);
      setMarketBuyQty(q);
    }
  };

  const handleChangeForPraSailMar = (event, newValue) => {
    if (typeof newValue === "number") {
      setValueprasailMar(newValue);
      let bamount = (toSb * newValue) / 100;
      let q = bamount * limitPrice;
      setMarketSellQty(bamount);
      setMarcketSellTotal(q);
      setRswA(toSb - bamount);
    }
  };

  const handleMarcketBuyQty = (event) => {
    let to = limitPrice * event.target.value;
    setMarcketBuyTotal(to);
    setRwA(tWB - to);
    setMarketBuyQty(event.target.value);
    let lp = (to * 100) / tWB;
    setValuepraMar(lp);
  };

  const handileMarcketBuyTotal = (event) => {
    let qt = event.target.value / limitPrice;
    setMarketBuyQty(qt);
    setMarcketBuyTotal(event.target.value);
    setRwA(tWB - event.target.value);
    let lp = (event.target.value * 100) / tWB;
    setValuepraMar(lp);
  };

  const HandileSaleMarketQty = (event) => {
    let to = sLimitPrice * event.target.value;

    setMarcketSellTotal(to);
    setRswA(toSb - event.target.value);
    setMarketSellQty(event.target.value);
    let lp = (event.target.value * 100) / toSb;
    setValueprasailMar(lp);
  };

  const HandileSaleMarketTotal = (event) => {
    let to = event.target.value / limitPrice;
    setMarcketSellTotal(event.target.value);
    setMarketSellQty(to);
    setRswA(toSb - to);
    let lp = (event.target.value * 100) / toSb;
    setValueprasailMar(lp);
  };
  // console.log("Window", window);
  //End Marcket slider
  const classes = useStyles();
  const { width } = props;
  React.useEffect(() => {
    if (lo?.state?.pairdata) {
      setPair(lo?.state?.pairdata);
    }
    setTimeout(() => {
      setIssetLimitP(true);
    }, 1000);

    getUserWaletAmount();
    // getChartPriceData();
    setIsLoaded(true);
    checkKycStatus();
    getmarcketPrize();

  }, []);

  React.useEffect(() => {
    getCoinLetestPrice(pair);
    setTimeout(() => {
      setIssetLimitP(true);
    }, 1000);
  }, [pair]);

  React.useEffect(() => {
    // setLimitPrice(hd.c);
    setCprize(hd.c);
    setBuylimitPrice(hd.c);
    setSelllimitPrice(hd.c);
    // setSLimitPrice(hd.c);
    setIssetLimitP(false);
    // getUserpairWaletAmount(hd.s);
  }, [issetLimtP]);

  React.useEffect(() => {
    setIssetLimitP(true);
  }, [hd.s]);

  const getCoinLetestPrice = (coin) => {
    var data = {
      coin: coin,
    };
    let config = {
      headers: {
        "x-access-token": props.token,
        "Content-Type": "application/json",
      },
    };
    //https://api.tradekia.com/api/getTotalWaletData

    axios.post(`${URL}getsymbleLetestPrize`, data, config)
      .then((res) => {
        let r = res.data.data;
        let fd = changehdformate(r);
        setHd(fd);
      })
      .catch((error) => {
        if (error.response.status && error.response.status === 401) {
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

  let internationalNumberFormat = new Intl.NumberFormat("en-US");

  const changehdformate = (r) => {
    let volChang = internationalNumberFormat.format(
      (r.valume / 1000).toFixed(2)
    );
    // r.h = internationalNumberFormat.format(r.HigiestPrice);
    // r.l = internationalNumberFormat.format(r.lowestPrice);
    r.h = r.HigiestPrice;
    r.l = r.lowestPrice;
    r.s = r.coin + "/USDT";
    r.c = internationalNumberFormat.format(r.UsdtPrize);
    r.P = r.cUsdtPrize + " %";
    r.p = r.change24h.toString();
    r.c = r.cUsdtPrize;
    r.v = r.valume.toLocaleString("en", {
      useGrouping: false,
      minimumFractionDigits: 3,
    });
    r.q = "10101M";
    return r;
  };
  const refreshPage = () => {
    window.location.reload(false);
  }
  /*** BUY OR Sell On Limit Section Start ***** */
  const buyHandler = () => {
    setIssubmit(true);
    let data = {
      user_id: props.userId,
      lastPrice: buylimitPrice,
      toquantity: limitqty,
      fromquantity: limitTotal,
      network: "FEP20",
      type: "L",
      tocoin: pair,
      fromcoin: "USDT(TRC20)",
      usdtValue: limitTotal,
      c: "C",
      action: 1,
      status: 3,
    };
    console.log("************************************************************", data);
    // if(cprize > buylimitPrice){
    // let diff=(parseFloat(cprize)-parseFloat(buylimitPrice));
    //  let diffp=(diff*100/parseFloat(cprize));
    //  if(diffp>5 && props.userId !==45){
    //   setIssubmit(false);
    //   toast.error("Your order price must be close to the last traded price (LTP).", {
    //     position: "bottom-center",
    //     autoClose:false,
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });
    //   // Swal.fire({
    //   //   icon: "info",
    //   //   title: `Your prize is too low so can not procide to places orders `,
    //   //   confirmButtonText: "Ok",
    //   // });

    //   return;
    //  }

    // }
    if (iskyc !== 1) {
      setIssubmit(false);
      let m;
      let sh = false;
      if (iskyc === 3) {
        m = `Please complete your KYC to Buy and sell`;
        sh = true;
      } else if (iskyc === 2) {
        m = `Your KYC is rejected Please apply with Valid documents`;
        sh = true;
      } else if (iskyc === 0) {
        m = `Your KYC is still pending, Please wait for the approval.`;
      }
      Swal.fire({
        icon: "error",
        title: m,
        showCancelButton: true,
        confirmButtonText: (sh) ? "Apply" : "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/verify");
        }
      });
      return;
    }

    if (limitTotal < 1) {
      setIssubmit(false);
      Swal.fire({
        icon: "info",
        title: `Total  order value should be more than 1 USDT`,
        confirmButtonText: "Ok",
      });

      return;
    }

    if (tWB < limitTotal) {
      setIssubmit(false);
      Swal.fire({
        icon: "error",
        title: `Please add fund.`,
        showCancelButton: true,
        confirmButtonText: "Deposit Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/wallet");
        }
      });
      return;
    }


    let config = {
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": props.token,
      },
    };

    const waitTime = 5000;
    const handleError = error => {
        // this makes sure that the FAIL output isn't repeated in the case when there's a failure before the timeout
        if (!error.handled) {
            if (error.timedout) {
              setIssubmit(false);
                Swal.fire(
                    'Well Done',
                    'Your Order has been placed successfully.',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                      refreshPage();
                    }
                  });
            } else {
                console.log("FAIL!", error.message);
                error.handled = true;
                throw error;
            }
        }
    };

    const myRequest = axios.post(`${URL}createOrderBuySell`, data, config).then((res) => {
      setIssubmit(false);
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: `Your Order has been placed successfully.`,
          confirmButtonText: "Ok",
        }).then(async (result) => {
          if (result.isConfirmed) {
            refreshPage();
          }
        });
      }else {
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
    }).catch(handleError);
    const timer = new Promise((_, reject) => setTimeout(reject, waitTime, {timedout: "request taking a long time"}));
    console.log("KKKKKKKK",timer); 
    return Promise.race([myRequest, timer]).catch(handleError);
    
    // .catch((error) => {
    //   setIssubmit(false);
    //   if (error.response.status === 401) {
    //     toast.error("Some error occured, please try again some time.", {
    //       position: "bottom-center",
    //       autoClose: 5000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //     });
    //   }
    // });
  };
  const saleHandler = () => {
    setIssubmit(true);
    let data = {
      user_id: props.userId,
      lastPrice: selllimitPrice,
      toquantity: sTotalAmount,
      fromquantity: sLimitQty,
      network: "TRC20",
      tocoin: "USDT(TRC20)",
      type: "L",
      c: "C",
      fromcoin: pair,
      usdtValue: sTotalAmount,
      action: 2,
      status: 1,
    };
    console.log("************************************************************", data);

    let usdtv = parseFloat(toSb) * selllimitPrice;
    // if (sTotalAmount > 100) {
    //   setIssubmit(false);
    //   toast.error("Maximum sell order limit is 100 usdt per User.", {
    //     position: "bottom-center",
    //     autoClose: false,
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //   });

    //   return;

    // }

    if (cprize > selllimitPrice) {
      let diff = (parseFloat(cprize) - parseFloat(selllimitPrice));
      let diffp = (diff * 100 / parseFloat(cprize));
      if (diffp > 0 && props.userId !== 45) {
        setIssubmit(false);
        toast.error("Your order price must be greater than last traded price (LTP).", {
          position: "top-center",
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

    }

    if (iskyc !== 1) {
      setIssubmit(false);
      let m;
      let sh = false;
      if (iskyc === 3) {
        m = `Please complete your KYC to Buy and sell`;
        sh = true;
      } else if (iskyc === 2) {
        m = `Your KYC is rejected Please apply with Valid documents`;
        sh = true;
      } else if (iskyc === 0) {
        m = `Your KYC is still pending, Please wait for the approval.`;
      }
      Swal.fire({
        icon: "error",
        title: m,
        showCancelButton: true,
        confirmButtonText: (sh) ? "Apply" : "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/verify");
        }
      });
      return;
    }
    if (sTotalAmount < 1) {
      setIssubmit(false);
      Swal.fire({
        icon: "info",
        title: `Total  order value should be more than 1 USDT`,
        confirmButtonText: "Ok",
      });
      return;
    }
    if (toSb < sLimitQty) {
      setIssubmit(false);
      Swal.fire({
        title: `Insufficient fund.<br>Please add fund.`,
        showCancelButton: true,
        confirmButtonText: "Deposit Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/wallet");
        }
      });
      return;
    }

    let config = {
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": props.token,
      },
    };
    axios.post(`${URL}createOrderBuySell`, data, config).then((res) => {
      setIssubmit(false);
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: `Your Order has been placed successfully.`,
          confirmButtonText: "Ok",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // refreshPage();
            // setIscomLoading(true); 
            // getUserWaletAmount();
            // setSLimitQty("");
            // setSTotalAmount("");
            window.location.reload();
          }
        });
      } else {
        toast.error(res.data.message, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }).catch((error) => {
      setIssubmit(false);
      if (error.response.status === 401) {
        toast.error("Some error occured, please try again some time.", {
          position: "top-center",
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
  /*** BUY OR Sell On Limit Section End ***** */
  /*** BUY OR Sell On Marcket Section Start  ***** */
  const buyMarcketHandler = () => {
    setIssubmit(true);
    let data = {
      user_id: props.userId,
      lastPrice: limitPrice,
      toquantity: marketBuyQty,
      fromquantity: marcketBuyTotal,
      network: "FEP20",
      type: "M",
      c: "C",
      tocoin: pair,
      fromcoin: "USDT(TRC20)",
      usdtValue: marcketBuyTotal,
      action: 1,
      status: 1,
    };
    if (iskyc !== 1) {
      setIssubmit(false);
      let m;
      let sh = false;
      if (iskyc === 3) {
        m = `Please complete your KYC to Buy and sell`;
        sh = true;
      } else if (iskyc === 2) {
        m = `Your KYC is rejected Please apply with Valid documents`;
        sh = true;
      } else if (iskyc === 0) {
        m = `Your KYC is still pending, Please wait for the approval.`;
      }
      Swal.fire({
        icon: "error",
        title: m,
        showCancelButton: true,
        confirmButtonText: (sh) ? "Apply" : "Ok",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/verify");
        }
      });
      return;
    }

    if (marcketBuyTotal < 1) {
      setIssubmit(false);
      Swal.fire({
        icon: "info",
        title: `Total  order value should be more than 1 USDT`,
        confirmButtonText: "Ok",
      });
      return;
    }

    if (tWB < marcketBuyTotal) {
      setIssubmit(false);
      Swal.fire({
        icon: "error",
        title: `Please add fund.`,
        showCancelButton: true,
        confirmButtonText: "Deposit Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/wallet");
        }
      });
      return;
    }

    let config = {
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": props.token,
      },
    };

    axios.post(`${URL}createOrderBuySell`, data, config).then((res) => {
      setIssubmit(false);
      // saleSideMatchHandler();
      if (res.data.status) {

        Swal.fire({
          icon: "success",
          title: `Your Order has been placed successfully.`,
          confirmButtonText: "Ok",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // setIscomLoading(true); 
            // getUserWaletAmount();
            // setMarcketBuyTotal("");
            // setMarketBuyQty("");
            window.location.reload();
          }
        });
      }
    }).catch((error) => {
      setIssubmit(false);
      if (error.response.status === 401) {
        toast.error("Some error occured, please try again some time.", {
          position: "top-center",
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

  const saleMarcketHandler = () => {
    setIssubmit(true);
    let data = {
      user_id: props.userId,
      lastPrice: sLimitPrice,
      toquantity: marcketSellTotal,
      fromquantity: marketSellQty,
      network: "TRC20",
      type: "M",
      tocoin: "USDT(TRC20)",
      fromcoin: pair,
      c: "C",
      usdtValue: marcketSellTotal,
      action: 2,
      status: 1,
    };
    if (iskyc !== 1) {
      setIssubmit(false);
      let m;
      let sh = false;
      if (iskyc === 3) {
        m = `Please complete your KYC to Buy and sell`;
        sh = true;
      } else if (iskyc === 2) {
        m = `Your KYC is rejected Please apply with Valid documents`;
        sh = true;
      } else if (iskyc === 0) {
        m = `Your KYC is still pending, Please wait for the approval.`;
      }
      Swal.fire({
        icon: "error",
        title: m,
        showCancelButton: true,
        confirmButtonText: (sh) ? "Apply" : "Ok",
      });
      return;
    }

    if (marcketSellTotal < 1) {
      setIssubmit(false);
      Swal.fire({
        icon: "info",
        title: `Total  order value should be more than 1 USDT`,
        confirmButtonText: "Ok",
      });
      return;
    }

    if (toSb < marketSellQty) {
      setIssubmit(false);
      Swal.fire({
        title: `Insufficient fund.<br>Please add fund.`,
        showCancelButton: true,
        confirmButtonText: "Deposit Now",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/wallet");
        }
      });;
      return;
    }

    let config = {
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": props.token,
      },
    };

    axios.post(`${URL}createOrderBuySell`, data, config).then((res) => {
      setIssubmit(false);
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: `Your Order has been placed successfully.`,
          confirmButtonText: "Ok",
        }).then(async (result) => {
          if (result.isConfirmed) {
            // setIscomLoading(true);
            // getUserWaletAmount();
            // setMarcketSellTotal("");
            // setMarketSellQty("");
            // window.location.reload();
            window.location.reload();
          }
        });
      }
    }).catch((error) => {
      if (error.response.status === 401) {
        toast.error("Some error occured, please try again some time.", {
          position: "top-center",
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
  /*** BUY OR Sell On Marcket Section Start  ***** */
  /* ***** Matching all side code Start ***** */
  const saleSideMatchHandler = async () => {
    return new Promise(function executor(resolve, reject) {
      let config = {
        headers: {
          "x-access-token": props.token,
          "Content-Type": "application/json",
        },
      };
      //https://api.tradekia.com/api/SailSidematchExchanges
      // axios.post(`${URL}SellSideMatch`, config)
      axios
        .post(`${URL}SellSideMatch`, config)
        .then((res) => {
          if (res.data.status) {
            console.log("SailSidesuccess");
            return resolve("success");
          } else {
            return reject("Faield");
          }
        }).catch((error) => {
          if (error.response.status === 401) {
            console.log("faield");
            return reject("faield");
            // refreshtokn();
          }
        });
    });
  };
  const buSideMatchHandler = async () => {
    return new Promise(function executor(resolve, reject) {
      let config = {
        headers: {
          "x-access-token": props.token,
          "Content-Type": "application/json",
        },
      };
      //https://api.tradekia.com/api/BySidematchExchanges
      // axios.post(`${URL}buySideMatch`, config)
      axios.post(`${URL}buySideMatch`, config).then((res) => {
          console.log("res.data123buy", res.data);
          if (res.data.status) {
            console.log("bysudesuccess");
            return resolve("Success");
          } else {
            return reject("faield");
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            console.log("faield");
            return reject("faield");
          }
        });
    });
  };
  /* ***** Matching all side code End ***** */
  /* *** Get User Wallet Amount agenest all coin **** */
  const getUserWaletAmount = () => {
    var data = {
      user_id: props.userId,
    };
    let config = {
      headers: {
        "x-access-token": props.token,
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${URL}getTotalWaletData`, data, config)
      .then((res) => {
        let r = res.data.data;
        const result = r.find((el) => {
          if (el.coin === "FUFI") return true;
        });
        const rest = r.find((el) => {
          if (el.coin === "USDT(TRC20)") return true;
        });
        if (result !== undefined) {
          setToSb(result.totalWalet);
        }
        if (rest !== undefined) {
          setTWB(rest.totalWalet);
        }
      })
      .catch((error) => {
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
  const { window } = props;

  const [open, setOpen] = React.useState(true);

  // const toggleDrawer = (e) => () => {
  //         setOpen(e);
  //         document.querySelector('.MuiDrawer-modal').style.display='block'
  // };

  // This is used only for the example
  const container =
    window !== undefined ? () => window().document.body : undefined;

  // const [show, setShow] = React.useState('red');

  // useEffect(() => {
  //   setShow()
  // });


  // const step2 = () => {
  //       document.querySelector('.firstdiv').style.display = 'none';
  //       document.querySelector('.secondiv').style.display = 'block';

  //       }

  //       const step3 = () => {
  //         document.querySelector('.secondiv').style.display = 'none';
  //         document.querySelector('.firstdiv').style.display = 'block';

  //         }
  const [style, setStyle] = useState("cont");
  const [style2, setStyle2] = useState("cont2");
  const step2 = () => {

    document.querySelector('.firstdiv').style.display = 'none';
    document.querySelector('.secondiv').style.display = 'block';

    if (style === 'cont') {
      setStyle("cont2")
      setStyle2("cont")
    } else if (style2 === 'cont') {
      setStyle2("cont2")
      setStyle("cont")
    }
  }

  const step3 = () => {
    document.querySelector('.secondiv').style.display = 'none';
    document.querySelector('.firstdiv').style.display = 'block';
    if (style === 'cont2') {
      setStyle("cont")
      setStyle2("cont2")
    } else if (style === 'cont') {
      setStyle("cont2")
      setStyle2("cont")
    }
  }
  const step4 = () => {
    document.querySelector('.firstdiv1').style.display = 'none';
    document.querySelector('.secondiv2').style.display = 'block';
    if (style === 'cont') {
      setStyle("cont2")
      setStyle2("cont")
    } else if (style2 === 'cont') {
      setStyle2("cont2")
      setStyle("cont")
    }
  }

  const step5 = () => {
    document.querySelector('.secondiv2').style.display = 'none';
    document.querySelector('.firstdiv1').style.display = 'block';
    if (style === 'cont2') {
      setStyle("cont")
      setStyle2("cont2")
    } else if (style === 'cont') {
      setStyle("cont2")
      setStyle2("cont")
    }
  }


  return (
    <>
      <Box className="container-fluid container-xl wraed"
        sx={{
          background: "#e0e0e0",
        }}
      >
        <div className="wrapper">
          <div class="Grid Grid--gutters Grid--cols-6 u-textCenter">
            <div class="Grid-cell">
              <div class="Demo content-1of6">
                <Hidden>
                  <Paper className={classes.paper}>
                    <div className="balanceSheet_header">
                      <div className="totalBal_div">
                        {/* <img src={DollarSvg} alt="totalBalance" /> BTC-USDT*/}
                        <span>Pair</span>
                        <div className="balDetails_div">
                          <h4>{hd.s ? hd.s : ""}</h4>
                        </div>
                      </div>
                    </div>
                  </Paper>
                </Hidden>

              </div>
            </div>
            <div class="Grid-cell">
              <div class="Demo content-1of6">
                <Hidden>
                  <Paper className={classes.paper}>
                    <div className="balDetails_div">
                      <span>Last Price</span>
                      <h4> {hd?.c ? hd?.c : ""}</h4>
                    </div>
                  </Paper>
                </Hidden>
              </div>
            </div>
            <div class="Grid-cell">
              <div class="Demo content-1of6">
                <Hidden>
                  <Paper className={classes.paper}>
                    <div className="balDetails_div">
                      <span>24h Change</span>
                      {hd.p ? (
                        hd?.p.slice(0, 1) == "-" ? (
                          <h4 style={{ color: "#d9442e" }}>{hd?.p}(%)</h4>
                        ) : (
                          <h4 style={{ color: "#76b840" }}>{hd?.p}(%)</h4>
                        )
                      ) : (
                        <h4>000(%)</h4>
                      )}
                    </div>
                  </Paper>
                </Hidden>
              </div>
            </div>
            <div class="Grid-cell">
              <div class="Demo content-1of6">
                <Hidden>
                  <Paper className={classes.paper}>
                    <div className="balDetails_div">
                      <span>24h High</span>
                      <h4>{hd?.h ? hd?.h : ""}</h4>
                    </div>
                  </Paper>
                </Hidden>
              </div>
            </div>
            <div class="Grid-cell">
              <div class="Demo content-1of6">
                <Hidden>
                  <Paper className={classes.paper}>
                    {" "}
                    <div className="balDetails_div">
                      <span>24h Low</span>
                      <h4>{hd?.l ? hd?.l : ""}</h4>
                    </div>
                  </Paper>
                </Hidden>
              </div>
            </div>
            <div class="Grid-cell">
              <div class="Demo content-1of6">
                <Hidden>
                  <Paper className={classes.paper}>
                    <div className="balDetails_div">
                      <span>24h Volume</span>
                      <h4>{hd?.v ? hd?.v : ""} USD </h4>
                    </div>
                  </Paper>
                </Hidden>
              </div>
            </div>
          </div>

          <div id="trdekias-tabs1">
            <Tabs>
              <Panel className="todersd" title="Order Book">
                <Hidden>
                  <Torders pairdata={pair} isloading={iscomLoading} />
                </Hidden>
              </Panel>
              <Panel title="Chart">
                <Hidden>
                  <Box id="chartview">
                    <Paper
                      sx={{
                        width: "100%",
                        overflow: "hidden",
                        padding: "0px 5px",
                        margin: "0px 5px",
                      }}
                    >
                      <div id="tradingview_ea09b">
                        {/* <LiveChart priceData={priceData} /> */}
                        <LiveChart />
                      </div>
                    </Paper>
                  </Box>
                </Hidden>
              </Panel>
              <Panel title="Trades">
                <Hidden>
                  <Box>
                    <Tpairs pairdata={(p) => setPair(p)} />
                    <Thistory pairdata={pair} isloading={iscomLoading} />
                  </Box>
                </Hidden>
              </Panel>
            </Tabs>
          </div>
          <div id="trdekias-tabs" className={classes.root}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={1}>
                <Grid item xs={6} md={3} lg={3}>
                  <Item>
                    <Hidden>
                      <Torders pairdata={pair} isloading={iscomLoading} />
                    </Hidden>
                  </Item>
                </Grid>
                <Grid item xs={12} md={6} lg={6} order={{ xs: 3, lg: 2 }}>
                  <Item>
                    <Hidden>
                      <Box id="chartview">
                        <Paper
                          sx={{
                            width: "100%",
                            overflow: "hidden",
                            padding: "0px 5px",
                            margin: "0px 5px",
                          }}
                        >
                          <div id="tradingview_ea09b">
                            <LiveChart priceData={priceData} />
                          </div>
                        </Paper>
                      </Box>
                    </Hidden>
                  </Item>
                </Grid>
                <Grid item  xs={6} md={3} lg={3} order={{ xs: 1, lg: 3 }}>
                  <Item>
                    <Hidden>
                      <Hidden>
                        <Box>
                          <Tpairs pairdata={(p) => setPair(p)} />
                          <Thistory pairdata={pair} isloading={iscomLoading} />
                        </Box>
                      </Hidden>
                    </Hidden>
                  </Item>
                </Grid>
              </Grid>
            </Box>
          </div>

          <Modal className="mdtrademodal"
            open={open}
            onClose={(_, reason) => {
              if (reason !== "backdropClick") {
                handleCloseed();
              }
            }}
          >
            <div className="modelfufis">
              <a href="/trade">
                <button
                  className="boxied"
                  type="button"
                  onClick={handleCloseed}
                >
                  Close
                </button>
              </a>

              <Paper id="tradForm" className={classes.paper}>
                <Box>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          className="mtghjy"
                          label="Limit"
                          onClick={(e) => setEtype("limit")}
                          value="1"
                        />
                        {/* <Tab
                          className="mtghjy"
                          label="Market"
                          onClick={(e) => setEtype("market")}
                          value="2"
                        /> */}
                      </TabList>
                    </Box>
                    {/* Limit Side Buy Or Sell Code Start  */}
                    <TabPanel
                      id="tabOutline"
                      value="1"
                      style={{ marginTop: "8px" }}
                    >

                      <Box className="boxflex">
                        {/* Limit Side Buy Handler Code Start  */}

                        <ul>
                          <li className={style} onClick={step2}><button>Sell</button></li>
                          <li className={style2} onClick={step3}><button>Buy</button></li>
                        </ul>
                        <h4 className="tradheader" style={{ float: 'left', width: '100%' }}>
                          <span>Limit</span>
                        </h4>
                        <Paper className="firstdiv">
                          <Box>
                            <div>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Price
                                </FormHelperText>

                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={buylimitPrice}
                                  onChange={handleLimitPrice}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "weight",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Amount
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={limitqty}
                                  onChange={handleLimitQty}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        {pair}
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Amount",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />

                                <Box sx={{ width: 250, display: "flex" }}>
                                  <Sliders
                                    value={valuepra}
                                    min={1}
                                    step={1}
                                    max={99}
                                    scale={calculateValueForPra}
                                    getAriaValueText={valueLabelFormatForPra}
                                    valueLabelFormat={valueLabelFormatForPra}
                                    onChange={handleChangeForPra}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                  />
                                </Box>
                              </FormControl>

                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
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
                                    {rwA !== undefined ? (
                                      rwA >= 0 ? (
                                        rwA
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          Insufficient Balance
                                        </span>
                                      )
                                    ) : (
                                      tWB
                                    )}
                                  </FormHelperText>
                                </Box>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={limitTotal}
                                  onChange={handileLimitTotal}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Total",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              {issubmit ?
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  <PulseBubbleLoader />
                                </Button>
                                :
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  onClick={buyHandler}
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  Buy {pair}
                                </Button>
                              }

                            </div>
                          </Box>
                        </Paper>

                        {/* Limit Buy Side  Handler Code End  */}
                        {/* Limit Sell Side  Handler Code Start  */}

                        <Paper className="secondiv">

                          <Box>
                            <div>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Price
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={selllimitPrice}
                                  onChange={handleSaleLimitPrice}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "weight",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text">
                                  Amount
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={sLimitQty}
                                  onChange={HandileSaleLimitQty}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        {pair}
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Amount",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                                <Box sx={{ width: "250", display: "flex" }}>
                                  <Sliders
                                    value={valueprasail}
                                    min={1}
                                    step={1}
                                    max={99}
                                    scale={calculateValueForPraSail}
                                    getAriaValueText={
                                      valueLabelFormatForPraSail
                                    }
                                    valueLabelFormat={
                                      valueLabelFormatForPraSail
                                    }
                                    onChange={handleChangeForPraSail}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                  />
                                </Box>
                              </FormControl>

                              <FormControl
                                className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
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
                                    {rswA !== undefined ? (
                                      rswA >= 0 ? (
                                        rswA
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          Insufficient Balance
                                        </span>
                                      )
                                    ) : (
                                      toSb
                                    )}
                                  </FormHelperText>
                                </Box>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={sTotalAmount}
                                  onChange={handileSaleTotalAmount}
                                  // hiddenLabel={true}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Total Sale",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>

                              {issubmit ?
                                <Button className="butnbyfufi kf1"
                                  variant="contained"
                                  color="error"
                                  sx={{ m: 1, width: "100%" }}
                                  disableElevation
                                >
                                  <PulseBubbleLoader />
                                </Button>
                                :
                                <Button className="butnbyfufi kf1"
                                  variant="contained"
                                  color="error"
                                  onClick={saleHandler}
                                  sx={{ m: 1, width: "100%" }}
                                  disableElevation
                                >
                                  Sell {pair}
                                </Button>
                              }
                            </div>
                          </Box>
                        </Paper>
                        {/* Limit Side Sell Handler Code End */}
                      </Box>
                    </TabPanel>



                    {/* Limit Side Buy Or Sell Code End  */}
                    {/* Marcket  Side Buy Or Sell Code Start  */}
                    {/* <TabPanel
                      id="tabOutline"
                      value="2"
                      style={{ marginTop: "8px" }}
                    >
                      <Box className="boxflex">

                        <ul>
                          <li className={style} onClick={step4}><button>Sell</button></li>
                          <li className={style2} onClick={step5}><button>Buy</button></li>
                        </ul>

                        <h4 className="tradheader" style={{ float: 'left', width: '100%' }}>
                          <span>Market</span>
                        </h4>
                        {/* Market Side Buy Start Code  */}
                    {/* <Paper className="firstdiv1">
                          <Box>
                            <div>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Price
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={limitPrice}
                                  onChange={handleMBuyLimitPrice}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "weight",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                    disabled: "disabled",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>

                              <FormControl
                                className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Amount
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={marketBuyQty}
                                  onChange={handleMarcketBuyQty}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        {pair}
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Amount",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                                <Box sx={{ display: "flex" }}>
                                  <Sliders
                                    value={valuepraMar}
                                    min={1}
                                    step={1}
                                    max={99}
                                    scale={calculateValueForPraMar}
                                    getAriaValueText={valueLabelFormatForPraMar}
                                    valueLabelFormat={valueLabelFormatForPraMar}
                                    onChange={handleChangeForPraMar}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                  />
                                </Box>
                              </FormControl>

                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
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
                                    {rwA !== undefined ? (
                                      rwA >= 0 ? (
                                        rwA
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          Insufficient Balance
                                        </span>
                                      )
                                    ) : (
                                      tWB
                                    )}
                                  </FormHelperText>
                                </Box>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={marcketBuyTotal}
                                  onChange={handileMarcketBuyTotal}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Total",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>

                              {issubmit ?
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  <PulseBubbleLoader />
                                </Button>
                                :
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  onClick={buyMarcketHandler}
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  Buy {pair}
                                </Button>
                              }

                            </div>
                          </Box>
                        </Paper> */}
                    {/* Market Buy Sell End Code  */}
                    {/* Market Side Sell Start Code  */}
                    {/* <Paper className="secondiv2">
                          <Box>
                            <div>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Price
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={sLimitPrice}
                                  onChange={handleMLimitPrice}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "weight",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                    disabled: "disabled",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>

                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Amount
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={marketSellQty}
                                  onChange={HandileSaleMarketQty}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        {pair}
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Amount",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                                <Box sx={{ display: "flex" }}>
                                  <Sliders
                                    value={valueprasailMar}
                                    min={1}
                                    step={1}
                                    max={99}
                                    scale={calculateValueForPraSailMar}
                                    getAriaValueText={
                                      valueLabelFormatForPraSailMar
                                    }
                                    valueLabelFormat={
                                      valueLabelFormatForPraSailMar
                                    }
                                    onChange={handleChangeForPraSailMar}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="non-linear-slider"
                                  />
                                </Box>
                              </FormControl>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
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
                                    {rswA !== undefined ? (
                                      rswA >= 0 ? (
                                        rswA
                                      ) : (
                                        <span style={{ color: "red" }}>
                                          Insufficient Balance
                                        </span>
                                      )
                                    ) : (
                                      toSb
                                    )}
                                  </FormHelperText>
                                </Box>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={marcketSellTotal}
                                  onChange={HandileSaleMarketTotal}
                                  // hiddenLabel={true}
                                  endAdornment={
                                    <InputAdornment position="end">
                                      <span className="spandf"
                                        style={{
                                          fontSize: "0.500rem",
                                          padding: "10px",
                                        }}
                                      >
                                        USDT
                                      </span>
                                    </InputAdornment>
                                  }
                                  aria-describedby="outlined-weight-helper-text"
                                  inputProps={{
                                    "aria-label": "Total",
                                    type: "number",
                                    pattern: "[0-9]*",
                                    inputmode: "numeric",
                                  }}
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              {issubmit ?
                                <Button className="butnbyfufi kf1"
                                  variant="contained"
                                  color="error"
                                  sx={{ m: 1, width: "100%" }}
                                  disableElevation
                                >
                                  <PulseBubbleLoader />
                                </Button>
                                :
                                <Button className="butnbyfufi kf1"
                                  variant="contained"
                                  color="error"
                                  onClick={saleMarcketHandler}
                                  sx={{ m: 1, width: "100%" }}
                                  disableElevation
                                >
                                  Sell {pair}
                                </Button>
                              }

                            </div>
                          </Box> */}
                    {/* </Paper> */}
                    {/* Market Side Sell End Code  */}
                    {/* </Box>
                    </TabPanel> */}

                    {/* Marcket  Side Buy Or Sell Code End  */}
                  </TabContext>
                  <p className="disclaimer"><strong>Disclaimer: </strong> We are complying with the latest norms formed by the government so we will deduct 1% TDS on every sell transaction.</p>
                </Box>
              </Paper>
            </div>
          </Modal>

          <Root className="boxified">
            <Box
              style={{
                display: "flex",
                flexFlow: "row",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                zIndex: "99999999",
              }}
            >
              <Button
                id="butn"
                style={{ flex: "0 0 45%" }}
                onClick={handleOpened}
              >
                <ul>
                  <li>Buy</li>
                  <li>Sell</li>
                </ul>
              </Button>

              {/* <Button className='butnbuy x2' style={{ flex: '0 0 45%' }} onClick={handleOpened}>Sell</Button> */}
            </Box>
          </Root>

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
      </Box>
    </>
  );
}

TradChart.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};
const mapStateToProps = (state) => {
  return {
    token: state.token,
    rftokn: state.rfTOken,
    id: state.id,
    userId: state.user_id,
    ip: state.ip,
    did: state.deviceId,
    email: state.email,
  };
};

export default connect(mapStateToProps)(memo(TradChart));
