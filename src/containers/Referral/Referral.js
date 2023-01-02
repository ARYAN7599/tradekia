import React, { useState, Suspense, useEffect } from 'react';
import {  useNavigate } from "react-router-dom";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { connect } from 'react-redux';
import { URL } from "../../helpers/global";
import { ToastContainer, toast } from 'react-toastify';
import {
    FacebookShareButton,
    RedditShareButton,
    TelegramShareButton,
    TwitterShareButton,
    WhatsappShareButton,
} from "react-share";
import axios from 'axios';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import RedditIcon from '@mui/icons-material/Reddit';
import TelegramIcon from '@mui/icons-material/Telegram';
import 'react-toastify/dist/ReactToastify.css';
import "./SCSS/Referral.css";
import Swal from 'sweetalert2';
import ReferralTree from './ReferralTree';
import StyledNodesTree from './StyledNodesTree';
const Children = React.lazy(() => import("./Children"));
const Referral = (props) => {
    const navigate = useNavigate();
    const [referralLink, setReferralLink] = useState(`https://tradekia.com/createaccount/${props.referral_code}`);
    const [copySuccess, setCopySuccess] = useState('');
    const [loadDynamicComp, setLoadDynamicComp] = useState(0);
    const [iskyc, setIskyc] = useState(false);
    console.log("hellofriends", props);
    const getUserInfo = async () => {
        try {
            let data = JSON.stringify({
                "email": `${props.email}`,
            });

            let config = {
                method: 'post',
                url: `${URL}/getProfile`,
                headers: {
                    'x-access-token': `${props.token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };
            await axios(config)
                .then(function (res) {
                    // console.log(res.data.data[0])
                    if (res.data.data.length > 0) {
                        setIskyc(false);
                    } else {
                        setIskyc(true);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        setLoadDynamicComp(1);
        getUserInfo();
    }, [])


    const string = `Use TradeKia for the best crypto exchange features: buy crypto within seconds, zero P2P fee, 50% referral rewards and more! Hurry, sign up by using this link:`


    // function for copy
    const copyToClipBoard = async copyMe => {
        try {
            if(iskyc){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Please complite Your Kyc!',
                }).then((res)=>{
                    // console.log("vgvgv",res); 
                    if(res.isConfirmed){
                        navigate('/verify');
                    }
                });
            }else{
            await navigator.clipboard.writeText(copyMe);
            setCopySuccess('Copied!');
            }
        } catch (err) {
            setCopySuccess('Failed to copy!');
        }
    };


    return (
        <div className='referral'>
            <h1 className="referral_heading">
                Referral
            </h1>
            <div className='referral_form'>
                <div className='referralBox'>
                    <h2>Share your referral link with friends and earn more:</h2>
                    {/* <div className='referralLink_div' onClick={() => copyToClipBoard(referralLink)}>
                     */}
                     {iskyc?
                    <div className='referralLink_div'
                        onClick={() => copyToClipBoard(referralLink)} >
                        {/* <a href={referralLink} className='referral_link' disabled="disable" >{referralLink}</a> */}
                        <p  className='referral_link' disabled="disable">{referralLink}</p>
                        <ContentCopyIcon />
                        <span className="tooltiptext">Click to copy</span>
                    </div>:<div className='referralLink_div'
                        onClick={() => copyToClipBoard(referralLink)} >
                        {/* <a href={referralLink} className='referral_link' disabled="disable" >{referralLink}</a> */}
                        <p  className='referral_link' disabled="disable">{referralLink}</p>
                        <ContentCopyIcon />
                        <span className="tooltiptext">Click to copy</span>
                    </div>}
                    <div className='socialMediaDiv'>
                        <FacebookShareButton
                            className="fb_btn"
                            url={referralLink}
                            quote={string + "" + referralLink}
                            hashtag="#tradekiyakya"
                        ><FacebookIcon />
                        </FacebookShareButton>

                        <WhatsappShareButton
                            className="whatsapp_btn"
                            url={referralLink}
                            title={string}
                        ><WhatsAppIcon />
                        </WhatsappShareButton>

                        <TelegramShareButton
                            className="tele_btn"
                            title={string}
                            url={referralLink}
                        >
                            <TelegramIcon />
                        </TelegramShareButton>
                        <RedditShareButton
                            className="reddit_btn"
                            url={referralLink}
                            title={string}
                        >
                            <RedditIcon />
                        </RedditShareButton>

                        <TwitterShareButton
                            className="tweet_btn"
                            url={referralLink}
                            title={string}>
                            <TwitterIcon />
                        </TwitterShareButton>

                    </div>
                    <p className='referralCode'>(Your code: {props.referral_code})</p>
                    <p className='alert_copy'>{copySuccess}</p>
                </div>

                <div className='teamBox'>
                    {loadDynamicComp ? (
                        <Suspense fallback={<div>Loading Component....</div>}>
                            <ReferralTree />
                        </Suspense>
                    ) : null}
                </div>

            </div>
            <ToastContainer
                position="bottom-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div >
    )
}

const mapStateToProps = (state) => {
    return ({
        id: state.id,
        token: state.token,
        email: state.email,
        referral_code: state.referral_code
    });
}

export default connect(mapStateToProps)(Referral);