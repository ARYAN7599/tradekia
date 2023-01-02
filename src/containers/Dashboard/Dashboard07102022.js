import React from "react";
import { NavLink } from "react-router-dom";

import './Dashboard.css';

import tradelogo from '../../assets/images/create_acc.jpg';
import headerpic from '../../assets/images/slider1.png';
import WhyTrade from "../../components/Dashboard/WhyTade/WhyTrade";
import Footer from "../../components/Dashboard/Footer/Footer";

function Dashboard() {
    return (
        <div className="container-fluid container-xl bodsug">

            <div className="dshb_header_div">
                <img src={tradelogo} alt="TradeKiya" className="dshb_head_img" />

                <div className="dshb_head">
                {/* <NavLink to="/quickbuy" className="dshb_reg_btn">Market</NavLink> */}
                    <a href="#WhyTrk" className="dshb_why_lnk">Why TRK</a>
                    {/* <NavLink to="#" className="dshb_lgn_btn">Why TRK</NavLink> */}

                    <NavLink to="/createaccount" className="dshb_lgn_btn">
                        Register
                    </NavLink>

                    <NavLink to="/login" className="dshb_lgn_btn">
                        Login
                    </NavLink>
                </div>
            </div>

            <div className="dshb_flex1">
                <div>
                    <h1 className="dshb_title">TRADE KIA KYA !</h1>
                    <p className="dshb_text">
                        Why waiting ? Now it's time to start trading with Tradekia...
                    </p>
                    <NavLink to="/createaccount" className="dshb_reg_btn2">
                        <p>Register Now</p>
                    </NavLink>
                </div>

                <div>
                    <div>
                        <img  src={headerpic} alt="futurefinance" className="dshb_slider_img" />
                    </div>
                </div>
            </div>
           
           <WhyTrade />

           <Footer />
        </div>
    );
}

export default Dashboard;