import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useLocation, NavLink, Link as RouterLink, useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
// import { NavLink } from "react-router-dom";
import axios from "axios";
import { connect } from 'react-redux';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { URL } from "../../../helpers/global";
import smp from '../../../assets/images/smp.jpg';
import fa from '../../../assets/images/2fa.svg';
import verif from '../../../assets/images/verification.svg';
import Swal from "sweetalert2";
import LgnHistory from "../../Profile/LgnHistory/LgnHistory";
import BanckInfo from "../../BanckDetails/BanckInfo";

import './ProfileInfo.css';

function ProfileInfo(props) {

    const [refCode, setRefCode] = useState('');
    const [copySuccess, setCopySuccess] = useState('');
    const [iskyc, setIskyc] = useState();
    // function for copy

    const checkKycStatus = async () => {
        let data = JSON.stringify({
            "email": props.email,
        });
        let config = {
            method: 'post',
            url: `${URL}checkKycStatus`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config)
            .then(function (response) {
                if (response.data.status) {
                    setIskyc(response.data.data);
                }

            }).catch(function (error) {
                console.log(error);
            });
    }
    const handlePanding = async () => {
        Swal.fire({
            title: 'Your KYC will be approved within 3 working days.',
            icon: 'info',
            showCloseButton: true,
            // showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> OK!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            // cancelButtonText:
            //   '<i class="fa fa-thumbs-down"></i>',
            // cancelButtonAriaLabel: 'Thumbs down'
        })

    }
    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };

    useEffect(() => {
        setRefCode(props.referral_code)
    }, [setRefCode]);
    useEffect(() => {
        checkKycStatus();
    }, []);



    return (
        <div className="prfi_div">


            <Box className="prfi_box">
                <h2 className="prfi_title">Profile</h2>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        <DeleteOutlineIcon style={{
                            backgroundColor: '#bdbdbd',
                            color: 'white',
                            borderRadius: '50%',
                            padding: '2px',
                            fontSize: 22
                        }} />
                    }
                >
                    <Avatar alt="Travis Howard" src={smp} style={{ height: '6rem', width: '6rem' }} />
                </Badge>


                <h2 className="prfi_name">{props.name}</h2>
                <p className="prfi_email">{props.email}</p>

                <div className="prfi_flex3">
                    <p>{props.referral_code}</p>

                    <IconButton onClick={() => copyToClipBoard(refCode)}>
                        <ContentCopyIcon style={{ height: 18 }} />
                    </IconButton>

                </div>

                <p className='copyAlert'>{copySuccess}</p>

                <NavLink to="/changepassword" className="prfi_chngpsbtn">
                    Change Password
                </NavLink>

                <div className="prfi_btnbox">
                    <div className="prfi_flex1">
                        <div className="prfi_flex2">
                            <img src={fa} alt="" className="prfi_svg" />
                            <p className="prfi_text">2FA</p>
                        </div>

                        {props.authenticator === 0 ? (<NavLink to="/fa" style={{ textDecoration: 'none' }}>
                            <div className="prfi_flex2">
                                <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Enable</p>
                                <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                            </div>
                        </NavLink>) : (<NavLink to="/fa/emailotp" state={{ prevPath: "/profile" }} style={{ textDecoration: 'none' }}>
                            <div className="prfi_flex2">
                                <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Disable</p>
                                <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                            </div>
                        </NavLink>)}
                    </div>

                    <div className="prfi_flex1">
                        <div className="prfi_flex2">
                            <img src={verif} alt="" className="prfi_svg" />
                            <p className="prfi_text">Verification</p>
                        </div>
                        {console.log("jhdfkbhjdfbjhdf", iskyc)}
                        {(iskyc === 3) ?
                            <NavLink to="/verify" style={{ textDecoration: 'none' }}>
                                <div className="prfi_flex2">
                                    <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Verify</p>
                                    <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                                </div>
                            </NavLink>
                            : (iskyc === 2) ?
                                <NavLink to="/verify" style={{ textDecoration: 'none' }}>
                                    <div className="prfi_flex2">
                                        <p className="prfi_text" style={{ color: 'var(--background-color)' }} >Rejected</p>
                                        <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                                    </div>
                                </NavLink>
                                : (iskyc === 1) ?
                                    <div className="prfi_flex2">
                                        <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Approved</p>
                                        <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                                    </div>
                                    :
                                    <div className="prfi_flex2">
                                        <p className="prfi_text" style={{ color: 'var(--background-color)' }} onClick={handlePanding} >Pending</p>
                                        <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                                    </div>

                        }


                    </div>

                    <div className="prfi_flex1">
                        <div className="prfi_flex2">
                            <GroupAddIcon className="prfi_svg" />
                            <p className="prfi_text">Referral</p>
                        </div>

                        <NavLink to={`/referral/${props.referral_code}`} style={{ textDecoration: 'none' }}>
                            <div className="prfi_flex2 dfgh">
                                <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Your Referral</p>
                                <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                            </div>
                        </NavLink>
                    </div>

                    <div className="prfi_flex1">
                        <div className="prfi_flex2">
                            <GroupAddIcon className="prfi_svg" />
                            <p className="prfi_text">Banck Details</p>
                        </div>
                        <RouterLink to={`/banckDetails`} style={{ textDecoration: 'none' }}>
                            <div className="prfi_flex2 dfgh">
                                <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Added</p>
                                <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                            </div>

                        </RouterLink>
                        {/* 
                        <NavLink to={`/banckDetails`} style={{ textDecoration: 'none' }}>
                            <div className="prfi_flex2 dfgh">
                                <p className="prfi_text" style={{ color: 'var(--background-color)' }}>Added</p>
                                <ArrowRightIcon style={{ color: 'var(--background-color)' }} />
                            </div>
                        </NavLink> */}
                    </div>
                </div>

            </Box>


        </div>
    )
}




const mapStateToProps = (state) => {
    return ({
        name: state.name,
        email: state.email,
        referral_code: state.referral_code,
        authenticator: state.authenticator,
    })
}

export default connect(mapStateToProps)(ProfileInfo);