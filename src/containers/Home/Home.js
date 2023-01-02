import React, { useState, useEffect,memo } from 'react';
import { Routes, Route, Navigate, useLocation, NavLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Trade from "../Trade/Trade";
import Orders from "../Orders/Orders";
import Wallet from "../Wallet/Wallet";
import P2Pwallet from "../../containers/Wallet/P2Pwallet";
import Foundingwallet from '../Wallet/Foundingwallet';
import QuickBuy from "../QuickBuy/QuickBuy";
import Profile from '../Profile/Profile';
import { URL } from "../../helpers/global";
import axios from "axios";
import Referral from '../Referral/Referral.js';
// import TradingList from '../Trading/Trading';
import TradingList from '../../components/Trading/Trading';
import TradePairCon from '../TradePairCon/TradePairCon';
import VPers from '../../components/Verify/VPers/VPers';
import VDoc1 from '../../components/Verify/VDoc1/VDoc1';
import VDocUp from '../../components/Verify/VDocUp/VDocUp';
import VSelfie from '../../components/Verify/VSelfie/VSelfie';
import Pdoc from '../../components/Verify/Pancard/Pdoc';
import Fa1 from '../../components/2FA/fa1/fa1';
import Fa2 from '../../components/2FA/fa2/Fa2';
import Fa3 from '../../components/2FA/fa3/Fa3';
import { connect } from 'react-redux';
import { updToken, updRfToken, updUserData, updIP, updOtpVerify } from "../../store/actions";
import logo from '../../assets/images/tradekiyalogo.png';
import './Home.css';
import FA2OTP from '../../components/2FA/disable2fa/2faOTP/FA2OTP';
import EmailOTP from '../../components/2FA/disable2fa/emailOTP/EmailOTP';
import ChangePass from '../ChangePass/ChangePass';
import Deposit from '../Deposit/Deposit';
import Withdraw from '../Withdraw/Withdraw';
import TransHist from "../TransHist/TransHist.js";
import TradeChart from "../TradeChart/TradChart";
import P2p from "../P2P/P2p";
import NotificationNew from '../Notification/NotificationNew';
import NotificationList from '../Notification/NotificationList';
import ChatScreen from "../P2P/ChatScreen";

import ChartLive from '../TradeChart/ChartLive';

import AddchartIcon from '@mui/icons-material/Addchart';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

import HowToRegIcon from '@mui/icons-material/HowToReg';
import Badge from '@mui/material/Badge';
// import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Dialog from "@mui/material/Dialog";
import FormHelperText from "@mui/material/FormHelperText";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import Setorder from '../MakeOrders/Setorders';
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

const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'var(--background-color) !important',
}));

// const pages = ['Trade', 'Orders', 'Wallet'];

// functions for measuring window size
function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

// using window dimension to handle css for header
export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
}

