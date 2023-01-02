import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { URL } from "../../helpers/global";
import axios from "axios";
import Swal from 'sweetalert2';
import create_img from '../../assets/images/create_acc.jpg';
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updToken, updRfToken, updIP,updUserData } from "../../store/actions";
const biri = require('biri');
function CrAccOtp(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const [otp1, setOtp1] = useState("");
    const [otp2, setOtp2] = useState("");
    const [otp3, setOtp3] = useState("");
    const [otp4, setOtp4] = useState("");
    const [otp5, setOtp5] = useState("");
    const [otp6, setOtp6] = useState("");

    const getData = async () => {
        const res = await axios.get('https://geolocation-db.com/json/')
        const ip = res.data.IPv4;
        const uniqueId = await biri();
        props.saveUsrIP(ip, uniqueId);
    }

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

    const verifyOtp = () => {
        const otp = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
        const data = {
            "otp": otp,
            "email": location.state.email,
            // "password": location.state.pas,
        }

        axios.post(`${URL}verifyOTP`, data, {
            headers: {
                'x-access-token': location.state.token
            }
        }).then(res => {
            console.log(res)
            if (res.data.status) {
                props.saveToken(location.state.token);
                props.saveRfToken(location.state.reftokn);
                props.saveUsrData(null, 0, "",res.data.data.insertId);
                Swal.fire(
                    'Congratulations',
                    'Registration Successfull ! Please Login to Continue.',
                    'success'
                ).then((result) => {
                  if (result.isConfirmed) {
                    navigate('/login');  
                    getData();
                }
            });
               
               
                
            } else {
                toast.error("Please enter OTP correctly or refresh again", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                })
            }
        }).catch(err => console.log(err),
            toast.error('Please enter OTP correctly or refresh again', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            }));
    }

    useEffect(() => {
        let container = document.getElementsByClassName("otp_inp_div")[0];
        container.onkeyup = function (e) {
            let target = e.srcElement || e.target;
            let maxiLength = parseInt(target.attributes["maxLength"].value, 10);
            let myLength = target.value.length;
            if (myLength >= maxiLength) {
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
    }, [])

    return (
        <div className="container otp_main_div">

            <div className="otp_img_div">
                <img src={create_img} alt="login" />
            </div>

            <div className="container otp_div">
                <h1 style={{ marginBottom: '0px' }}><span style={{ color: '#FEB101' }}>Verify </span>OTP</h1>

                <p className="otp_sub">Enter the OTP send to your Email</p>


                <div className="container otp_inp_div">
                    <input type="text" maxLength="1" id="otp1" className="otp_inp" value={otp1} onChange={otp1change} />
                    <input type="text" maxLength="1" id="otp2" className="otp_inp" value={otp2} onChange={otp2change} />
                    <input type="text" maxLength="1" id="otp3" className="otp_inp" value={otp3} onChange={otp3change} />
                    <input type="text" maxLength="1" id="otp4" className="otp_inp" value={otp4} onChange={otp4change} />
                    <input type="text" maxLength="1" id="otp5" className="otp_inp" value={otp5} onChange={otp5change} />
                    <input type="text" maxLength="1" id="otp5" className="otp_inp" value={otp6} onChange={otp6change} />
                </div>

                {
                    (otp1 === "" || otp2 === "" || otp3 === "" || otp4 === "" || otp5 === "" || otp6 === "") ?
                        <button className="otp_acc_btn grey_submit">Submit</button> :
                        <button className="otp_acc_btn" onClick={verifyOtp}>Submit</button>
                }

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
        token: state.token,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
        saveUsrData: (secretkey, authenticator, referral_code,id) => dispatch(updUserData( secretkey, authenticator, referral_code,id)),
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(CrAccOtp);