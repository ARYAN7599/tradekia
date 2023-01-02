import React from "react";
import loader from '../../assets/images/loader.gif';

import './Loader.css';

function Loader() {
    return (
        <div className="loader_div">
            <img src={loader} alt="Loading" className="loader" />
        </div>
    );
}

export default Loader;