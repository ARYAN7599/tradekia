import React from "react";

import './TrHeader.css';

function TrHeader() {

    return (
        <div className="trh_div">
            <div>
                <img />

                <div>
                    <p>BTC-USDT</p>
                    <p>Bitcoin</p>
                </div>
            </div>

            <div>
                <p>Last Price</p>
                <p>123.45</p>
            </div>

            <div>
                <p>24h Change</p>
                <p>1.65(0%)</p>
            </div>

            <div>
                <p>24h High</p>
                <p>5598.52</p>
            </div>

            <div>
                <p>24h Low</p>
                <p>58150</p>
            </div>

            <div>
                <p>24h Volume</p>
                <p>123456 USDT</p>
            </div>
        </div>
    );
}

export default TrHeader;