import React from 'react';
import axios from "axios";
import { Grid } from "@mui/material";
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Trading from "../../components/Trading/Trading";
import Loader from "../../components/Loader/Loader";
import { w3cwebsocket as W3CWebSocket } from "websocket";
import './Trading.css';
const client = new W3CWebSocket('wss://fstream.binance.com/ws/!ticker@arr');
function TradingList() {
  const [trlist, setTrlist] = React.useState([]);
  const [newTrlist, setNewTrlist] = React.useState([""]);
  const [items, setItems] = React.useState([]);
  client.onmessage = (message) => {
    const json = JSON.parse(message.data);
    if (items.length === 0) {
      json.forEach((e, i) => {
        const result = items.find((el) => {
          if (el === e.s) return true;
        });

        if (result === undefined) {
          items.push(e.s);
        }


      });
    }



    // setNewTrlist(json);


  };


  // React.useEffect(() => {

  //     const ws = new WebSocket("wss://fstream.binance.com/ws/");

  //     ws.onopen = (event) => {
  //         ws.send(JSON.stringify(apiCall));
  //       };

  //       ws.onmessage = function (event) {
  //         const json = JSON.parse(event.data);
  //         setTrlist(json);
  //       };
  // },[])



  React.useEffect(() => {
    let seti = setInterval(() => {
      axios.get(`https://fapi.binance.com/fapi/v1/ticker/24hr`)
        .then(res => {
          let arr = res.data;
          setTrlist(arr);
        })
        .catch(err => {
          console.log(err);
          return err;

        }
        );
    }, 5000);

  }, []);
  if (trlist.length < 1) {
    return <Loader />;
  }
  return (
    <div>
      <Grid container className="trls_icns">
        <h2 className="trls_title">Futures Market</h2>
      </Grid>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead style={{ backgroundColor: '#d6d6d6' }}>
            <TableRow>
              <TableCell >Name</TableCell>
              <TableCell >Price</TableCell>
              <TableCell >24h Change (%)</TableCell>
              <TableCell>24h High/Low</TableCell>
              <TableCell>24h Volume</TableCell>
            </TableRow>
          </TableHead>
          {items.map((e, i) => (
            <Trading key={i} data={e} />
          ))}

          <TableFooter>
            {/* <TableRow>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                            colSpan={3}
                            count={props.data.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            SelectProps={{
                                inputProps: {
                                    'aria-label': 'rows per page',
                                },
                                native: true,
                            }}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            ActionsComponent={TablePaginationActions}
                        />
                    </TableRow> */}
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TradingList;
