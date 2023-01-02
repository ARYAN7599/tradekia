import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { IconButton } from '@mui/material';
import { connect } from 'react-redux';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { updToken, updRfToken, updUserData, updIP } from "../../../store/actions";
import axios from "axios";
import Loader from "../../Loader/Loader";
import './Fa2.css';

const Fa2 = (props) => {
    const [QrUrl, setQrUrl] = useState("");
    const [sendSecretKey, setSendSecretKey] = useState("");
    const [copySuccess, setCopySuccess] = useState('');
    let secretKey = "";
    let url = "";

    // function for copy
    const copyToClipBoard = async copyMe => {
        try {
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied!');
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };

    const urlAPI = async () => {
        try {
            // fetch secret key so that it generate QR Code
            let optForSecretKay = {
                method: 'GET',
                url: 'https://google-authenticator.p.rapidapi.com/new_v2/',
                headers: {
                    'x-rapidapi-host': 'google-authenticator.p.rapidapi.com',
                    'x-rapidapi-key': '0ad38bcd6bmshf99e15a16cac8f8p1aaa36jsn1271dec98f89'
                }
            };

            await axios.request(optForSecretKay).then(function (response) {
                secretKey = response.data
            }).catch(function (error) {
                console.error(error);
            });
            setSendSecretKey(secretKey);
            // Fetch QR code URL
            let optForQRCode = {
                method: 'GET',
                url: 'https://google-authenticator.p.rapidapi.com/enroll/',
                params: { secret: `${secretKey}`, account: props.email, issuer: 'TradeKiya' },
                headers: {
                    'x-rapidapi-host': 'google-authenticator.p.rapidapi.com',
                    'x-rapidapi-key': '0ad38bcd6bmshf99e15a16cac8f8p1aaa36jsn1271dec98f89'
                }
            };
            await axios.request(optForQRCode).then(function (response) {
                url = response.data;
            }).catch(function (error) {
                console.error(error);
            });
            setQrUrl(url);
        } catch (err) {
            console.log(err);
        }
    }


    useEffect(() => {
        const getQRCode = () => {
            urlAPI();
        };
        getQRCode();
    }, []);



    return (
        <>
            {
                QrUrl ? <div className="fa2_maindiv">

                    <h1 style={{ marginBottom: 5, textAlign: 'center' }}>Google Authenticator</h1>
                    <p className='fa2_title'>Scan this QR Code in the Google Authenticator app.</p>

                    <div className="fa2_card">
                        <img src={QrUrl} alt="QRCode" className='qrCode' />
                    </div>


                    <p className='fa2_text'>If you are unable to scan the QR code,
                        please enter this 16 digit code manually into the google authenticator app to enable it and
                        save it securly to recover your authenticator in future.</p>

                    <div className="fa2_codeCard">
                        <IconButton onClick={() => copyToClipBoard(sendSecretKey)}>
                            <p className='fa2_num'>{sendSecretKey}</p>
                            <ContentCopyIcon />
                        </IconButton>
                    </div>

                    <p className='alert'>{copySuccess}</p>

                    <div className='fa2_flex'>
                        <NavLink to={"/fa"} className="fa2_prev">
                            <ArrowLeftIcon /> Previous
                        </NavLink>

                        <NavLink to={"/fa/verification"} state={{ sendSecretKey: sendSecretKey, prevPath: "/fa/scan" }} className="fa2_next">
                            Next <ArrowRightIcon />
                        </NavLink>
                    </div>



                </div> : <Loader />
            }
        </>
    );
}
const mapStateToProps = (state) => {
    return ({
        token: state.token,
        email: state.email,
        secretkey: state.secretkey,
        authenticator: state.authenticator,
        name: state.name,
        referral_code: state.referral_code,

    });
}

const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
        saveUsrData: (name, email, secretkey, authenticator, referral_code) => dispatch(updUserData(name, email, secretkey, authenticator, referral_code)),
        saveUsrIP: (ip, did) => dispatch(updIP(ip, did)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Fa2);
// export default Fa2;