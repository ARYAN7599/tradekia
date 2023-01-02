import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
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
import Profile from '../Profile/Profile';
import Referral from '../Referral/Referral.js';
import TradingList from '../Trading/Trading';
import TradePairCon from '../TradePairCon/TradePairCon';
import VPers from '../../components/Verify/VPers/VPers';
import VDoc1 from '../../components/Verify/VDoc1/VDoc1';
import VDocUp from '../../components/Verify/VDocUp/VDocUp';
import VSelfie from '../../components/Verify/VSelfie/VSelfie';
import Fa1 from '../../components/2FA/fa1/fa1';
import Fa2 from '../../components/2FA/fa2/Fa2';
import Fa3 from '../../components/2FA/fa3/Fa3';
import { connect } from 'react-redux';
import { updToken, updRfToken, updUserData, updIP } from "../../store/actions";
import logo from '../../assets/images/create_acc.jpg';
import './Admin.css';
import FA2OTP from '../../components/2FA/disable2fa/2faOTP/FA2OTP';
import EmailOTP from '../../components/2FA/disable2fa/emailOTP/EmailOTP';
import ChangePass from '../ChangePass/ChangePass';
import Deposit from '../Deposit/Deposit';
import Withdraw from '../Withdraw/Withdraw';
import TransHist from "../TransHist/TransHist.js";
const StyledAppBar = styled(AppBar)(({ theme }) => ({
    background: 'var(--background-color) !important',
}));
const pages = ['Trade', 'Orders', 'Wallet'];

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

const Admin = (props) => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // console.log(props); 

    const handleLogout = () => {
        props.saveToken("");
        props.saveRfToken("");
        props.saveUsrData("");
        props.saveUsrIP("");
        navigate('/');
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
                                    <NavLink to="/admin" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Exchange</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    <NavLink to="/admin/trade" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Trade</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    <NavLink to="/admin/orders" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Orders</Typography>
                                        </MenuItem>
                                    </NavLink>

                                    <NavLink to="/admin/wallet" style={{ textDecoration: 'none' }}>
                                        <MenuItem onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">Wallet</Typography>
                                        </MenuItem>
                                    </NavLink>
                                </Menu>
                            </Box>

                            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <NavLink to="/admin" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Exchange
                                    </Button>
                                </NavLink>

                                <NavLink to="/admin/trade" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Trade
                                    </Button>
                                </NavLink>

                                <NavLink to="/admin/wallet" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Wallet
                                    </Button>
                                </NavLink>

                                <NavLink to="/admin/orders" style={{ textDecoration: 'none' }}>
                                    <Button
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        Orders
                                    </Button>
                                </NavLink>
                            </Box>

                        </div>

                        <Box className='userInfoBox profileDiv' style={{ display: 'flex', alignItems: 'center', }}>
                            <div >
                                {width > 600 ? (<NavLink to="/profile" style={{ textDecoration: 'none' }}>
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
                                </NavLink>) : (
                                    <IconButton sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                    </IconButton>
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
                <Route exact path='/admin/fa/emailotp' element={<EmailOTP />} />
                <Route exact path='/admin/changepassword' element={<ChangePass />} />
                <Route path={"/admin/fa/disable2fa"} element={<FA2OTP />} />
                <Route path="/admin/fa/verification" element={<Fa3 />} />
                <Route path="/admin/fa/scan" element={<Fa2 />} />
                <Route path="/admin/fa" element={<Fa1 />} />
                <Route path="/admin/referral/:id" element={<Referral />} />
                <Route path="/admin/verify/selfie" element={<VSelfie />} />
                <Route path="/admin/verify/upload" element={<VDocUp />} />
                <Route path="/admin/verify/document" element={<VDoc1 />} />
                <Route path="/admin/verify" element={<VPers />} />
                <Route path="/admin/profile" element={<Profile />} />
                <Route exact path="/admin/wallet" element={<Wallet />} />
                <Route exact path="/admin/orders" element={<Orders />} />
                <Route exact path="/admin/deposit" element={<Deposit />} />
                <Route exact path="/admin/withdraw" element={<Withdraw />} />
                <Route exact path="/admin/transcations" element={<TransHist />} />
                <Route exact path="/admin/trade" element={<Trade />} />
                <Route path="/admin/:id" element={<TradePairCon />} />
                <Route path="/admin" element={<TradingList />} />

            </Routes>

        </Box>
    );
};


const mapStateToProps = (state) => {
    return ({
        name: state.name,
        email: state.email,
        token: state.token,

    });
}

// need to handle logout
const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrData: (name, email, secretkey, authenticator, referral_code) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
