import React from "react";
import './Profile.css';
import { Routes, Route,Navigate,useLocation, NavLink, useNavigate } from "react-router-dom";
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import LgnHistory from "../../components/Profile/LgnHistory/LgnHistory";
import BanckInfo from "../../components/BanckDetails/BanckInfo";

function Profile() {
    return (
        <div className="container-fluid container-xl profile_div" style={{marginTop:'1rem'}}>

            <ProfileInfo />
            <Routes>
                <Route exact path='/' element={<LgnHistory />} />
                <Route path="/profile/banckDetails" element={<BanckInfo/>}/> 
                {/* <Route path={"/fa/disable2fa"} element={<FA2OTP />} />
                <Route path="/fa/scan" element={<Fa2 />} /> */}
            </Routes>
        </div>
    )
}

export default Profile;