const Home = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { width } = useWindowDimensions();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [isOpenNotifi, setIsOpenNotifi] = React.useState(false);
    const [notC,setNotiC] = React.useState(0);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = (e) => {

        setAnchorElNav(null);
        return false;
    };

    // const getunreadnotificationCount = async () => {
    //     try {
    //         let data = {
    //             "user_id": props.userId
    //         };
    //         let config = {
    //             method: "POST",
    //             url: `${URL}/userNotificationcount`,
    //             headers: {
    //                 "Content-Type": "application/json",
    //                 'x-access-token': `${props.token}`
    //             },
    //             data: data
    //         };
    //         await axios(config).then(async function (res) {
    //             if (res.data.status) {
    //                 let rdata = res?.data?.data;
    //                 setNotiC(rdata);
    //             }
    //         }).catch(function (error) {
    //             console.log("first Error", error);

    //         });
    //     } catch (err) {
    //         console.log(err);
    //     }
    // }
    // React.useEffect(() => {
    //     getunreadnotificationCount();
    // }, []);

    // React.useEffect(() => {
    //     let timer = setTimeout(() => {
    //         getunreadnotificationCount();
    //     },1000);
    //     return () => clearTimeout(timer);
    //   });

    // console.log(props); 

    const handleLogout = () => {
        props.saveToken("");
        props.saveRfToken("");
        props.saveUsrData("");
        props.saveUsrIP("");
        props.saveIsOtpVerfy(false);
        navigate('/');
    }
    const [c, setC] = React.useState(0);

    const handileOpenMouseHover = () => {
        setIsOpenNotifi(true);
    }

    const handileOpenMouseLeave = () => {
        // setTimeout(() => {
        setIsOpenNotifi(false);
        // },1000);

    }

    return (
        <Box>
            <StyledAppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <div className='logoAndMenuBarDiv'>
                            <img src={logo} alt="Trade Kiya" className='home_logo' />
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorElNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorElNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >
                                    {/* <NavLink to="/" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Exchange</Typography>
                                        </MenuItem>
                                    </NavLink> */}
                                    <NavLink to="/quickbuy" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                                MARKETS</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    {/* <NavLink to="/ChatScreen" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">
                                            ChatScreen</Typography>
                                        </MenuItem>
                                    </NavLink> */}

                                    {/* <NavLink to="/p2p" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">P2P Order</Typography>
                                        </MenuItem>
                                    </NavLink> */}





                                    {/* <NavLink to="/trade" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Trade</Typography>
                                        </MenuItem>
                                    </NavLink> */}

                                    <NavLink to="/orders" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Orders</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    <NavLink to="/wallet" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Wallet</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    <NavLink to="/p2pwallet" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">P2P Wallet</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    <NavLink to="/fundingwallet" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Funding  Wallet</Typography>
                                        </MenuItem>
                                    </NavLink>
                                    <MenuItem onClick={handleCloseNavMenu}>
                                        <Typography className='tryraphy' textAlign="center">X</Typography>
                                    </MenuItem>

                                </Menu>
                            </Box>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                {/* <NavLink to="/" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Exchange
                                    </Button>
                                </NavLink> */}
                                <NavLink to="/quickbuy" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >

                                        MARKETS
                                        {/* QuickTrade */}
                                    </Button>
                                </NavLink>
                                {/* <NavLink to="/trade" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Trade
                                    </Button>
                                </NavLink> */}

                                {/* <NavLink to="/p2p" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        P2P Order
                                    </Button>
                                </NavLink> */}

                                {/* <NavLink to="/ChatScreen" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        ChatScreen
                                    </Button>
                                </NavLink> */}

                                <NavLink to="/wallet" style={{ textDecoration: 'none' }}>

                                    <div class="dropdown">
                                        <Button
                                            onClick={handleCloseNavMenu}
                                            sx={{ my: 2, color: 'white', display: 'block' }}
                                        >
                                            Wallet
                                        </Button>
                                        <div class="dropdown-content">
                                            <NavLink to="/wallet" style={{ textDecoration: 'none' }}>
                                                Spot Wallet
                                            </NavLink>
                                            <NavLink to="/fundingwallet" style={{ textDecoration: 'none' }}>
                                                Funding Wallet
                                            </NavLink>
                                            <NavLink to="/p2pwallet" style={{ textDecoration: 'none' }}>
                                                P2P Wallet
                                            </NavLink>
                                        </div>
                                    </div>
                                </NavLink>

                                <NavLink to="/orders" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Orders
                                    </Button>
                                </NavLink>

                                <NavLink to="/makeorders" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        P2P
                                    </Button>
                                </NavLink>




                                {/* <NavLink to="/deposit" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        deposit
                                    </Button>
                                </NavLink> */}
                                {/* <NavLink to="/withdraw" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Withdraw
                                    </Button>
                                </NavLink> */}
                            </Box>
                        </div>
                        <Box className='userInfoBox profileDiv' style={{ display: 'flex', alignItems: 'center', }}>
                            <div >
                                {width > 600 ? (
                                    <>
                                        {/* <Badge badgeContent={notC} onClick={handileOpenMouseHover} sx={{ cursor: 'pointer' }} color="primary">
                                            <NotificationsIcon color="action" />
                                        </Badge> */}
                                        <NavLink to="/profile" style={{ textDecoration: 'none' }}>
                                            <IconButton sx={{ p: 0 }}>
                                                <Avatar alt={props.name} src="/static/images/avatar/2.jpg" />
                                            </IconButton>
                                        </NavLink>
                                    </>
                                ) : (
                                    <>
                                        {/* <Badge badgeContent={notC} onClick={handileOpenMouseHover} sx={{ cursor: 'pointer' }} color="primary">
                                            <NotificationsIcon color="action" />
                                        </Badge> */}
                                        <IconButton sx={{ p: 0 }}>
                                            <Avatar alt={props.name} src="/static/images/avatar/2.jpg" />
                                        </IconButton>
                                    </>
                                )}
                            </div>
                            <div className='userName_div'>
                                <h2 className='home_name'>{props.name}</h2>
                                <NavLink to="/profile" style={{ textDecoration: 'none' }}>
                                    <p className='home_settng' >Settings</p>
                                </NavLink>
                                <p className='home_lgout' onClick={handleLogout}>Logout</p>
                            </div>
                        </Box>
                    </Toolbar>
                </Container>
            </StyledAppBar>
            <Routes>
                {/* <Route exact path='/fa/emailotp' element={<EmailOTP />} /> */}
                {/* </Routes> 
                { ((props.isotpverify)? 
                  <Routes> */}
                <Route exact path='/changepassword' element={<ChangePass />} />
                <Route path={"/fa/disable2fa"} element={<FA2OTP />} />
                {/* <Route path="/fa/verification" element={<Fa3 />} /> */}
                <Route path="/fa/scan" element={<Fa2 />} />
                <Route path="/fa" element={<Fa1 />} />
                <Route path="/referral/:id" element={<Referral />} />
                <Route path="/verify/selfie" element={<VSelfie />} />
                <Route path="/verify/upload" element={<VDocUp />} />
                <Route path="/verify/panuoload" element={<Pdoc />} />
                <Route path="/verify/document" element={<VDoc1 />} />
                <Route path="/verify" element={<VPers />} />
                <Route path="/profile" element={<Profile />} />

                <Route path="/ChartLive" element={<ChartLive />} />
                <Route exact path="/p2p" element={<P2p />} />
                {/* <Route exact path='/ChatScreen' element={<ChatScreen />} /> */}
                <Route exact path="/wallet" element={<Wallet />} />
                <Route exact path="/p2pwallet" element={<P2Pwallet />} />
                <Route exact path="/fundingwallet" element={<Foundingwallet />} />
                <Route exact path="/quickbuy" element={<QuickBuy />} />
                <Route exact path="/makeorders" element={<Setorder />} />
                <Route exact path="/orders" element={<Orders />} />
                <Route exact path="/deposit" element={<Deposit />} />
                <Route exact path="/withdraw" element={<Withdraw />} />
                <Route exact path="/transcations" element={<TransHist />} />
                <Route exact path="/tradechart" element={<Trade />} />
                <Route exact path="/trade" element={<TradeChart />} />
                <Route path="/:id" element={<TradePairCon />} />
                <Route path="/ex" element={<TradingList />} />
            </Routes>
            {/* :
<Navigate to="/fa/emailotp" state={{ from: location }} replace />

) 
}  */}
            {isOpenNotifi ?

                <BootstrapDialog xs={3}
                    onClose={handileOpenMouseLeave}
                    aria-labelledby="customized-dialog-title"
                    data-mdb-backdrop="static"
                    open={isOpenNotifi}
                    PaperProps={{
                        sx: {
                            marginBottom: "auto",
                            marginLeft: "auto",
                            marginTop: "70px"
                        }
                    }}
                >
                    <DialogContent dividers>
                        <NotificationList />
                    </DialogContent>
                </BootstrapDialog>



                : ''}
        </Box>
    );
};


const mapStateToProps = (state) => {
    return ({
        name: state.name,
        email: state.email,
        token: state.token,
        userId: state.user_id,
        isotpverify: state.isotpverify,

    });
}

// need to handle logout
const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrData: (name, email, secretkey, authenticator, referral_code) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
        saveIsOtpVerfy: (otpverify) => dispatch(updOtpVerify(otpverify))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Home));
