import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

import create_img from '../../assets/images/create_acc.jpg';
import { URL } from '../../helpers/global';

import { connect } from 'react-redux';
import { updUserData } from "../../store/actions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './CreatAcc.css';
function ReferralRegistration(props) {
    const navigate = useNavigate();
    const [signupAct, setSignupAct] = useState(false);
    const [passwVis, setPasswVis] = useState(false);
    const [cnnfpasVis, setCnfPasVis] = useState(false);
    const [inputCheck, setInputCheck] = useState(false);

    const [passw, setPassw] = useState("password");
    const [cnnfpas, setCnfPas] = useState("password");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cnfpPasw, setCnfpPasw] = useState("");
    // Get the referralId param from the URL.
    const { id } = useParams();
    const [refCode, setRefCode] = useState(id);

    const handleCheckChange = (event) => {

        let passwordRagex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
        let emailRagex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (name === "" || email === "" || password === "" || cnfpPasw === "") {
            toast.warn('Please! fill the details first.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSignupAct(false);
            setInputCheck(false);
        }

        else if (!passwordRagex.test(password)) {
            toast.warn('Password should contain atleast one number, one special character, one uppercase and lowercase, and atleast 8 characters in password.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSignupAct(false);
            setInputCheck(false);
            return false;
        }

        else if (!emailRagex.test(email)) {
            toast.warn('Email address must begin with alpha-numeric characters, upper or lowercase allowed,should have @ sign and enter valid domain address', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            setSignupAct(false);
            setInputCheck(false);
            return false;
        }

        else {
            if (event.target.checked === true) {
                setSignupAct(true);
                setInputCheck(true)

            } else {
                setSignupAct(false);
                setInputCheck(false);
            }

        }
    }

    // console.log(name);



    useEffect(() => {

        const validation = () => {

            let passwordRagex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
            let emailRagex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (name === "" || email === "" || password === "" || cnfpPasw === "") {
                setSignupAct(false);
                setInputCheck(false);

            }

            else if (!passwordRagex.test(password)) {
                setSignupAct(false);
                setInputCheck(false);
                return false;
            }

            else if (!emailRagex.test(email)) {
                setSignupAct(false);
                setInputCheck(false);
                return false;
            }

        }

        setTimeout(validation, 2000);

    }, [name, email, password, cnfpPasw])


    const viewPassw = () => {
        setPasswVis(!passwVis);

        if (passw === "password") {
            setPassw("text");
        }
        else {
            setPassw("password");
        }
    }

    const viewCnfPassw = () => {
        setCnfPasVis(!cnnfpasVis);

        if (cnnfpas === "password") {
            setCnfPas("text");
        }
        else {
            setCnfPas("password");
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswChange = (event) => {
        setPassword(event.target.value);
    }

    const handleRefCodeChange = (event) => {
        setRefCode(event.target.value);
    }

    const handleConfPasswChange = (event) => {
        setCnfpPasw(event.target.value);
    }


    const signUpHandler = () => {
        if (name === "" || email === "" || password === "" || cnfpPasw === "") {
            toast.info('All Fields are required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            if (password === cnfpPasw) {

                const data = {
                    "name": name,
                    "email": email,
                    "password": password,
                    "referrer": refCode
                }

                axios.post(`${URL}register`, data)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.status) {
                            props.saveUsrData(name, email);
                            navigate('/ReferralRegistrationount/otp', { state: { email: email, pas: password, token: res.data.token, reftokn: res.data.refreshToken } });
                        } else {
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

                    }).catch(err => console.log(err));
            } else {
                toast.error("Password doesn't match", {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }

    }



    return (
        <div className="container create_main_div">

            <div className="creat_img_div">
                <img src={create_img} alt="create account" />
            </div>

            <div className="container create_div">
                <h1 style={{ marginTop: 0, marginBottom: 15 }}><span style={{ color: '#FEB101' }}>Create an </span>Account</h1>

                <div className="c_inp_div">
                    <input
                        type="text"
                        placeholder="Enter Your Name"
                        className="c_inp"
                        value={name}
                        onChange={handleNameChange}
                        required />
                </div>

                <div className="c_inp_div">
                    <input
                        type="email"
                        placeholder="Enter Your Email"
                        className="c_inp"
                        value={email}
                        onChange={handleEmailChange}
                        required />
                </div>

                <div className="c_inp_div">
                    <form className="c_inppp">
                        <input
                            type={passw}
                            placeholder="Password"
                            className="cr_inp"
                            value={password}
                            onChange={handlePasswChange} />
                        {
                            passwVis ? <i className="fa fa-eye" onClick={viewPassw}></i> : <i className="fa fa-eye-slash" onClick={viewPassw}></i>
                        }
                    </form>
                </div>



                <div className="c_inp_div">
                    <form className="c_inppp">
                        <input
                            type={cnnfpas}
                            placeholder="Confirm Password"
                            className="cr_inp"
                            value={cnfpPasw}
                            onChange={handleConfPasswChange} />
                        {
                            cnnfpasVis ? <i className="fa fa-eye" onClick={viewCnfPassw}></i> : <i className="fa fa-eye-slash" onClick={viewCnfPassw}></i>
                        }
                    </form>
                </div>

                <div className="c_inp_div">
                    <input
                        type="text"
                        placeholder="Referral Code(if any)"
                        className="c_inp"
                        value={refCode}
                        onChange={handleRefCodeChange}
                    />
                </div>

                {
                    signupAct ?
                        <button className="create_acc_btn" onClick={signUpHandler}>Create Account</button> :

                        <p className="create_acc_lgnbtnI">Create Account</p>
                }



                <div className="termsDiv">
                    <input type="checkbox" id="terms" name="Terms" value="true" checked={inputCheck} onChange={(event) => handleCheckChange(event)} />
                    <label htmlFor="terms">I agree to the Terms and Conditions</label>
                </div>


                <p style={{ color: '#949494' }}>Already Have an Account</p>



                <NavLink to="/login" className="create_acc_lgnbtnA">
                    Login
                </NavLink>


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


const mapDispatchToProps = (dispatch) => {
    return ({
        saveUsrData: (name, email) => dispatch(updUserData(name, email))
    })
}


export default connect(null, mapDispatchToProps)(ReferralRegistration);