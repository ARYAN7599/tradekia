import React , { memo } from "react";
import './Profile.css';

import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";


function Profile() {
    return (
        <div className="container-fluid container-xl profile_div" style={{marginTop:'1rem'}}>
                       
            <ProfileInfo  />
        </div>
    )
}

export default memo(Profile);