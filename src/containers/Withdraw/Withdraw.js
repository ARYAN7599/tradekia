import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import "./SCSS/Withdraw.css";

const Withdraw = () => {
    const [age, setAge] = useState('');

    const [btc, setBtc] = useState('BTC');
    const [eth, setEth] = useState('ETH');
    const [ltc, setLtc] = useState('LTC');
    const [doge, setDoge] = useState('DOGE');
    const [bnb, setBnb] = useState('BNB');


    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <div className='deposit'>
            <h1 className="deposit_heading">
                Withdraw
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
                        <input className="coinAddress" type="text" />

                        <div className='coinsPercent_btnDiv'>
                            <Button variant="contained" className='trade_btn'>25%</Button>
                            <Button variant="contained" className='trade_btn'>50%</Button>
                            <Button variant="contained" className='trade_btn'>75%</Button>
                            <Button variant="contained" className='trade_btn'>100%</Button>
                        </div>
                    </div>

                    <div className='receipt_div'>
                        <h3 >Recipient's address</h3>
                        <input className="coinAddress" type="text" />
                    </div>

                    <div className='withdraw_btnDiv'>
                        <Button variant="contained" className='trade_btn'>Withdraw</Button>
                    </div>


                </div>

                <div className="checkTranscation">

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
                        <h3>Tx fee:</h3>
                        <h4>0 BTC</h4>
                    </div>

                    <div className='balanceDiv'>
                        <h3>You will Get:</h3>
                        <h2>0.00034221</h2>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Withdraw