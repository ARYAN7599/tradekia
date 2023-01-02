import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { URL } from "../../../../helpers/global";
import create_img from '../../../../assets/images/create_acc.jpg';
import { updUserData } from "../../../../store/actions.js";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./SCSS/FA2OTP.css";

const FA2OTP = (props) => {

    const [otp1, setOtp1] = useState();
    const [otp2, setOtp2] = useState();
    const [otp3, setOtp3] = useState();
    const [otp4, setOtp4] = useState();
    const [otp5, setOtp5] = useState();
    const [otp6, setOtp6] = useState();
    const navigate = useNavigate();

    // taking userInput for OTP

    const otp1change = (event) => {
        setOtp1(event.target.value);
    }
    const otp2change = (event) => {
        setOtp2(event.target.value);
    }
    const otp3change = (event) => {
        setOtp3(event.target.value);
    }
    const otp4change = (event) => {
        setOtp4(event.target.value);
    }
    const otp5change = (event) => {
        setOtp5(event.target.value);
    }
    const otp6change = (event) => {
        setOtp6(event.target.value);
    }

    const secretOTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;

    const disableAuthenticator = async () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "email": `${props.email}`,
            "enableAuthenticator": 0,
            "secretkey": "",
        });

        var config = {
            method: 'post',
            url: `${URL}enableAuthenticator`,
            headers: {
                'x-access-token': `${props.token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                props.saveUsrData(props.name, props.email, "", 0, props.referral_code);
                toast.info(response.data.message, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            })
            .catch(function (error) {
                toast.error('Some error occur please try again sometimes', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            });
    }

    const verifyOTP = async () => {
        try {
            const secretkey = props.secretkey;
            let options = {
                method: 'GET',
                url: 'https://google-authenticator.p.rapidapi.com/validate/',
                params: { code: `${secretOTP}`, secret: `${secretkey}` },
                headers: {
                    'x-rapidapi-host': 'google-authenticator.p.rapidapi.com',
                    'x-rapidapi-key': '0ad38bcd6bmshf99e15a16cac8f8p1aaa36jsn1271dec98f89'
                }
            };

            await axios.request(options).then(function (response) {
                if (response.data) {
                    disableAuthenticator();
                    toast.success('OTP matched successfully', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    navigate("/profile");

                } else {
                    toast.error('Please enter OTP correctly', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            }).catch(function (error) {
                toast.error('Some error occur please try again sometimes', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    });
            });

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {

        let container = document.getElementsByClassName("otp_inp_div")[0];
        container.onkeyup = function (e) {
            let target = e.srcElement || e.target;
            let maxLength = parseInt(target.attributes["maxLength"].value, 10);
            let myLength = target.value.length;
            if (myLength >= maxLength) {
                let next = target;
                while (next = next.nextElementSibling) {
                    if (next == null)
                        break;
                    if (next.tagName.toLowerCase() === "input") {
                        next.focus();
                        break;
                    }
                }
            }
            // Move to previous field if empty (user pressed backspace)
            else if (myLength === 0) {
                let previous = target;
                while (previous = previous.previousElementSibling) {
                    if (previous == null)
                        break;
                    if (previous.tagName.toLowerCase() === "input") {
                        previous.focus();
                        break;
                    }
                }
            }
        }

    }, []);

    return (
        <div className="container otp_main_div">

            <div className="otp_img_div">
                <img src={create_img} alt="login" />
            </div>

            <div className="container otp_div">
                <h1 style={{ marginBottom: '0px' }}><span style={{ color: '#FEB101' }}>Verify </span>OTP</h1>

                <p className="otp_sub">Enter the OTP from google authenticator.</p>

                <h4>Enter OTP</h4>
                <div className="container otp_inp_div">
                    <input type="text" maxLength="1" id="otp1" className="otp_inp" onChange={otp1change} />
                    <input type="text" maxLength="1" id="otp2" className="otp_inp" onChange={otp2change} />
                    <input type="text" maxLength="1" id="otp3" className="otp_inp" onChange={otp3change} />
                    <input type="text" maxLength="1" id="otp4" className="otp_inp" onChange={otp4change} />
                    <input type="text" maxLength="1" id="otp5" className="otp_inp" onChange={otp5change} />
                    <input type="text" maxLength="1" id="otp5" className="otp_inp" onChange={otp6change} />
                </div>


                <div className='fa3_flex'>
                    <NavLink to={"/profile"} className="fa3_prev">
                        <ArrowLeftIcon /> Previous
                    </NavLink>

                    <button onClick={verifyOTP} className="fa3_next">
                        Submit <ArrowRightIcon />
                    </button>

                </div>

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
    )
}

const mapStateToProps = (state) => {
    return ({
        token: state.token,
        email: state.email,
        secretkey: state.secretkey,
        authenticator: state.authenticator,
        name: state.name,
        referral_code: state.referral_code,
    });
}
const mapDispatchToProps = (dispatch) => {
    return ({
        saveUsrData: (name, email, secretkey, authenticator, referral_code) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code)),

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FA2OTP);