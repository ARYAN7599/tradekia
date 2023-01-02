import React,{memo} from "react";
import Paper from "@material-ui/core/Paper";
import TableScrollbar from "react-table-scrollbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { URL } from "../../../helpers/global";
import Loader from "../../../components/Loader/Loader";
import Box from "@mui/material/Box";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { Oval } from "react-loader-spinner";
import { toast } from "react-toastify";
import axios from "axios";
import "@djthoms/pretty-checkbox";
import "../TradChart.css";
import { Co2Sharp } from "@mui/icons-material";
const Torders = (props) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [value, setValue] = React.useState("1");
  const [newbit, setNewbit] = React.useState([]);
  const [newAitems, setNewAitems] = React.useState([]);
  const [aitems, setAItems] = React.useState([]);
  const [naitems, setNaitems] = React.useState([]);
  const [bitems, setBItems] = React.useState([]);
  const [nbitems, setNbItems] = React.useState([]);
  const [isrander, setIsrander] = React.useState();
  const [ws, setWebsocket] = React.useState(null);
  const [client, setClient] = React.useState({});
  const [pair, setPair] = React.useState(props.pairdata);
  const [isaLoading, setIsaLoading] = React.useState(true);
  const [isbLoading, setIsbLoading] = React.useState(true);
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, []);
  const getAskAndBit = async () => {
    let data = {
      symble: pair,
    };
    try {
      let config = {
        method: "POST",
        url: `${URL}/getCoinBuyOrSellOpenOrder`,
        data: data,
      };
      await axios(config)
        .then(function (response) {
          let res = response.data.data;
          const add = res.buy;
          const bit = res.sell;
          if (naitems?.length === 0) {
            add.forEach((e, i) => {
              const result = naitems.find((el) => {
                if (
                  parseFloat(el.price) === parseFloat(e.lastPrice) &&
                  parseFloat(el.amount) === parseFloat(e.toquantity)
                )
                  return true;
              });
              if (result === undefined) {
                let p = parseFloat(e.lastPrice);
                let amount = parseFloat(e.toquantity);
                let d = createData(p, amount);
                naitems.push(d);
              }
            });
          }
          if (nbitems?.length === 0) {
            bit.forEach((e, i) => {
              const result = nbitems.find((el) => {
                if (
                  el.price === parseFloat(e.lastPrice) &&
                  el.amount === parseFloat(e.fromquantity)
                )
                  return true;
              });
              if (result === undefined) {
                let p = parseFloat(e.lastPrice);
                let amount = parseFloat(e.fromquantity);
                let d = createData(p, amount);
                nbitems.push(d);
              }
            });
          }
          setIsbLoading(false);
          setIsaLoading(false);
          setNewbit(bit);
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
    }
  };
console.log("Helloh", props); 
  React.useEffect(() => {
    getAskAndBit();
  }, []);

  let iscom = props.isloading;
  // console.log("befor",iscom);
  // if(iscom){
  //   getAskAndBit();
  //   iscom=false; 
  // return true;
  // }
  
  // React.useEffect(()=>{
  //   console.log("befor",iscom);
  //   getAskAndBit();
  //   iscom=false; 
  //   return true;
  // },[iscom]);
  // console.log("after",iscom);


  

  React.useEffect(() => {
    setPair(props.pairdata);
    setIsaLoading(true);
    setIsbLoading(true);
  }, [props.pairdata]);

  // React.useEffect(() => {
  //   try {
  //     return updateData(), updatebitData();
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setIsrander(false);
  //   }
  // }, [newAitems, newbit]);

  const updateData = () => {
    return aitems.forEach((it, j) => {
      newAitems.forEach((row, i) => {
        if (parseInt(row[0]) === parseInt(it.price)) {
          let p = parseFloat(row[0]);
          let a = parseFloat(row[1]);
          aitems[j] = createData(p, a);
        }
      });
    });
  };
  const updatebitData = () => {
    return bitems.forEach((it, j) => {
      newbit.forEach((row, i) => {
        if (parseInt(row[0]) == parseInt(it.price)) {
          let p = parseFloat(row[0]);
          let a = parseFloat(row[1]);
          bitems[j] = createData(p, a);
        }
      });
    });
  };
  const columns = [
    {
      id: "price",
      label: "Price",
      minWidth: 30,
      align: "right",
      cellStyle: {
        color: "red",
      },
      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 30,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "total",
      label: "Total",
      minWidth: 30,
      align: "right",
      format: (value) => value.toFixed(4),
    },
  ];
  const columnsBit = [
    {
      id: "price",
      label: "Price",
      minWidth: 30,
      align: "right",
      cellStyle: {
        color: "#11cd83",
      },

      // format: (value) => value.toLocaleString('en-US'),
    },
    {
      id: "amount",
      label: "Amount",
      minWidth: 30,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "total",
      label: "Total",
      minWidth: 30,
      align: "right",
      format: (value) => value.toFixed(4),
    },
  ];
  function createData(price, amount) {
    const total = price * amount;
    return { price, amount, total };
  }

  return (
    <Box>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        {/* <TableContainer id="tableConr" sx={{ maxHeight: 510 }}> */}
         <h5 className="hedpanls">Orders Books</h5> 
        <TableContainer id="tableConr" style={{height: 400}}>
          
          <TableScrollbar id="tableScrr" rows={13}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead style={{ backgroundColor: "aqua" }}>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      id="tablecell"
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isaLoading ? (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell id="tablecell" align={"center"}></TableCell>
                    <TableCell id="tablecell" align={"center"}>
                      <Oval color="#00BFFF" height={40} width={40} />
                    </TableCell>
                  </TableRow>
                ) : (
                  nbitems
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                id="tablecell"
                                key={column.id}
                                align={column.align}
                                style={column.cellStyle}
                              >
                                {column.format && typeof value === "number"
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
      </Paper>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <h5 className="hedpanls" style={{textAlign:"center",color:"#ccc"}}>......</h5>
        <TableContainer id="tableConr"  style={{ height: 400 }}>
          <TableScrollbar id="tableScrr" rows={13}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columnsBit.map((column) => (
                    <TableCell
                      id="tablecell"
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {isbLoading ? (
                  <TableRow hover role="checkbox" tabIndex={-1}>
                    <TableCell id="tablecell" align={"center"}></TableCell>
                    <TableCell id="tablecell" align={"center"}>
                      <Oval color="#00BFFF" height={40} width={40} />
                    </TableCell>
                  </TableRow>
                ) : (
                  naitems
                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, i) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          {columnsBit.map((column) => {
                            const value = row[column.id];
                            return (
                              <TableCell
                                id="tablecell"
                                key={column.id}
                                align={column.align}
                                style={column.cellStyle}
                              >
                                {column.format && typeof value === "number"
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
      </Paper>
    </Box>
  );
};

export default memo(Torders);
