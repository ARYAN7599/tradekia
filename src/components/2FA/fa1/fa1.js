import React from 'react';
import { NavLink } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

import gplay from '../../../assets/images/gplay.svg';
import aplleplay from '../../../assets/images/apple.svg';

import './fa1.css';

function Fa1() {

    return (
        <div className="fa1_maindiv">

            <h1 style={{ marginBottom: 5 , textAlign : 'center' }}>Google Authenticator...</h1>
            <p className='fa1_title'>Download and install the Google Authenticator app.</p>

            <div className="fa1_card">
                <a href="#"><img src={gplay} className='fa_img'/></a>
                <a href="#"><img src={aplleplay} className='fa_img'/></a>
            </div>

            <NavLink to={"/fa/scan"} className="fa1_next">
                Next <ArrowRightIcon />
            </NavLink>

        </div>
    );
}

export default Fa1;