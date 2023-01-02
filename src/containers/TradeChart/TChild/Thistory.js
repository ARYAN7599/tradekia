import React, {memo} from "react";
import Paper from "@material-ui/core/Paper";
import TableScrollbar from "react-table-scrollbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
import TableHead from "@mui/material/TableHead";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import { URL } from "../../..//helpers/global";
import Box from "@mui/material/Box";
import TableRow from "@mui/material/TableRow";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OutlinedInput from "@mui/material/OutlinedInput";
import ButtonGroup from "@mui/material/ButtonGroup";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { connect } from "react-redux";
import "@djthoms/pretty-checkbox";
import "../TradChart.css";
import { toast } from "react-toastify";
import Stack from '@mui/material/Stack';
import { Oval } from "react-loader-spinner";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import InfiniteScroll from "react-infinite-scroll-component";
import { data, event } from "jquery";
import { ReorderRounded } from "@mui/icons-material";
const Thistory = (props) => {
  const [page, setPage] = React.useState(1);
  const [hasMore, setHasMore] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState("1");
  const [historydata, setHistorydata] = React.useState([]);
  const [client, setClient] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);
  const [pair, setPair] = React.useState(props.pairdata);
  const [openOrder, setOpenOrder] = React.useState([]);

  const fetchMorhistoryeData = () => {
    let arr = [];
    console.log("KKKKKKKK", page, "KKKKKKKKKKKKKKK", historydata.length);
    if (historydata.length >= 150000) {
      setHasMore(false);
      return;
    }

    setTimeout(async () => {
      let data = {
        symble: pair,
        "page_no": page
      };
      let config = {
        method: "POST",
        url: `${URL}/getCoinOrderHistory`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': `${props.token}`
        },
        data: data,
      };

      await axios(config).then(async (response) => {

        let res = response.data.data;
        res.forEach((e, i) => {
          let t = new Date(e.created_at);
          res[i].time = t.toDateString() + " " + t.toLocaleTimeString();
          res[i].qty = e.action === "1" ? e.toquantity : e.fromquantity;
          res[i].price = e.lastPrice;
        });
        //     if (!result.data.error) {
        //     const res = result.data;
        //     let recArr = res.data.posts;
        //     //console.log(recArr);
        //     for (let i = 0; i < recArr.length; i++) {
        //         arr.push(recArr[i]);
        //     }
        // }
        await setHistorydata(historydata.concat(res));
        setPage(prevPage => prevPage + 1);

      }).catch(err => console.log(err));

    }, 500);


    arr = [];
  };


  const getHitoryData = async () => {
    setIsLoading(true);
    try {
      let data = {
        symble: pair,
        "page_no": 0
      };
      let config = {
        method: "POST",
        url: `${URL}/getCoinOrderHistory`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': `${props.token}`
        },
        data: data,
      };
      await axios(config).then(function (response) {
        let res = response.data.data;
        res.forEach((e, i) => {

          let t = new Date(e.created_at);
          res[i].time = t.toDateString() + " " + t.toLocaleTimeString();
          res[i].qty = e.action === "1" ? e.toquantity : e.fromquantity;
          res[i].price = e.lastPrice;
        });
        setHistorydata(res);
        setIsLoading(false);
      })
        .catch((err) => console.log(err));
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };
  const getUsersOpenOrder = async () => {
    setIsLoading(true);
    try {
      let data = {
        userId: props.userId,
      };
      let config = {
        method: "POST",
        url: `${URL}/getUsersPanddingOrder`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': `${props.token}`
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
  const getUserHistoryData = async () => {
    setIsLoading(true);
    try {
      let data = {
        symble: pair,
        userId: props.userId,
      };
      let config = {
        method: "POST",
        url: `${URL}getUserOrderHistory`,
        headers: {
          "Content-Type": "application/json",
          'x-access-token': `${props.token}`
        },
        data: data,
      };
      await axios(config)
        .then(function (response) {
          let res = response.data.data;
          res.forEach((e, i) => {
            let t = new Date(e.created_at);
            res[i].time = t.toLocaleTimeString();
            res[i].qty = e.action === "1" ? e.toquantity : e.fromquantity;
            res[i].price = e.lastPrice;
          });
          setHistorydata(res);
          setIsLoading(false);
        }).catch((err) => console.log(err));
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setIsLoading(false);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === "2") {
      getUserHistoryData();
    } else if (newValue === "3") {
      getUsersOpenOrder();
    } else {
      getHitoryData();
    }
  };
  // let iscom = props.isloading;
  // if(iscom){
  //   // setPair(props.pairdata);
  //   getHitoryData();
  //   iscom=false; 
  // }
  // React.useEffect(()=>{
  //   console.log("dsdnjsdnd"); 
  //   getHitoryData();
  //   iscom=false; 
  //   return; 
  // },[iscom])

  React.useEffect(() => {
    setPair(props.pairdata);
    getHitoryData();
  }, []);
  React.useEffect(() => {
    setIsLoading(true);
    setPair(props.pairdata);
    getHitoryData();
  }, [props.pairdata]);

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
              "Content-Type": "application/json",
              'x-access-token': `${props.token}`
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
          setIsLoading(false);
        }
      }
    });
  };

  const columns = [
    {
      id: "price",
      label: "Price",
      minWidth: 20,
      align: "center",
      cellStyle: (rowData) => {
        return rowData.isBuyerMaker === true
          ? { color: "#d9442e" }
          : { color: "#76b840" };
      },

      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: "qty",
      label: "Amount",
      minWidth: 20,
      align: "left",
      cellStyle: (rowData) => {
        return rowData.isBuyerMaker
          ? { color: "#121212" }
          : { color: "#121212" };
      },
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "time",
      label: "Time",
      minWidth: 250,
      align: "left",
      cellStyle: (rowData) => {
        return rowData.isBuyerMaker
          ? { color: "#121212" }
          : { color: "#121212" };
      },
      format: (value) => value.toFixed(2),
    },
  ];

  const columnsopen = [
    {
      id: "price",
      label: "Price",
      minWidth: 20,
      align: "right",
      cellStyle: (rowData) => {
        return rowData.isBuyerMaker === true
          ? { color: "#d9442e" }
          : { color: "#76b840" };
      },

      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: "qty",
      label: "Amount",
      minWidth: 60,
      align: "right",
      cellStyle: (rowData) => {
        return rowData.isBuyerMaker
          ? { color: "#121212" }
          : { color: "#121212" };
      },
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 80,
      align: "right",
      renderCell: (params) => {
        console.log("djjd255555555550000", params.row.status);
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
    }
  ];

  // const columnsopen = [
  //   {
  //     id: "price",
  //     label: "Price",
  //     minWidth:30,
  //     align: "right",
  //     cellStyle: (rowData) => {
  //       return rowData.isBuyerMaker === true
  //         ? { color: "#d9442e" }
  //         : { color: "#76b840" };
  //     },

  //     // format: (value) => value.toLocaleString('en-US'),
  //   },
  //   {
  //     id: "qty",
  //     label: "Amount",
  //     minWidth: 60,
  //     align: "right",
  //     cellStyle: (rowData) => {
  //       return rowData.isBuyerMaker
  //         ? { color: "#121212" }
  //         : { color: "#121212" };
  //     },
  //     format: (value) => value.toLocaleString("en-US"),
  //   },
  //   {
  //     id: "action",
  //     label: "Action",
  //     minWidth: 80,
  //     align: "right",
  //     renderCell: (params) => {
  //       console.log("djjd255555555550000", params.row.status);
  //       return (
  //         <Box
  //           sx={{
  //             display: "flex",
  //             flexDirection: "row",
  //             alignItems: "center",
  //             width: "100%",
  //           }}
  //         >
  //           {params.row.status !== "Canceled" ? (
  //             <span
  //               style={{ cursor: "pointer" }}
  //               onClick={(e) => {
  //                 cancialOrderHandler(e, params.row.id);
  //               }}
  //             >
  //               <CancelRoundedIcon
  //                 style={{ fontSize: "small", color: "slategrey" }}
  //               />
  //               Cancel
  //             </span>
  //           ) : (
  //             ""
  //           )}
  //         </Box>
  //       );
  //     },
  //   }
  // ];
  function createData(price, amount) {
    const total = price + amount;
    return { price, amount, total };
  }
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Box>
        <TabContext sx={{ bottom: "10px" }} value={value}>
          <Box
            sx={{
              borderBottom: 1,
              height: "35px",
              borderColor: "divider",
              bottom: "10px",
            }}
          >
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab className="tbmarts" label="Market" value="1" />
              <Tab className="tbmarts" label="Yours" value="2" />
              <Tab className="tbmarts" label="Open Orders" value="3" />
            </TabList>
          </Box>
          <TabPanel id="tabOutline" value="1">
            <Box sx={{ display: "flex", width: "100%" }}>
              <TableContainer style={{ height: 390 }}>
                <TableScrollbar rows={10}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableCell
                            id="tablecell"
                            key={index + 1}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                      {isLoading ? (
                        <TableRow
                        >
                          <TableCell> 
                            <Box sx={{ height: 500, width: '100%' }}>
                              <Skeleton />
                              <Skeleton animation="wave" />
                              <Skeleton animation={false} />
                            </Box>
                          </TableCell>
                          <TableCell>
                             <Box sx={{ height: 500, width: '100%' }}>
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
                          {/* <TableCell
                            id="tablecell"
                            align={"center"}
                          ></TableCell>
                          <TableCell id="tablecell" align={"center"}>
                            <Oval color="#00BFFF" height={40} width={40} />
                          </TableCell> */}
                        </TableRow>
                      ) : (
                        historydata
                          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, i) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={i}
                              >
                                {columns.map((column, index) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      id="tablecell12h"
                                      // key={column.id}
                                      key={index}
                                      align={column.align}
                                      // style={column.cellStyle(value)}
                                      style={{
                                        color:
                                          row.action === "1"
                                            ? "#76b840"
                                            : "#d9442e",
                                      }}
                                    >
                                      {column.format &&
                                        typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })

                      )}
                    </TableBody>
















                  </Table>
                </TableScrollbar>
              </TableContainer>
            </Box>
          </TabPanel>
          <TabPanel id="tabOutline" value="2">
            <Box sx={{ display: "flex", width: "100%" }}>
              <TableContainer style={{ height: 336 }}>
                <TableScrollbar rows={10}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columns.map((column, index) => (
                          <TableCell
                            id="tablecell"
                            // key={column.id}
                            key={index}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
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
                        // <TableRow hover role="checkbox" tabIndex={-1}>
                        //   <TableCell
                        //     id="tablecell"
                        //     align={"center"}
                        //   ></TableCell>
                        //   <TableCell id="tablecell" align={"center"}>
                        //     <Oval color="#00BFFF" height={40} width={40} />
                        //   </TableCell>
                        // </TableRow>
                      ) : (
                        historydata
                          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, i) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                // key={row.code}
                                key={i}
                              >
                                {columns.map((column, index) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      id="tablecell"
                                      // key={column.id}
                                      key={index}
                                      align={column.align}
                                      style={{
                                        color:
                                          row.action === "1"
                                            ? "#76b840"
                                            : "#d9442e",
                                      }}
                                    >
                                      {column.format &&
                                        typeof value === "number"
                                        ? column.format(value)
                                        : value}
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })
                      )}
                    </TableBody>
                  </Table>
                </TableScrollbar>
              </TableContainer>
            </Box>
          </TabPanel>

          <TabPanel id="tabOutline" value="3">
            <Box sx={{ display: "flex", width: "100%" }}>
              <TableContainer style={{ height: 336 }}>
                <TableScrollbar rows={10}>
                  <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                      <TableRow>
                        {columnsopen.map((column, index) => (
                          <TableCell
                            id="tablecell"
                            // key={column.id}
                            key={index}
                            align={column.align}
                            style={{ minWidth: column.minWidth }}
                          >
                            {column.label}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {isLoading ? (
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
                        // <TableRow hover role="checkbox" tabIndex={-1}>
                        //   <TableCell
                        //     id="tablecell"
                        //     align={"center"}
                        //   ></TableCell>
                        //   <TableCell id="tablecell" align={"center"}>
                        //     <Oval color="#00BFFF" height={40} width={40} />
                        //   </TableCell>
                        // </TableRow>
                      ) : (
                        openOrder
                          // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                          .map((row, i) => {
                            return (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                // key={row.code}
                                key={isLoading}
                              >
                                {columnsopen.map((column, i) => {
                                  const value = row[column.id];
                                  return (
                                    <TableCell
                                      id="tablecell"
                                      // key={column.id}
                                      key={i}
                                      align={column.align}
                                      style={{
                                        color:
                                          row.action === 1
                                            ? "#76b840"
                                            : "#d9442e",
                                      }}
                                    >

                                      {column.id === "action" && value !== "Canceled" ? (
                                        <Box
                                          sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            alignItems: "center",
                                            width: "100%",
                                          }}
                                        >
                                          <span
                                            style={{ cursor: "pointer" }}
                                            onClick={(e) => {
                                              cancialOrderHandler(e, row.id);
                                            }}
                                          >
                                            <CancelRoundedIcon
                                              style={{ fontSize: "small", color: "slategrey" }}
                                            />
                                            Cancel
                                          </span>
                                        </Box>
                                      ) : (
                                        ""
                                      )}
                                      {column.format &&
                                        typeof value === "number"
                                        ? (column.id != 'action') ? column.format(value) : ''
                                        : (column.id != 'action') ? value : ''
                                      }
                                    </TableCell>
                                  );
                                })}
                              </TableRow>
                            );
                          })
                      )}
                    </TableBody>
                  </Table>
                </TableScrollbar>
              </TableContainer>
            </Box>
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
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
export default connect(mapStateToProps)(memo(Thistory));
