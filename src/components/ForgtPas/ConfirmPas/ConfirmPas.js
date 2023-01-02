import React, { useState} from "react";
import { NavLink } from "react-router-dom";
import { URL } from "../../../helpers/global";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import swal from 'sweetalert'
import 'react-toastify/dist/ReactToastify.css';

import create_img from '../../../assets/images/create_acc.jpg';

import './Confirm.css';

function ConfirmPas() {
    const navigate = useNavigate();
    const location = useLocation();


    const [loginAct, setLoginAct] = useState(false);
    const [passwVis, setPasswVis] = useState(false);
    const [cnnfpasVis, setCnfPasVis] = useState(false);

    const [passw, setPassw] = useState("password");
    const [cnnfpas, setCnfPas] = useState("password");


    const [password, setPassword] = useState("");
    const [cnfpPasw, setCnfpPasw] = useState("");

    const handleCheckChange = (event) => {
        let passwordRagex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;


        if (password === "" || cnfpPasw === "") {
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
        }else if (!passwordRagex.test(password)) {
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

    const handlePasswChange = (event) => {
        setPassword(event.target.value);
    }

    const handleConfPasswChange = (event) => {
        setCnfpPasw(event.target.value);
    }

    const changePass = async () => {
        let axios = require('axios');
        let data = JSON.stringify({
            "password": `${password}`,
            "email": location.state.email
        });

        let config = {
            method: 'post',
            url: `${URL}forgotPassword`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (res) {
                if (res.data.status) {
                    swal("Well Done", "Congrats! Your Password Changed Successfully", "success").then(()=>{
                        navigate("/login");
                    });
                }
               
            })
            .catch(function (error) {
                console.log(error);
            });

    }



    return (
        <div className="container cnfp_main_div">

            <div className="cnfp_img_div">
                <img src={create_img} alt="create account" />
            </div>

            <div className="container cnfp_div">
                <h1 style={{ marginBottom: '0px' }}><span style={{ color: '#FEB101' }}>Reset </span>Password</h1>

                <p className="cnfp_sub">Set new Password for your account</p>

                <div className="cnfp_inp_div">
                    <form className="cnfp_inppp">
                        <input
                            type={passw}
                            placeholder="Password"
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
                            placeholder="Reset Password"
                            className="cnfp_inp"
                            value={cnfpPasw}
                            onChange={handleConfPasswChange} />
                        {
                            cnnfpasVis ? <i className="fa fa-eye" onClick={viewCnfPassw}></i> : <i className="fa fa-eye-slash" onClick={viewCnfPassw}></i>
                        }
                    </form>
                </div>
                {
                    (password ==="" || cnfpPasw ==="") ?
                    <p className="create_acc_lgnbtnI">Confirm Reset</p>:
                        <button className="cnfp_acc_btn" onClick={(event) => handleCheckChange(event)}>Confirm Reset</button>
                }

                <NavLink to="/login" className="cnfp_acc_lgnbtnA">
                    Back to Login
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

export default ConfirmPas;