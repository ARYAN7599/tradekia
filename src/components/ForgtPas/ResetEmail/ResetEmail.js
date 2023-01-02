import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import create_img from '../../../assets/images/create_acc.jpg';
import './ResetEmail.css';

function ResetEmail() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }



    return (
        <div className="container res_main_div">

            <div className="res_img_div">
                <img src={create_img} alt="login" />
            </div>

            <div className="container res_div">
                <h1 style={{ marginBottom: '0px' }}><span style={{ color: '#FEB101' }}>Reset </span>Password</h1>

                <p className="res_sub">Enter your registered Email to get OTP.</p>

                <div className="r_inp_div">
                    <input type="email"
                        placeholder="Enter Your Email"
                        className="r_inp"
                        value={email}
                        onChange={handleEmailChange}
                        required />
                </div>

                {
                    (email !== "") ?
                        <NavLink to="/resetotp" state={{ email: email }} className="res_acc_btn">
                            Reset Password
                        </NavLink> 
                        :
                        <p className="create_acc_lgnbtnI">Reset Password</p>
                     }


                <NavLink to="/login" className="res_acc_lgnbtnA">
                    Back to Login
                </NavLink>

            </div>
        </div>
    );
}

export default ResetEmail;