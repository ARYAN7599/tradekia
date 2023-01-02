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
            <h1 className="whytr_head">Why Trade with TradeKia ?</h1>

            <div className="whytr_flex">
                <div className="whytr_box">
                    <img src={easystart} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Easy to start</h3>
                </div>

                <div className="whytr_box">
                    <img src={topnotch} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Top Notch Experience</h3>
                </div>

                <div className="whytr_box">
                    <img src={mutlisupp} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Multiple - Coin Support</h3>
                </div>

                <div className="whytr_box">
                    <img src={ssecured} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Super Secured</h3>
                </div>

                <div className="whytr_box">
                    <img src={seemtrad} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Seemless Trading</h3>
                </div>

                <div className="whytr_box">
                    <img src={dyncharts} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Dynamic Charts</h3>
                </div>

                <div className="whytr_box">
                    <img src={topindic} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Top Indicators</h3>
                </div>

                <div className="whytr_box">
                    <img src={realanal} alt=" " className="whytr_img"/>
                    <h3 className="whytr_text">Realtime Analytics & Support</h3>
                </div>
            </div>
        </div>
    );
}

export default WhyTrade;