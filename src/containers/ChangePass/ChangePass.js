import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { URL } from "../../helpers/global";
import {useNavigate } from "react-router-dom";
import { PulseBubbleLoader } from 'react-loaders-kit';
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert'
import { connect } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';

import create_img from '../../assets/images/create_acc.jpg';

import '../../components/ForgtPas/ConfirmPas/Confirm.css';

const ChangePass = (props) => {
    const navigate = useNavigate();
    const [loginAct, setLoginAct] = useState(false);
    const [passwVis, setPasswVis] = useState(false);
    const [cnnfpasVis, setCnfPasVis] = useState(false);
    const [oldpassVis, setOldPassVis] = useState(false);
    const [passw, setPassw] = useState("password");
    const [cnnfpas, setCnfPas] = useState("password");
    const [oldpassw, setOldPass] = useState("password");
    const [password, setPassword] = useState("");
    const [cnfpPasw, setCnfpPasw] = useState("");
    const [oldPass, setOldPasw] = useState("");
    const [isLoading,setIsLoading]=useState(false); 
    const handleCheckChange = (event) => {
        let passwordRagex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


        if (password === "" || cnfpPasw === "" || oldPass === "") {
            toast.warn('Please! fill the details first.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        else if (password !== cnfpPasw) {
            toast.warn("Your confirm password didn't match", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
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
            return false;
        }

        else {
            setLoginAct(true);
            changePass()
        }


    }

    const viewPassw = () => {
        setPasswVis(!passwVis);

        if (passw == "password") {
            setPassw("text");
        }
        else {
            setPassw("password");
        }
    }

    const viewCnfPassw = () => {
        setCnfPasVis(!cnnfpasVis);

        if (cnnfpas == "password") {
            setCnfPas("text");
        }
        else {
            setCnfPas("password");
        }
    }

    const viewOldPass = () => {
        setOldPassVis(!oldpassVis);

        if (oldpassw == "password") {
            setOldPass("text");
        }
        else {
            setOldPass("password");
        }
    }

    const handlePasswChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfPasswChange = (event) => {
        setCnfpPasw(event.target.value);
    }

    const handleOldPasswChange = (event) => {
        setOldPasw(event.target.value);
    }

    const changePass = async () => {
        setIsLoading(true); 
        let axios = require('axios');
        let data = JSON.stringify({
            "password": `${password}`,
            "oldPassword": `${oldPass}`,
            "email": `${props.email}`,
        });

        let config = {
            method: 'post',
            url: `${URL}changePassword`,
            headers: {
                'x-access-token': `${props.token}`,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config).then(function (res) {
            setIsLoading(false); 
                if (res.data.status) {
                    swal("Well Done", "Your Password Changed Successfully", "success").then(() => {
                        navigate("/profile");
                    });
                } else{

                    swal("OOP's", "Look like your old password didn't matched, please try again.", "error");
                    setPassword("");
                    setCnfpPasw("");
                    setOldPasw("");
                }

            }).catch(function (error) {
                setIsLoading(false);
                console.log(error);
            });

    }



    return (
        <div className="container cnfp_main_div">

            <div className="cnfp_img_div">
                {/* <img src={create_img} alt="create account" /> */}
            </div>

            <div className="container cnfp_div">
                <h1 style={{ marginBottom: '0px' }}><span style={{ color: '#FEB101' }}>Reset </span>Password</h1>

                <p className="cnfp_sub">Set new Password for your account</p>

                <div className="cnfp_inp_div">
                    <form className="cnfp_inppp">
                        <input
                            type={oldpassw}
                            placeholder="Old Password"
                            className="cnfp_inp"
                            value={oldPass}
                            onChange={handleOldPasswChange} />
                        {
                            oldpassVis ? <i className="fa fa-eye" onClick={viewOldPass}></i> : <i className="fa fa-eye-slash" onClick={viewOldPass}></i>
                        }
                    </form>
                </div>

                <div className="cnfp_inp_div">
                    <form className="cnfp_inppp">
                        <input
                            type={passw}
                            placeholder="New Password"
                            className="cnfp_inp"
                            value={password}
                            onChange={handlePasswChange} />
                        {
                            passwVis ? <i className="fa fa-eye" onClick={viewPassw}></i> : <i className="fa fa-eye-slash" onClick={viewPassw}></i>
                        }
                    </form>
                </div>

                <div className="cnfp_inp_div">
                    <form className="cnfp_inppp">
                        <input
                            type={cnnfpas}
                            placeholder="Confirm New Password"
                            className="cnfp_inp"
                            value={cnfpPasw}
                            onChange={handleConfPasswChange} />
                        {
                            cnnfpasVis ? <i className="fa fa-eye" onClick={viewCnfPassw}></i> : <i className="fa fa-eye-slash" onClick={viewCnfPassw}></i>
                        }
                    </form>
                </div>
                {
                    (password === "" || cnfpPasw === "") ?
                        <p className="create_acc_lgnbtnI">Confirm Reset</p> :
                      isLoading ? 
                        <button  className="cnfp_acc_btn" >
                               <PulseBubbleLoader  />
                             </button> 
                                :
                        <button className="cnfp_acc_btn" onClick={(event) => handleCheckChange(event)}>Confirm Reset</button>
                }

                {/* <NavLink to="/login" className="cnfp_acc_lgnbtnA">
                    Back to Login
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
        email: state.email,
        token: state.token,

    });
}

export default connect(mapStateToProps,null)(ChangePass);