import React from "react";
import flogo from '../../../assets/images/flogo.png';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import GitHubIcon from '@mui/icons-material/GitHub';
import RedditIcon from '@mui/icons-material/Reddit';
import MediumIcon from '../../../assets/images/medium_icon.png';


import './Footer.css';
import { Telegram } from "@mui/icons-material"; 

const Footer = () => {

    return (
        <div className="footer_div">
            <div className="ftr_flex1">
                <div className="logoDiv">
                <a href="/"><img src={flogo} alt="logo" className="ftr_img" /> </a>
                </div>
                <div className="ftr_iconflex">
                    <a href="/aboutus" className="ftr_text">About Us</a>
                    <a href="/trmsConditions" className="ftr_text">Terms & Conditions</a>
                    <a href="/prvacyplcy" className="ftr_text">Privacy Policy</a>
                    <a href="#" className="ftr_text">Contact Us</a>
                </div>
            </div>

            <div className="ftr_flex2">
                <p className="ftr_copy">Copyrights © {new Date().getFullYear()}. All rights reserved by TradeKia</p>

                <div className="ftr_icnflex">
                <a href="https://t.me/invite_at_TradeKIA" target="_blank" rel="noopener noreferrer"><Telegram className="ftr_icons" /></a>                 
                    <a href="https://www.linkedin.com/company/trade-kia/" target="_blank" rel="noopener noreferrer"><LinkedInIcon className="ftr_icons" /></a>
                    <a href="https://twitter.com/trade_kia" target="_blank" rel="noopener noreferrer"><TwitterIcon className="ftr_icons" /></a>
                    <a href="https://www.facebook.com/Trade-Kia-104530908810012" target="_blank" rel="noopener noreferrer"><FacebookIcon className="ftr_icons" /></a>
                    <a href="https://www.instagram.com/tradekiaofficial/" target="_blank" rel="noopener noreferrer"><InstagramIcon className="ftr_icons" /></a>
                    <a href="https://www.youtube.com/channel/UCX_OGHBVQu2-AJpSCh47KSA" target="_blank" rel="noopener noreferrer"><YouTubeIcon className="ftr_icons" /></a>
                    <a href="https://github.com/tradekia" target="_blank" rel="noopener noreferrer"><GitHubIcon className="ftr_icons" /></a>
                    <a href="https://www.reddit.com/user/tradekiaofficial" target="_blank" rel="noopener noreferrer"><RedditIcon className="ftr_icons" /></a>
                    <a href="https://medium.com/@tradekiaofficial" target="_blank" rel="noopener noreferrer"><img src={MediumIcon} alt="" className="ftr_icons medium_icon" /></a>
                </div>
            </div>
        </div>
    );
}

export default Footer;