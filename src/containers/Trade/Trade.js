import { React, useState } from 'react';
import DollarSvg from "../../assets/images/totalBalance.svg";
import { DataGrid } from "@material-ui/data-grid";
import { Switch } from 'pretty-checkbox-react';
import { IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import '@djthoms/pretty-checkbox';
import "./SCSS/Trade.css";

const Trade = () => {
    const columns = [
        { field: "bitcoin", headerName: "Bitcoin", minWidth: 120, flex: 0.3 },

        {
            field: "lastPrice",
            headerName: "Last Price",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "change",
            headerName: "24h Change",
            type: "string",
            minWidth: 120,
            flex: 0.3,
        },

        {
            field: "high",
            headerName: "24h High",
            type: "string",
            minWidth: 100,
            flex: 0.3,
        },

        {
            field: "low",
            flex: 0.3,
            headerName: "24h Low",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>

                    </>
                );
            },
        },

        {
            field: "volume",
            headerName: "24h Volume",
            type: "number",
            minWidth: 150,
            flex: 0.4,
        },
    ];

    const rows = [];

    return (
        <div className='trade'>

            <div className='balanceSheet'>
                <div className="balanceSheet_div">
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={1}
                        disableSelectionOnClick
                        className="productListTable"
                        // autoHeight
                    />
                </div>
            </div>

        </div>
    )
}

export default Trade;