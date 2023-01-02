import { React, useState, useEffect , memo } from "react";
import DollarSvg from "../../assets/images/totalBalance.svg";
import { DataGrid } from "@material-ui/data-grid";
import SwapHorizontalCircleIcon from "@material-ui/icons/SwapHorizontalCircle";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import { Switch } from "pretty-checkbox-react";
import { IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ButtonGroup from "@mui/material/ButtonGroup";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import { URL } from "../../helpers/global";
import axios from "axios";
import Swal from "sweetalert2";
import { connect } from "react-redux";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Skeleton from "@mui/material/Skeleton";
import "@djthoms/pretty-checkbox";
import "./SCSS/Orders.css";

const Orders = (props) => {
  const [value, setValue] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [historydata, setHistorydata] = useState([]);
  const [openOrder, setOpenOrder] = useState([]);
  const [quickbuyHistory,setQuickbuyHistory]= useState([]); 
  const getQuickByuHistoryData = async () => {
    try {
      let data = {
        user_id: props.userId,
      };
      let config = {
        method: "POST",
        url: `${URL}/getUsersPaymentList`,
        // url: 'http://localhost:3000/api/getUsersPaymentList',
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token' : `${props.token}`
        },
        data: data,
      };
      await axios(config).then(function (response) {
          let res = response.data.data;
          if (res && res.length > 0) {
            res.forEach((e, i) => {
              let t = new Date(e.created_at);
              res[i].date = t.toLocaleTimeString();
              // res[i].amount = e.action === "1" ? e.toquantity : e.fromquantity;
              res[i].tocurrency = e.tocurrency;
              res[i].price = e.lastPrice;
              res[i].status = e.status !==1 ?e.status !==2?e.status===3?"Rejected":"Under review" : "Settled":"Approved";
              res[i].action = parseFloat(e.action);
            });
            setQuickbuyHistory(res);
            setIsLoading(false);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setIsLoading(false);
    }
  };

  const getUserHistoryData = async () => {
    try {
      let data = {
        userId: props.userId,
      };
      let config = {
        method: "POST",
        url: `${URL}/getAllUserOrderHistory`,
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token' : `${props.token}`
        },
        data: data,
      };
      await axios(config)
        .then(function (response) {
          let res = response.data.data;
          if (res && res.length > 0) {
            res.forEach((e, i) => {
              let t = new Date(e.created_at);
              res[i].date = t.toLocaleTimeString();
              res[i].qty = e.action === "1" ? e.toquantity : e.fromquantity;
              res[i].pair = e.action === "1" ? e.tocoin : e.fromCoin;
              res[i].price = e.lastPrice;
              res[i].side = e.action === "1" ? "Buy" : "Sell";
              res[i].status = e.status === 3 ? "Completed" : "Canceled";
              res[i].action = parseFloat(e.action);
            });
            setHistorydata(res);
            setIsLoading(false);
          }
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setIsLoading(false);
    }
  };
  const getUsersOpenOrder = async () => {
    try {
      let data = {
        userId: props.userId,
      };
      let config = {
        method: "POST",
        url: `${URL}/getUsersAllOrder`,
        headers: { 
          'Content-Type': 'application/json',
          'x-access-token' : `${props.token}`
        },
        data: data,
      };
      await axios(config)
        .then(function (response) {
          let res = response.data.data;
          if (res && res.length > 0) {
            res.forEach((e, i) => {
              let t = new Date(e.created_at);
              res[i].date = t.toLocaleTimeString();
              res[i].qty = e.action === 1 ? e.toquantity : e.fromquantity;
              res[i].pair = e.action === 1 ? e.tocoin : e.fromcoin;
              res[i].price = e.lastPrice;
              res[i].side = e.action === 1 ? "Buy" : "Sell";
              res[i].status = e.status === 1 ? "Pending" : "Canceled";
            });
          }
          setOpenOrder(res);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      setIsLoading(false);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 2) {
      getUserHistoryData();
    } else {
      getUsersOpenOrder();
    }
  };

  const handleOpen = (e,newValue) => {
    setValue(newValue);
    if(newValue===2){
      document.querySelector('.bidex1').style.backgroundColor = '#198127';
      document.querySelector('.bidex').style.backgroundColor  = '#a93737';
      document.querySelector('.bidex2').style.backgroundColor  ='#a93737';
      getUserHistoryData();
    } else if(newValue===1){
      document.querySelector('.bidex1').style.backgroundColor  = '#a93737';
      document.querySelector('.bidex').style.backgroundColor  ='#198127';
      document.querySelector('.bidex2').style.backgroundColor  ='#a93737';
      getUsersOpenOrder();
    }else if(newValue===3){
      document.querySelector('.bidex1').style.backgroundColor  = '#a93737';
      document.querySelector('.bidex').style.backgroundColor  = '#a93737';
      document.querySelector('.bidex2').style.backgroundColor  ='#198127';
      getQuickByuHistoryData();
    }
  };

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
            url: `${URL}CancelOrder`,
            headers: { 
              'Content-Type': 'application/json',
              'x-access-token' : `${props.token}`
            },
            data: data,
          };
          await axios(config)
            .then(function (response) {
              console.log("Helek", response.data.message);
              if (response.data.status) {
                Swal.fire("Canceled!",response.data.message,"success").then(
                  async (result) => {
                    if (result.isConfirmed){
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
            }).catch((err) =>console.log(err));
        } catch (error) {
          setIsLoading(false);
        }
      }
    });
  };
  const columns = [
    { field: "pair", headerName: "Pair", minWidth: 150, flex: 0.3 },
    {
      field: "price",
      flex: 0.3,
      headerName: "Price",
      minWidth: 150,
      sortable: false,
    
    },
    {
      field: "qty",
      headerName: "Quantity",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "side",
      headerName: "Side",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      type: "String",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "action",
      headerName: "Action",
      type: "String",
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
            {params.row.status !== "Canceled" ? (
              <span
                style={{ cursor: "pointer" }}
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
            )}
          </Box>
        );
      },
    },
  ];
  const columns2 = [
    { field: "pair", headerName: "Pair", minWidth: 120, flex: 0.3 },
    {
      field: "price",
      flex: 0.3,
      headerName: "Price",
      minWidth: 150,
      // type: "number",
      sortable: false,
      // renderCell: (params) => {
      //     return (
      //         <>

      //         </>
      //     );
      // },
    },
    {
      field: "qty",
      headerName: "Quantity",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "side",
      headerName: "Side",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      type: "String",
      minWidth: 150,
      flex: 0.3,
    },

    // {
    //     field: "action",
    //     headerName: "Action",
    //     type: "String",
    //     minWidth: 120,
    //     flex: 0.3,
    //     renderCell: (params) => {
    //         console.log("djjd", params.row);
    //         return (
    //           <Box sx={{
    //             display: 'flex', flexDirection: "row", alignItems: 'center',
    //             width: "100%"
    //           }}>
    //               <span style={{ cursor: "pointer" }} onClick={(e) => {cancialOrderHandler(e, params.row.coin, params.row.network); }} >
    //                 <CancelRoundedIcon style={{ fontSize: "small", color: "slategrey" }} />
    //                 Cancel</span>

    //           </Box>
    //         );
    //       },
    // },
  ];
  const columns3 = [
    { field: "tocurrency", headerName: "Coin", minWidth: 120, flex: 0.3 },
    {
      field: "last_prize",
      flex: 0.3,
      headerName: "Price",
      minWidth: 150,
      // type: "number",
      sortable: false,
      // renderCell: (params) => {
      //     return (
      //         <>

      //         </>
      //     );
      // },
    },
    {
      field: "toamount",
      headerName: "Quantity",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "fufi_address",
      headerName: "Address",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "amount",
      headerName: "INR Amount",
      type: "string",
      minWidth: 150,
      flex: 0.3,
    },

    {
      field: "date",
      headerName: "Date",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "status",
      headerName: "Status",
      type: "String",
      minWidth: 150,
      flex: 0.3,
    },

    // {
    //     field: "action",
    //     headerName: "Action",
    //     type: "String",
    //     minWidth: 120,
    //     flex: 0.3,
    //     renderCell: (params) => {
    //         console.log("djjd", params.row);
    //         return (
    //           <Box sx={{
    //             display: 'flex', flexDirection: "row", alignItems: 'center',
    //             width: "100%"
    //           }}>
    //               <span style={{ cursor: "pointer" }} onClick={(e) => {cancialOrderHandler(e, params.row.coin, params.row.network); }} >
    //                 <CancelRoundedIcon style={{ fontSize: "small", color: "slategrey" }} />
    //                 Cancel</span>

    //           </Box>
    //         );
    //       },
    // },
  ];
  useEffect(() => {
    if (value === 2) {
      getUserHistoryData();
    } else if(value===1){
      getUsersOpenOrder();
    }else if(value===3){
      getQuickByuHistoryData(); 
    }
  }, []);

  return (
    <div className="orders">
  

      <div className="balanceSheet">
      <div className="orders_headers">
        <h1 className="balance">Orders</h1>

        <div className="coinAddressDiv">
          <div className="coinAddress">
            <FormControl className="searchBr" sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="outlined-adornment-password">
                Search
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={"text"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton className="orButon"
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            "& > *": {
              m: 1,
            },
          }}
        >
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button className="bidex" style={{backgroundColor:'#198127'}} onClick={(e) => handleOpen(e, 1)}>Open</Button>
            <Button className="bidex1" style={{backgroundColor:'#a93737'}} onClick={(e) => handleOpen(e, 2)}>History </Button>
            <Button className="bidex2" style={{backgroundColor:'#a93737'}} onClick={(e) => handleOpen(e, 3)}>QuickBuy History </Button>
          </ButtonGroup>
        </Box>
      </div>

        <div className="balanceSheet_div">
          {isLoading ? (
            <Box sx={{ height: 500 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          ) : (
            <DataGrid
              rows={value !==1?value===2?historydata :quickbuyHistory: openOrder}
              columns={value !== 1?value===2?columns2: columns3:columns}
              pageSize={6}
              disableSelectionOnClick
              className="productListTable"
              getRowClassName={(params) =>
                params.row.action === 1
                  ? `productListTableBuy`
                  : `productListTableSell`
              }
              autoHeight
            />
          )}
        </div>
      </div>
    </div>
  );
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
export default connect(mapStateToProps)(memo(Orders));
