import React from 'react'
import { useNavigate } from "react-router-dom";
import { DataGrid } from "@material-ui/data-grid";
import { connect } from "react-redux";
import { URL } from "../../helpers/global";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import OutlinedInput from "@mui/material/OutlinedInput";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import Button from "@mui/material/Button";
import axios from "axios";
import Box from "@mui/material/Box";
import walletIcone from "../../assets/images/icons8-euro-account-64.png";
import './Setorders.css'


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


const Setorder = (props) => {
  const [fromcoin, setFromcoin] = React.useState();
  const [p2porder, setP2porder] = React.useState([]);
  const [ischecked, setIschecked] = React.useState(false);
  const [rowData, setRowData] = React.useState([]);
  const [symble, setSymble] = React.useState();
  const [sellCoin, setSellCoin] = React.useState();
  const [rcoin, setRcoin] = React.useState();
  const [coinAmount, setCoinAmount] = React.useState();
  const [scoinPrizeUsdt, setScoinPrizeUsdt] = React.useState();
  const navigate = useNavigate();
  const [sidOpen, setSidOpen] = React.useState(false);


  const getUserInfo = async () => {
    try {
      var data = {
        user_id: props.userId,
      };
      let config = {
        method: "POST",
        url: `${URL}/getUserP2pOrder`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token' : `${props.token}`
        },
        data: data
      };
      await axios(config).then(async function (res) {
        console.log("hfhjhf", res.data.data)
        if (res?.data?.data?.length > 0) {
          let rdata = res?.data?.data;
          setP2porder(rdata);
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
        // setTrxprize(res?.data?.data?.cInrprize);
        setScoinPrizeUsdt(res?.data?.data?.cUsdtPrize);
      }
    }).catch((error) => {
      console.log("error", error);
    });
  };

  const getWalletAmount = async (coi) => {
    // setSellCoin(coi);
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
    await axios(config).then(async function (res) {
        if (res.data.data && res.data.data.length > 0) {
          const result = res.data.data.find((ele) => ele.coin === "FUFI");
          console.log("result", result);
          setCoinAmount(result?.amount);
          // setScoinPrizeUsdt(result?.UsdtPrize);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  React.useEffect(() => {
    getUserInfo();
  }, []);

  const handleSidClose = () => {
    setSidOpen(false);
  }

  const cancialOrderHandler = (e, orderId) => {
    Swal.fire({
      text: "Do you want to cancel this order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: "NO",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          let data = {
            orderId: orderId,
          };
          let config = {
            method: "POST",
            url: `${URL}cancelP2POrder`,
            headers: {
              "Content-Type": "application/json",
              'x-access-token' : `${props.token}`
            },
            data: data,
          };
          await axios(config)
            .then(function (response) {
              console.log("Helek", response.data.message);
              if (response.data.status) {
                Swal.fire("Canceled!", response.data.message, "success").then(
                  async (result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  }
                );
              } else {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: response.data.message,
                }).then(async (result) => {
                  window.location.reload();
                });
              }
            })
            .catch((err) => console.log(err));
        } catch (error) {
          console.log("err",error); 
          // setIsLoading(false);
        }
      }
    });
  };

  const reqTOp2p = async () => {
    let data = {
      userId: props.userId,
      amount: sellCoin,
      coin: "FUFI",
      lastPrice: scoinPrizeUsdt,
      network: "FEP20",
      action: 2,
    }

    console.log("lll", scoinPrizeUsdt, 'data', data);
    let config = {
      method: "post",
      url: `${URL}ptoPSelOrbuy`,
      headers: {
        "Content-Type": "application/json",
        'x-access-token' : `${props.token}`
      },
      data: data,
    };
    await axios(config).then(async function (res) {
      console.log("Hello frineds ", res.data.status);
      if (res.data.status) {
        Swal.fire({
          icon: "success",
          title: res.data.message,
          showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setSidOpen(false);
            window.location.reload();
            // navigate("/wallet");
          }
        });
      }else{
        Swal.fire({
          icon: "error",
          title: res.data.message,
          // showCancelButton: true,
          confirmButtonText: "Ok",
        }).then((result) => {
          if (result.isConfirmed) {
            setSidOpen(false);
            window.location.reload();
            // navigate("/wallet");
          }
        });
      }
    }).catch((error) => {
      console.log("error", error);
    });
  };
 
  const columns = [
    {
      field: "id",
      headerName: "ID",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "coin",
      headerName: "Coins",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "network",
      headerName: "Network",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
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
      field: "amount",
      headerName: "Amount",
      minWidth: 150,
      // type: "number",
      flex: 0.3,
      alignItems: "center",
    },
    {
      field: "toamount",
      headerName: "UsdtValue",
      minWidth: 150,
      flex: 0.3,
      alignItems: "center",
    },
    {
      field: "status",
      headerName: "Status",
      type: "number",
      minWidth: 80,
      // flex: 0.5,
      renderCell: (params) => {
        return (
            (params.row.status === 1) ? (
              <span
                className="quickb"
                style={{ fontSize: "small", color: "red" }}
              >
                Panding
              </span>
            ) : (
              <span
                className="quickbqw"
                style={{ fontSize: "small", color: "red" }}
              >
              Canceled
              </span>

            )
          
        )
      }

    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 80,
      // flex: 0.5,
      renderCell: (params) => {
        return (
          params.row.status !== 0 ? (
            <span
              style={{ color:"red", cursor: "pointer" }}
              onClick={(e) => {
                cancialOrderHandler(e, params.row.id);
              }}
            >
              <CancelRoundedIcon
                style={{ fontSize: "small", color: "slategrey" }}
              />
              Cancel
            </span>
          ) : (
            ""
          )
          
        )
      }
    },
    
  ];
  // const columnsdata = [
  //   {
  //     id: 1,
  //     coin: 'Fufi',
  //     cprize: 0.02,
  //     change24h: "-0",
  //     hInrprize: 0.02,
  //     lInrprize: 1.62,
  //     valume24h: 78273.28864100942
  //   },
  //   {
  //     id: 2,
  //     coin: 'Fufi',
  //     cprize: 0.02,
  //     change24h: "-0",
  //     hInrprize: 0.02,
  //     lInrprize: 1.62,
  //     valume24h: 78273.28864100942
  //   },
  //   {
  //     id: 3,
  //     coin: 'Fufi',
  //     cprize: 0.02,
  //     change24h: "-0",
  //     hInrprize: 0.02,
  //     lInrprize: 1.62,
  //     valume24h: 78273.28864100942
  //   }
  // ]

  const handileCoinAmountChange = (event) => {
    let recoin = (parseFloat(coinAmount) - parseFloat(event.target.value));
    setRcoin(recoin);
    setSellCoin(event.target.value)
  }

  const handleSidOpen = () => {
    getallSymble('FUFI')
    getWalletAmount('FUFI');
    setSidOpen(true);
  }

  const handleSeClose = () => {
    setSidOpen(false);
  };

  return (
    <>
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
          {/* {fromcoin} */}
        </BootstrapDialogTitle>

        <DialogContent className="dlogtent" dividers>
          <Typography gutterBottom>
            <img src={walletIcone} style={{ height: "20px", width: "20px" }} />
            <span style={{ paddingLeft: "5px" }}>
              {" "}
              FUFI Amount :  {coinAmount}
            </span>
          </Typography>
          <Typography gutterBottom>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              <div>
                <FormControl fullWidth sx={{ m: 1 }}>
                  <InputLabel className="amoutlbl" htmlFor="outlined-adornment-amount">
                    Amount
                  </InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-amount"
                    type="number"
                    fullWidth="true"
                    value={sellCoin}
                    onChange={handileCoinAmountChange}
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
                    {rcoin !== undefined ? (
                      rcoin >= 0 ? (
                        rcoin
                      ) : (
                        <span style={{ color: "red" }}>
                          Insufficient Balance
                        </span>
                      )
                    ) : (
                      coinAmount
                    )}
                  </FormHelperText>
                </Box>



              </div>
            </Box>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button id="paybutton" className="paybton" onClick={reqTOp2p}>
            P2P
          </Button>
        </DialogActions>
      </BootstrapDialog>





      <div className="balanceSheet">
        <div
          className="quickbsret"
          onClick={(e) => {
            handleSidOpen();

          }}
        >
          P2P
        </div>
        <h1 className="balance" style={{ paddingLeft: "15px" }}>
          P2P Order...
        </h1>



        <div className="balanceSheet_div" id="popularoins">
          {(
            <DataGrid
              rows={p2porder}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              className="productListTable"
              autoHeight
              autoPageSize="true"
              // pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              experimentalFeatures={{ newEditingApi: true }}
            />
          )}
          {/* Start First Payment Model  */}
        </div>
      </div>
    </>
  )
}


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

export default connect(mapStateToProps)(Setorder);
