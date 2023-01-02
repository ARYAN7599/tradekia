import React from "react";
import dyncharts from '../../../assets/images/DynamicCharts.png';
import easystart from '../../../assets/images/EasyStart.png';
import mutlisupp from '../../../assets/images/MultiSupp.png';
import realanal from '../../../assets/images/RealAnalySup.png';
import seemtrad from '../../../assets/images/Seemtrading.png';
import ssecured from '../../../assets/images/Ssecured.png';
import topindic from '../../../assets/images/TopIndic.png';
import topnotch from '../../../assets/images/TopNotchExp.png';

import './WhyTrade.css';

function WhyTrade() {
    return (
        <div className="whytr_div" id="WhyTrk">
            <div class="encircle bounce animated">
                <div class="arrow">
                </div>
            </div>
            <h1 className="whytr_head">Why Trade with TradeKia ?</h1>

            <div class="card-container-flex">

                <div class="card-container">
                    <div class="card">
                        <a href="#">
                            <div class="card--display">
                                <img src={easystart} className="whytr_img" />
                                <h2>Easy to start</h2>
                            </div>
                            <div class="card--hover">
                                <h2>No tiresome process, just register effortlessly.</h2>


                            </div></a>

                    </div>
                </div>
                <div class="card-container">
                    <div class="card"> <a href="#">
                        <div class="card--display">
                            <img src={topnotch} className="whytr_img" />
                            <h2>Top-Notch Experience</h2>
                        </div>
                        <div class="card--hover">
                            <h2>Most pleasing trading experience.</h2>


                        </div></a>

                    </div>
                </div>
                <div class="card-container">
                    <div class="card"> <a href="#">
                        <div class="card--display">
                            <img src={mutlisupp} alt=" " className="whytr_img" />
                            <h2>Multiple-Coin Support</h2>
                        </div>
                        <div class="card--hover">
                            <h2>Now trade various cryptocurrencies with us.</h2>


                        </div></a>

                    </div>
                </div>

                <div class="card-container">
                    <div class="card"> <a href="#">
                        <div class="card--display">
                            <img src={ssecured} alt=" " className="whytr_img" />
                            <h2>Super Secured</h2>
                        </div>
                        <div class="card--hover">
                            <h2>Constant efforts are made to ensure high security.</h2>


                        </div></a>

                    </div>
                </div>
                <div class="card-container">
                    <div class="card"> <a href="#">
                        <div class="card--display">
                            <img src={seemtrad} alt=" " className="whytr_img" />
                            <h2>Seamless Trading</h2>
                        </div>
                        <div class="card--hover">
                            <h2>Buy/sell crypto carefreely.</h2>

                        </div></a>

                    </div>
                </div>
                <div class="card-container">
                    <div class="card"> <a href="#">
                        <div class="card--display">
                            <img src={dyncharts} alt=" " className="whytr_img" />
                            <h2>Dynamic Charts</h2>
                        </div>
                        <div class="card--hover">
                            <h2>Keep a sharp eye on dynamic prices.</h2>

                        </div></a>

                    </div>
                </div>

                <div class="card-container">
                    <div class="card">
                        <a href="#">
                            <div class="card--display">
                                <img src={topindic} alt=" " className="whytr_img" />
                                <h2>Top Indicators</h2>
                            </div>
                            <div class="card--hover">
                                <h2>Stay up to date with the price trend.</h2>

                            </div>
                        </a>

                    </div>
                </div>

                <div class="card-container">
                    <div class="card"> <a href="#">
                        <div class="card--display">
                            <img src={realanal} alt=" " className="whytr_img" />
                            <h2>Realtime Analytics & Support</h2>
                        </div>
                        <div class="card--hover">
                            <h2>Get in touch with our attentive customer support. </h2>

                        </div></a>

                    </div>
                </div>

            </div>




        </div>
    );
}

export default WhyTrade;