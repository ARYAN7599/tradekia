import { React, useState, useEffect } from 'react';
import DollarSvg from "../../assets/images/totalBalance.svg";
import { DataGrid } from "@material-ui/data-grid";
import { Switch } from 'pretty-checkbox-react';
import { IconButton } from '@mui/material';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../helpers/global";
import Skeleton from '@mui/material/Skeleton';
import '@djthoms/pretty-checkbox';
import "./SCSS/TransHist.css";
import axios from "axios";
const TransHist = () => {
    const [hisdata,setHisdata]=useState([]);
    const [isloading,setIsLoading]=useState(false); 
    const lo = useLocation();
    const getQuickByuHistoryData = async () => {
        setIsLoading(true); 
        try {
            var data = JSON.stringify({
                "user_id": lo?.state?.user_id,
                "coin": lo?.state?.pairdata
            });
            var config = {
                method: 'post',
                url: `${URL}getsendrecivehistory`,
                headers: {
                    'Content-Type': 'application/json',
                    
                },
                data: data
            };

           await axios(config).then(function (response) {
                if(response.data.status){
                    setIsLoading(false);
                    setHisdata(response.data.data); 
                }
                // console.log(JSON.stringify(response.data));
            }).catch(function (error) {
                console.log(error);
            })
        } catch (error) {
            console.log("hfjk", error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getQuickByuHistoryData();
    }, [lo?.state?.user_id]);
    const columns = [
        { field: "id", headerName: "Id", minWidth: 100, flex: 0.2 },
        { field: "coin", headerName: "Coin", minWidth: 100, flex: 0.2 },
        {
            field: "r_amount",
            headerName: "Amount",
            type: "string",
            minWidth: 120,
            flex: 0.3,
        },

        // {
        //     field: "txfee",
        //     flex: 0.25,
        //     headerName: "Tx Fee",
        //     minWidth: 120,
        //     type: "number",
        //     sortable: false,
        //     renderCell: (params) => {
        //         return (
        //             <>

        //             </>
        //         );
        //     },
        // },

        {
            field: "type",
            headerName: "Type",
            type: "String",
            minWidth: 100,
            flex: 0.25,
            renderCell: (params) => {
                console.log("hsdjdsjhdfs",params.row);
                return (
                    <Box sx={{
                        display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between", 
                        width: "100%"
                      }}>
                    {(params.row.action!==2)?(params.row.action==3)?
                   <span style={{ color:'rgb(225 191 22)'}}> BeaSid </span>:<span style={{ color: 'rgb(239 9 9)'}}>Deposit</span>:<span style={{ color: '#29e70c'}} >Withdraw</span>}
                  </Box>
                );
            },
        },
        {
            field: "to_address",
            headerName: "Address",
            type: "String",
            minWidth: 150,
            flex: 0.4,
        },

        {
            field: "status",
            headerName: "Status",
            type: "String",
            minWidth: 80,
            flex: 0.2,
            renderCell: (params) => {
                console.log("hsdjdsjhdfs",params.row);
                return (
                    <Box sx={{
                        display: 'flex', flexDirection: "row", alignItems: 'center', justifyContent: "space-between", 
                        width: "100%"
                      }}>
                    {(params.row.status!==1)?
                    (params.row.status!==2)?
                    <span style={{ color:'hsl(43deg 90% 48%)'}}>Processing</span>
                    :
                    <span style={{ color: 'rgb(239 9 9)'}}>Failed</span>
                    :
                    <span style={{ color: '#29e70c'}}>Successful</span>
                   }
                  </Box>
                );
            },
        },

        
        {
            field: "created_at",
            headerName: "Date",
            minWidth: 100,
            flex: 0.3,
        },

    ];
    const rows = [];
    return (
        <div className='trans_div'>
            <h1 className="balance">
                Transctions History
            </h1>
            <div className='balanceSheet'>
                <div className="balanceSheet_div">
                    {(isloading)?
                      (
                        <Box sx={{ height: 300 }}>
                          <Skeleton />
                          <Skeleton animation="wave" />
                          <Skeleton animation={false} />
                        </Box>
                      ) :
                  (
                    <DataGrid
                        rows={(hisdata&&hisdata.length>0)?hisdata:[]}
                        columns={columns}
                        pageSize={8}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />)
                    }
                </div>
            </div>

        </div>
    )
}

export default TransHist;