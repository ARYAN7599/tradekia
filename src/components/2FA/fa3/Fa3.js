import React, { useState, useEffect } from "react";
import axios from "axios";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { PulseBubbleLoader } from 'react-loaders-kit';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { URL } from "../../../helpers/global";
import create_img from '../../../assets/images/create_acc.jpg';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updToken, updRfToken, updUserData,updOtpVerify, updIP } from "../../../store/actions";
import swal from 'sweetalert'
import './Fa3.css';

const Fa3 = (props) => {
    const location = useLocation();

    console.log("jhdsjbhdfhdfjhbdfs5632637687",location)
    const { sendSecretKey, prevPath } = location.state;
    const [otp1, setOtp1] = useState();
    const [otp2, setOtp2] = useState();
    const [otp3, setOtp3] = useState();
    const [otp4, setOtp4] = useState();
    const [otp5, setOtp5] = useState();
    const [otp6, setOtp6] = useState();
    const [isLoading,setIsLoading]=useState(false); 
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
    const enableauthenticator = async () => {
        var axios = require('axios');
        var data = JSON.stringify({
            "email": `${props.email}`,
            "enableAuthenticator": 1,
            "secretkey": `${sendSecretKey}`,
        });

        var config = {
            method: 'post',
            // url: 'http://139.59.34.34:3000/api/enableAuthenticator',
            url:`${URL}enableAuthenticator`,
            headers: {
                'x-access-token': `${props.token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                props.saveUsrData(props.name, props.email, sendSecretKey, 1, props.referral_code);
                swal("Good Job", "You enabled 2FA successfully", "success");
            })
            .catch(function (error) {
                toast.error('Oh o! Some error occured, please try again some times. ', {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            });
    }

    // const logout = () => {
    //     console.log("Ldfhjdfbjhd",props); 
    //     props.saveToken("");
    //     props.saveRfToken("");
    //     props.saveIsOtpVerfy(false);
    //     navigate("/");
    //   };

    const verifyOTP = async () => {
        setIsLoading(true); 
        try {
            let options = {
                method: 'GET',
                url: 'https://google-authenticator.p.rapidapi.com/validate/',
                params: { code: `${secretOTP}`, secret: prevPath === "/login" ? props.secretkey : `${sendSecretKey}` },
                headers: {
                    'x-rapidapi-host': 'google-authenticator.p.rapidapi.com',
                    'x-rapidapi-key': '0ad38bcd6bmshf99e15a16cac8f8p1aaa36jsn1271dec98f89'
                }
            };

            await axios.request(options).then(function (response) {
                console.log(response.data);
                setIsLoading(false); 
                if (response.data === "True") {
                    props.saveIsOtpVerfy(true);
                    if (prevPath === "/login") {
                        swal("Well Done", "Your OTP matched successfully", "success");
                        navigate("/profile");
                    } else if (prevPath === "/fa/scan") {
                        enableauthenticator();
                        navigate("/profile");
                    }
                }else if (response.data === "False") {
                    setIsLoading(false); 
                    prevPath === "/login" ?
                        toast.error('Please enter OTP correctly or come again.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        }) :
                        toast.error('Please enter OTP correctly or go back and scan again.', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        // logout(); 
                }
                
            }).catch(function (error) {
                setIsLoading(false); 
                console.log(error);
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

                <p className="otp_sub">Enter the OTP from google authenticator</p>


                <div className="container otp_inp_div">
                    <input type="text" maxLength="1" id="otp1" className="otp_inp" onChange={otp1change} />
                    <input type="text" maxLength="1" id="otp2" className="otp_inp" onChange={otp2change} />
                    <input type="text" maxLength="1" id="otp3" className="otp_inp" onChange={otp3change} />
                    <input type="text" maxLength="1" id="otp4" className="otp_inp" onChange={otp4change} />
                    <input type="text" maxLength="1" id="otp5" className="otp_inp" onChange={otp5change} />
                    <input type="text" maxLength="1" id="otp5" className="otp_inp" onChange={otp6change} />
                </div>

                <div className='fa3_flex'>
                    {
                        prevPath === "/login" ?
                            (
                                isLoading ? 
                                <button  className="fa3_submit_btn">
                                       <PulseBubbleLoader  />
                                     </button> 
                                        :
                            <button onClick={verifyOTP} className="fa3_submit_btn">
                                Submit <ArrowRightIcon />
                            </button>
                            )
                            : (
                                <>
                                    <NavLink to={"/fa/scan"} className="fa3_prev">
                                        <ArrowLeftIcon /> Previous
                                    </NavLink>
                                    {isLoading ? 
                                <button  className="fa3_next">
                                       <PulseBubbleLoader  />
                                     </button> 
                                        :
                                        <button onClick={verifyOTP} className="fa3_next">
                                        Submit <ArrowRightIcon />
                                    </button>
                            }
                                    
                                </>

                            )
                    }

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
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrData: (name, email, secretkey, authenticator, referral_code) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
        saveIsOtpVerfy: (otpverify) => dispatch(updOtpVerify(otpverify)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Fa3);