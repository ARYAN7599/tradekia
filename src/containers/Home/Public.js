import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, useNavigate } from "react-router-dom";
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
import Dashboard from '../../containers/Dashboard/Dashboard';
import CreateAcc from '../../components/CreateAccount/CreateAcc';
import CrAccOtp from '../../components/CreateAccount/CreateAccOtp';
import Login from '../../components/Login/Login';
import ResetEmail from '../../components/ForgtPas/ResetEmail/ResetEmail';
import Otp from '../../components/ForgtPas/Otp/Otp';
import ConfirmPas from '../../components/ForgtPas/ConfirmPas/ConfirmPas';
import ReferralRegistration from '../../components/CreateAccount/ReferralRegistration.js';
import { connect } from 'react-redux';
import { updToken, updRfToken, updUserData, updIP,updOtpVerify } from "../../store/actions";
// import logo from '../../assets/images/create_acc.jpg';
import './Home.css';
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

const Home = (props) => {
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
        props.saveIsOtpVerfy(false);
        navigate('/');
    }

    return (
        <Box>
     <Routes>
      <Route path={"/confirm"} element={<ConfirmPas />} />
          {/* <Route path={"/admin"} element={<Admin />} /> */}
      <Route path={"/resetotp"} element={<Otp />} />
      <Route path={"/reset"} element={<ResetEmail />} />
      <Route exact path={"/createaccount/otp"} element={<CrAccOtp />} />
      <Route exact path={"/createaccount"} element={<CreateAcc />} />
      <Route exact path={"/createaccount/:id"} element={<ReferralRegistration />} />
      <Route path={"/login"} element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
        </Box>
    );
};


const mapStateToProps = (state) => {
    return ({
        name: state.name,
        email: state.email,
        token: state.token,
        isotpverify:state.isotpverify,

    });
}

// need to handle logout
const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrData: (name, email, secretkey, authenticator, referral_code) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
        saveIsOtpVerfy:(otpverify) => dispatch(updOtpVerify(otpverify))
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
