import React, { useState, useEffect, Component } from "react";
import { NavLink } from "react-router-dom";
import './Dashboard.css';
import tradelogo from '../../assets/images/create_acc.jpg';
import headerpic from '../../assets/images/slider13.png';
import WhyTrade from "../../components/Dashboard/WhyTade/WhyTrade";
import Footer from "../../components/Dashboard/Footer/Footer";

import headerpic1 from '../../assets/images/TopNotchExp.png';
import headerpic2 from '../../assets/images/DynamicCharts.png';
import headerpic32 from '../../assets/images/slider12.png';
import hexagonB from '../../assets/images/hexagonB.svg'
import immigration from '../../assets/images/immigration.png'
import moneybag from '../../assets/images/moneybag.png'
import trade12 from '../../assets/images/trade12.png'
import { Carousel } from '3d-react-carousal';
import axios from 'axios';
import Image1 from "../../assets/images/slider1.png";
import Image2 from "../../assets/images/slider121.png";
import Image3 from "../../assets/images/slider122.png";
import './slider.css'


function Dashboard() {
    const [navSize, setnavSize] = useState("21rem");
    const [navColor, setnavColor] = useState("transparent");
    const [positions, setPositions] = useState("relative");

    const [curPrice, setCurPrice] = useState('');
    const [noCoins, setNoCoins] = useState('0');
    const [finalcurPrice, setFinalCurPrice] = useState('');
    const [reset, setReset] = useState('0');
    const [users, setUsers] = useState([]);



    const updateCoins = (e) => {
        setNoCoins(e.target.value)
    }

    const updatePrice = (e) => {
        setCurPrice(e.target.value)
    }

    const calculatePrice = (e) => {
        e.preventDefault()
        let finalPrice = curPrice * noCoins
        setFinalCurPrice(finalPrice)
    }

    const resetPrice = (e) => {
        e.preventDefault()
        setNoCoins("0");
        setFinalCurPrice(reset);
    }

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


    //I know this bit doesn't make sense (Yet) I'm trying to figure out first the first bit

    const loadUsers = async (e) => {
        const result = await axios.get("https://api.tradekia.com/api/getallsymbleWithLetestPrize");
        let f = result.data.data;

        console.log(f)
        const y = f.hInrprize
        //console.log("xxxxxxxxxxxxxxxxxxx",y)
        setUsers(f)
        setCurPrice(y);
        // if(x.length > 0){
        //     const quote = (
        //        <span key={x[0].id}>
        //           <span>{x[0].hInrprize}</span>
        //        </span>);
        //    setCurPrice(quote);
        // }
        //  console.log("llllllllllllllllllllll", x)
        //let w = [x0, x1]
        // let y = (users.map((k) => k.symble))  
        // if (y == "FUFI/INR" ) {
        //     setCurPrice(x)
        //     console.log("ffffffffffff",x) 
        // }else{
        //     console.log("efgergergergerg") 
        // }
    };



    const [stnum, setNumbers] = useState("-15");


    let slides = [
        <div className="bidBgimg">
            <span><img src={Image1} /></span>
        </div>,
        <div className="bidBgimg">
            <span><img src={Image2} /></span>
        </div>,
        <div className="bidBgimg">
            <span><img src={Image3} /></span>
        </div>
    ];


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


                    <div className="dshb_flex1" style={{ paddingBottom: '0' }}>

                        <div className="animTxta">
                            <h2 className="textbld" data-text="Trade Kia Kya !">Trade Kia Kya !</h2>
                            <p className="dshb_text">
                                Why waiting ? Now it's time to start trading with Tradekia...
                            </p>
                            <NavLink to="/createaccount" className="dshb_reg_btn2">
                                <p>Register Now</p>
                            </NavLink>
                        </div>

                        <div>
                            <div className="face loadContainer faceBr">

                                <img src={headerpic} alt="futurefinance" className="dshb_slider_img" style={{ position: 'relative', left: '4%' }} />
                                <div className="faceBr-fr">
                                    <div className="fr1"><a href="https://play.google.com/store/apps/details?id=com.finance.tradekiya" target="_blank">acwcwecw</a></div>
                                    <div className="fr2"><a href="https://drive.google.com/file/d/1GX5v9BxS41lrdlEOXMjKCiDSId4DILdg/view?usp=sharing" target="_blank" >33333333333</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>









            <section className="section12" style={{ padding: '1rem 0 5rem', height: '100%' }}>
                <div className="container-xl">
                    <h1 class="whytr_head">Market</h1>
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-12">
                            <table id="example3">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Coin</th>

                                        <th>Last Price</th>

                                        <th>24h Volume</th>
                                        <th>24h Change</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.slice(0).map((user, index) => (
                                        <tr key={index}>
                                            <td data-column="S.No">{index + 1}</td>

                                            <td data-column="Coin"><img className="bigOnej" src={user.symble_url} />
                                                {user.symble}</td>
                                            <td data-column="Last Price">
                                                {user.hInrprize}
                                            </td>

                                            <td data-column="24h Volume">
                                                {(Math.round(user.valume24h * 100) / 100).toFixed(2)}
                                            </td>
                                            <td data-column="24h Change">
                                                {user.change24h > 0 ? <h6 className="h6Nombgd" style={{ backgroundColor: 'green' }}>
                                                    {Math.round(user.change24h).toFixed(2)} <span>%</span></h6> :
                                                    <h6 className="h6Nombgd" style={{ backgroundColor: 'red' }}>
                                                        {Math.round(user.change24h).toFixed(2)} <span>%</span></h6>}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            <section className="section12">
                <div className="container-xl">

                    <div class="row">
                        <div class="order-2 col-xs-12 col-sm-12 col-md-6 order-md-1">

                        </div>
                        <div class="order-2 col-xs-12 col-sm-12 col-md-6 order-md-1">
                            <div className="calculaterSection">

                                <div className="disTabslk">
                                    <div className="disTabslk1">
                                        <select onChange={updatePrice}>
                                            {users.map((k) => (
                                                <option>{k.hInrprize}</option>
                                            )
                                            )}

                                        </select>
                                        {/* <input type="text" value={curPrice} onChange={updatePrice} readOnly /> */}
                                    </div>
                                    <div className="disTabslk1">
                                        <input type="text"
                                            value={noCoins}
                                            onChange={updateCoins}
                                            placeholder="enter no of coins"
                                        />
                                    </div>
                                </div>
                                <div className="inResult">
                                    {(Math.round(finalcurPrice * 100) / 100).toFixed(2)}
                                </div>
                                <button className="dshb_lgn_btn btncv" onClick={calculatePrice}>calculatePrice</button>
                                <button className="dshb_lgn_btn btncv" onClick={resetPrice}>Reset</button>

                            </div>



                        </div>
                    </div>
                </div>

            </section>

            <section className="section12">
                <div className="container-xl">
                    <h1 class="whytr_head" style={{ textAlign: 'left' }}>Build Your Crypto Portfolio</h1>
                    <h6 style={{ fontWeight: '600', fontSize: '20px', textAlign: 'left' }}>Start Your first Trade with These easy steps</h6>
                    <div className="row">
                        <div className="order-2 col-xs-12 col-sm-12 col-md-7 order-md-1 bidfYuio">

                            <ul className="acountRasf">
                                <li className="hexagonh">
                                    <img src={moneybag} style={{ padding: '1rem 2rem 1rem', maxWidth: '100%', width: '10rem', margin: '0 auto' }} />
                                </li>
                                <li>
                                    <h3 className="bigBy">Fund your Account</h3>
                                    <span>Add funds to your account for trading.</span>
                                </li>
                            </ul>



                            <ul className="acountRasf">
                                <li className="hexagonh">
                                    <img src={immigration} style={{ padding: '1rem 2rem 1rem', maxWidth: '100%', width: '10rem', margin: '0 auto' }} />

                                </li>
                                <li><h3 className="bigBy">Verify your Identity</h3>
                                    <span>Finish your identification process.</span>
                                </li>
                            </ul>



                            <ul className="acountRasf">
                                <li className="hexagonh">
                                    <img src={trade12} style={{ padding: '1rem 2rem 1rem', maxWidth: '100%', width: '10rem', margin: '0 auto' }} />

                                </li>
                                <li><h3 className="bigBy">Start Trading</h3>
                                    <span>Yay! You are eligible for trading.</span>
                                </li>
                            </ul>

                            <div className="buTonsdfg">
                                <NavLink to="/createaccount" className="dshb_lgnbtn" target="_blank">
                                    <button className="button-buTonsdfg">
                                        Get Started
                                    </button>
                                </NavLink>
                            </div>
                        </div>

                        <div className="order-1 col-xs-12 col-sm-12 col-md-5 order-md-2">
                            <Carousel slides={slides} autoplay={true} interval={4000} />
                            {/* <img src={headerpic32} className="headerpic32" style={{ display: 'flex',justifyContent: 'left', alignItems: 'end'}} />
                           */}
                        </div>
                    </div>
                </div>
            </section>

            <section className="section12">
                <div className="container-xl">
                    <WhyTrade />
                </div>
            </section>


            <div class="cover"></div>











            <Footer />

        </>
    );
}

export default Dashboard;