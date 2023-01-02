import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import './Dashboard.css';
import tradelogo from '../../assets/images/create_acc.jpg';
import headerpic from '../../assets/images/slider13.png';
import WhyTrade from "../../components/Dashboard/WhyTade/WhyTrade";
import Footer from "../../components/Dashboard/Footer/Footer";
// import ScrollAnimation from "react-animate-on-scroll";
import headerpic1 from '../../assets/images/TopNotchExp.png';
import headerpic2 from '../../assets/images/DynamicCharts.png';
import headerpic32 from '../../assets/images/slider12.png';
import hexagonB from '../../assets/images/hexagonB.svg'
import immigration from '../../assets/images/immigration.png'
import moneybag from '../../assets/images/moneybag.png'
import trade12 from '../../assets/images/trade12.png'

import axios from 'axios';



function KycInfos() {
    const [navSize, setnavSize] = useState("21rem");
    const [navColor, setnavColor] = useState("transparent");
    const [positions, setPositions] = useState("relative");

    const [users, setUsers] = useState([]);

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#fff") : setnavColor("transparent");
        window.scrollY > 10 ? setnavSize("12rem") : setnavSize("21rem");
        window.scrollY > 10 ? setPositions("fixed") : setPositions("relative");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        const result = await axios.get("https://api.tradekia.com/api/getallsymbleWithLetestPrize");
        let f = result.data.data;
        console.log("llllllllllllllllllllll", f)
        setUsers(f)
    };

    const [stnum, setNumbers] = useState("-15");

    return (
        <>
            <section className="section12" style={{ height: '100%' }}>
                <div className="dshb_header_div" style={{ position: positions }}>
                    <NavLink to="/">
                        <img src={tradelogo} alt="TradeKiya" className="dshb_head_img" style={{ backgroundColor: navColor, maxWidth: navSize, transition: "all 1s" }} />
                    </NavLink>
                    <div className="dshb_head">
                        {/* <NavLink to="/quickbuy" className="dshb_reg_btn">Market</NavLink> */}
                        <a href="#WhyTrk" className="dshb_why_lnk">Why TRK</a>
                        <NavLink to="/KycInfos" className="dshb_lgn_btn">
                            FAQs
                        </NavLink>

                        {/* <NavLink to="#" className="dshb_lgn_btn">Why TRK</NavLink> */}

                        <NavLink to="/createaccount" className="dshb_lgn_btn">
                            Register
                        </NavLink>

                        <NavLink to="/login" className="dshb_lgn_btn">
                            Login
                        </NavLink>
                    </div>
                </div>
            </section>

            <section className="section12 sect2456" style={{ padding: '1rem 0 0', height: '100%' }}>

                <div className="container-fluid container-xl">


                    <div className="dshb_flex1 flcxs1" style={{ paddingBottom: '0' }}>
                        <div>
                        <h3>How to signup for an account? </h3>
                        <ul>
                            <li>In order to enjoy our services you have to follow these steps:</li>
                            <li>Firstly, you have to download TradeKIA from Play Store and click on register now to create an account.</li>
                            <li>After that, you have to give your personal details like your name, and email address, create a password (your password should contain one upper case, lower case, special letter, or numeric), and agree to our terms and conditions. You will receive an OTP at your given email address enter the OTP and Submit it.</li>
                            <li>Now you have successfully created your account on TradeKIA.</li>
                        </ul>
                        </div>
                        
                        <div>
                        <h3>How to do KYC?  </h3>
                        <ul>
                        <li>After successful registration you have to log into your account by entering your email id and password and enter OTP again you received on your registered email.</li>
                        <li>On the home page click on the setting option located on the left side of your screen. Now go to add KYC details to register.</li>
                        <li>Before trading, you have to complete your KYC. Your basic information (your name, DOB, address, area pin code, country, region), and your document (passport, ID card, Driver’s license, Pancard). After entering your document you have to upload a selfie.</li>
                        <li>Now click on submit button to submit your details for KYC.</li>
                        </ul>
                        </div>

                        <div>
                        <h3>How to receive coins on TradeKIA?  </h3>
                        <ul>
                        <li>Go to wallets, and click on USDT(TRC20)/FUFI option.</li>
                        <li>Choose the deposit option if you want to receive coins.</li>
                        <li>You’ll see a QR code on your screen, now you can scan that code or copy the address written at the bottom of the QR code.</li>
                        </ul>
                        </div>

                        <div>
                        <h3>How to Send Coin to other exchanges?  </h3>
                        <ul>
                        <li>Go to wallets, and click on the Coin.</li>
                        <li>Click withdraw if you want to send coins.</li>
                        <li>You can send via a crypto network or email If you are it’s up to you. Enter the address or Gmail and the amount you want to send.</li>
                        </ul>
                        </div>


                        <div>
                        <h3>How to place a buying and selling order?  </h3>
                        <ul>
                        <li>From your home screen go to the market option.</li>
                        <li>Click on the coin you want to Trade.</li>
                        <li>On the right side of your screen, you’ll see BUY and SELL options.</li>
                        <li>According to the Order book on the left side, you can place your buy or sell order, according to the market price and limit price.</li>
                        </ul>
                        </div>


                        <div>
                        <h3>What is a limit order?  </h3>
                        <ul>
                        <li>It allows you to buy or sell at the price of your choice (when a market comes at that particular price). For example, if you place a buying limit at 80 rs. you can buy it from the exchange for 80 rs. Or lower, the same goes for selling the stock if you set a selling limit you can sell your stock at the particular price of your choice or higher.  However, there is a high chance that your order may not get fulfilled partially or completely depending on the availability of the counter order at the price you specified.</li>
                        </ul>
                        </div>

                        <div>
                        <h3>What is a market order?  </h3>
                        <ul>
                        <li>It allows you to buy or sell your stock at the best price available in the market instantly. Suppose you put a buying market order, you want to buy a specified quantity of stock from the exchange at any price available. On the other hand, when you place a selling market order you can sell your stock at any price buyers are willing to pay. The advantage of a market order is that it executes your trade instantly if there are counterparties available.</li>
                        </ul>
                        </div>
                    </div>
                </div>

            </section>







            <div class="cover"></div>











            <Footer />

        </>
    );
}

export default KycInfos;