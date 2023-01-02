import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import { useNavigate } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import "./SCSS/Deposit.css";

const Deposit = () => {
    const [age, setAge] = useState('');
    const [sendSecretKey, setSendSecretKey] = useState("");
    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();
    const [btc, setBtc] = useState('BTC');
    const [eth, setEth] = useState('ETH');
    const [ltc, setLtc] = useState('LTC');
    const [doge, setDoge] = useState('DOGE');
    const [bnb, setBnb] = useState('BNB');


    const handleChange = (event) => {
        setAge(event.target.value);
    };
    const transctionHandler=()=>{
navigate('/transcations');
    }

    return (
        <div className='deposit'>
            <h1 className="deposit_heading">
                Deposit
            </h1>
            <div className='depositForm'>
                <div className="depositCoins">
                    <Box sx={{ minWidth: 120 }}>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Select Currency</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChange}
                            >
                                <MenuItem value={btc}> <img src="https://bitcoin.org/img/icons/opengraph.png?1643058474" className='coinsImg' alt="coin" /> <span className='coinsHeading'>BTC</span></MenuItem>
                                <MenuItem value={eth}> <img src="https://bitcoin.org/img/icons/opengraph.png?1643058474" className='coinsImg' alt="coin" /> <span className='coinsHeading'>ETH</span> </MenuItem>
                                <MenuItem value={ltc}> <img src="https://bitcoin.org/img/icons/opengraph.png?1643058474" className='coinsImg' alt="coin" /><span className='coinsHeading'>LTC</span></MenuItem>
                                <MenuItem value={doge}> <img src="https://bitcoin.org/img/icons/opengraph.png?1643058474" className='coinsImg' alt="coin" /><span className='coinsHeading'>DOGE</span></MenuItem>
                                <MenuItem value={bnb}> <img src="https://bitcoin.org/img/icons/opengraph.png?1643058474" className='coinsImg' alt="coin" /><span className='coinsHeading'>BNB</span></MenuItem>

                            </Select>
                        </FormControl>
                    </Box>

                    <div className="coinAddressDiv">
                        <h3>BTC Address</h3>
                        <div className="coinAddress">
                            <IconButton className='iconBtn'>
                                <p>1FfmbHfnpaZjKFvyi1okTjJJusN455paPH</p>
                                <ContentCopyIcon />
                            </IconButton>
                        </div>
                    </div>

                    <div className='trade_div'>
                        <h3 >Go to trade:</h3>

                        <Button variant="contained" className='trade_btn'>Bnb/btc</Button>
                        <Button variant="contained" className='trade_btn'>bnb/usdt</Button>
                        <Button variant="contained" className='trade_btn'>Bnb/eth</Button>
                    </div>

                </div>

                <div className="checkTranscation">
                    <div className='checkTransct_div' onClick={transctionHandler}>
                        <h3 >CHECK TRANSCATION</h3>
                    </div>

                    <div className='balanceDiv'>
                        <h3>Total Balance:</h3>
                        <h4>0 BTC</h4>
                    </div>

                    <div className='balanceDiv'>
                        <h3>Locked Balance: <HelpIcon /> </h3>
                        <h4>0 BTC</h4>
                    </div>

                    <div className='balanceDiv'>
                        <h3>Available Balance:</h3>
                        <h4>0 BTC</h4>
                    </div>

                    <div className='balanceDiv'>
                        <h3>Send only BNB to this deposit address.</h3>
                        <p>Sending coin or token other than BTC to this address may result in the loss of your deposit.</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Deposit