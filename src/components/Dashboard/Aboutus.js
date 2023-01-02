import React, { useEffect, useState } from "react";
import tradelogo from '../../components/Dashboard/tradekiya.png';
import { NavLink } from "react-router-dom";

import Footer from "../../components/Dashboard/Footer/Footer";
import tradekia024 from '../../assets/images/AboutUs.png';
import './Aboutus.css'

function Aboutus() {
    const [navSize, setnavSize] = useState("9rem");
    const [navColor, setnavColor] = useState("transparent");
    const [positions, setPositions] = useState("relative");

    const listenScrollEvent = () => {
        window.scrollY > 10 ? setnavColor("#fff") : setnavColor("transparent");
        window.scrollY > 10 ? setnavSize("6rem") : setnavSize("9rem");
        window.scrollY > 10 ? setPositions("fixed") : setPositions("relative");
    };
    useEffect(() => {
        window.addEventListener("scroll", listenScrollEvent);
        return () => {
            window.removeEventListener("scroll", listenScrollEvent);
        };
    }, []);

    return (
        <>

            <section className="section13" style={{ height: '100%' }}>
                <div className="dshb_header_div1" style={{ position: positions }}>
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


            <div className="container-fluid container-xl bodsug">


                <div className="bidsfair">

                    <div class="flexbox" style={{ marginBottom: '3rem' }}>



                        <div class="rightside">
                            <p>
                                <h5><span>About Us</span></h5>
                            </p>

                            <p>
                                TradeKIA hosted by Future’s Finance is an Indian native discount derivative exchange with a wide variety of advanced features. Our extraordinary features make us one of the best cryptocurrency exchanges.
                            </p>

                            <p>
                                We understand your trading needs and we’re presenting you strategies that’ll make trading convenient and smooth. We pride ourselves on our efficient ways of making trading a pleasant & tranquil experience for our users.
                            </p>

                            <p>
                                Our goal is to be your exchange portal to the cryptocurrency planet! In the future, cryptocurrency will eventually replace physical or hard money. We aim to be a part of your journey and make it as easy and understandable as possible. We want to increase the freedom of money exchange globally in the simplest way possible.

                            </p>

                        </div>

                        <div class="leftside">

                            <div className="bigimg">
                                <img src={tradekia024} />
                            </div>

                        </div>
                    </div>



                    <div class="flexbox" style={{ marginBottom: '3rem' }}>
                        <div class="rightside">
                            <h1>Our defining features</h1>
                            <ul>

                                <li>Zero fees on loss side trade</li>
                                <li>Minimum transaction fees</li>
                                <li>Affiliate income</li>
                                <li>Trade with INR pairs easily</li>
                                <li>Quick buy</li>
                                <li>Premium features with an exclusive package</li>
                                <li>Multi coin supports</li>
                                <li>Dynamic trading chart</li>

                            </ul>
                        </div>
                    </div>
                </div>

            </div>
            <Footer />
        </>
    )


}

export default Aboutus;