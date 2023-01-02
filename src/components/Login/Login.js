import React, { useState, useEffect,memo } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { PulseBubbleLoader } from 'react-loaders-kit';
import axios from "axios";
import { URL } from "../../helpers/global";
import create_img from '../../assets/images/create_acc.jpg';
import { connect } from 'react-redux';
import { updToken, updRfToken, updUserData, updIP } from "../../store/actions";
import { requestFirebaseNotificationPermission } from '../../Firebase.js';
import { ToastContainer, toast } from 'react-toastify';
import LoadingButton from '@mui/lab/LoadingButton';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';
const biri = require('biri');

function Login(props) {
    // const {setAuth}  = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    // console.log("HelloFriends",props?.token); 
    const [ip, setIP] = useState('');
    const [uid, setUid] = useState('');
    const [fbtoken, setFbtoken] = React.useState();
    const [passwVis, setPasswVis] = useState(false);
    const [passw, setPassw] = useState("password");
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loaderProps = {
        isLoading,
        size: '100%',
        duration: 1,
        colors: ['#5e22f0', '#f6b93b']
    }
    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        const ip = res.data.IPv4;
        const uniqueId = await biri();
        setIP(ip);
        setUid(uniqueId);
        props.saveUsrIP(ip, uniqueId);
    }

    // React.useEffect(() => {
    //     requestFirebaseNotificationPermission()
    //         .then((firebaseToken) => {
    //             // eslint-disable-next-line no-console
    //             setFbtoken(firebaseToken);
    //             //console.log('login', firebaseToken);
    //             //console.log('firebaseToken');
    //         }).catch((err) => {
    //             return err;
    //         });

    //         // return function cleanup() {
    //         //     disconnect();
    //         // }
    // }, []);

    const viewPassw = () => {
        setPasswVis(!passwVis);
        if (passw === "password") {
            setPassw("text");
        } else {
            setPassw("password");
        }
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }
    const handlePasswChange = (event) => {
        setPassword(event.target.value);
    }
    const loginHandler = async () => {
        setIsLoading(true);
        const data = {
            "email": email,
            "password": password,
            // "fbtoken":fbtoken,
            "ipaddress": ip,
            "deviceid": uid,
        }
        await axios.post(`${URL}login`,data).then(res => {
                if (res.data.status) {
                    setIsLoading(false);
                    if (res.data.isEmailVerify) {
                        let token = res.data.token;
                        let rfToken = res.data.refreshToken;
                        let userData = [res.data.data[0].name, email, res.data.data[0].secretkey, res.data.data[0].authenticator, res.data.data[0].referral_code, res.data.data[0].id];
                        // navigate(from, { replace: true });
                        props.saveToken(res.data.token);
                        props.saveRfToken(res.data.refreshToken);
                        // props.saveUsrData(userData); 
                        props.saveUsrData(res.data.data[0].name, email, res.data.data[0].secretkey, res.data.data[0].authenticator, res.data.data[0].referral_code, res.data.data[0].id, res.data.data[0].user_id, res.data.data[0].user_type);
                        if (res.data.data[0].authenticator === 0 && res.data.data[0].user_type === 2) {
                            navigate('/fa/emailotp', { state: { prevPath: "/login", userInfo: [token, rfToken, userData] } });
                        } else if (res.data.data[0].authenticator === 0 && res.data.data[0].user_type === 1) {
                            navigate('/admin/fa/emailotp', { state: { prevPath: "/login", userInfo: [token, rfToken, userData] } });
                        } else {
                      
                            navigate("/fa/verification", { state: { prevPath: "/login", sendSecretKey: res.data.data[0].secretkey, userInfo: [token, rfToken, userData] } });
                        }
                        //navigate('/createaccount/otp', { state: { email: email, pas: password, token: res.data.token, reftokn: res.data.refreshToken } });
                    } else {
                        props.saveUsrData(res.data.data.name, email);
                        navigate('/createaccount/otp', { state: { email: email, pas: password, token: res.data.token, reftokn: res.data.refreshToken } });
                    }
                } else {
                    setIsLoading(false);
                    toast.error(res.data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                }
            }).catch((err) => {
                console.log("vvv", err);
                setIsLoading(false);
                toast.error("Some error occurs, please try again", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            ;

    }

    useEffect(() => {
        getData();
    })

    return (
        <div className="container lgn_main_div">

            <div className="lgn_img_div">
                <img src={create_img} alt="login" />
            </div>

            <div className="container lgn_div">

                <h1><span style={{ color: '#FEB101' }}>Log In</span>to Account</h1>

                <div className="l_inp_div">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="l_inp"
                        value={email}
                        onChange={handleEmailChange} />
                </div>

                <div className="l_inp_div">
                    <form className="l_inppp">
                        <input
                            type={passw}
                            placeholder="Password"
                            className="lgn_inp"
                            value={password}
                            onChange={handlePasswChange} />
                        {
                            passwVis ? <i className="fa fa-eye" onClick={viewPassw}></i> : <i className="fa fa-eye-slash" onClick={viewPassw}></i>
                        }
                    </form>
                </div>
                {isLoading ?
                    <button className="lgn_acc_btn">
                        <PulseBubbleLoader />
                    </button>
                    :
                    <button className="lgn_acc_btn" onClick={loginHandler}>Login</button>
                }
                {/* <button className="lgn_acc_btn" onClick={loginHandler}><BarsLoader {...loaderProps} />Login</button> */}

                <div className="lgn_frgt">
                    <NavLink to="/reset" style={{ textDecoration: 'none' }}>
                        <p>Forgot Password ?</p>
                    </NavLink>
                </div>

                <p style={{ color: '#949494' }}>Don't have an account ?
                    <NavLink to="/createaccount" style={{ textDecoration: 'none' }}>
                        <span style={{ color: '#1868b8' }}>
                            Sign Up
                        </span>
                    </NavLink>
                </p>

                {/* <NavLink to="/createaccount" className="lgn_acc_lgnbtnA">
                    Create an Account
                </NavLink> */}

            </div>

            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    );
}
const mapStateToProps = (state) => {
    return ({
        name: state.name,
        email: state.email,
        token: state.token,
        isotpverify: state.isotpverify,

    });
}

// const mapDispatchToProps = (dispatch) => {
//     return ({
//         saveToken: (tkn) => dispatch(updToken(tkn)),
//         saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
//         saveUsrData: (user_id) => dispatch(updUserData(user_id)),

//         saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),

//     });
// }
const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrData: (name, email, secretkey, authenticator, referral_code, id, user_id, user_type) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code, id, user_id, user_type)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
    });
}

export default connect(mapStateToProps, mapDispatchToProps)(memo(Login));