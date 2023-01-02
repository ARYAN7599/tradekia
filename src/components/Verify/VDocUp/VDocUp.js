import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import backside from '../../../assets/images/backside.svg';
import frontside from '../../../assets/images/frontside.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './VDocUp.css';

function VDocUp() {
    let location = useLocation();
    // console.log(location, "location");

    const [idfrint, setIdFileFrnt] = useState('');
    const [idback, setIdFileBck] = useState('');
    const [frontUrl, setFrontUrl] = useState(frontside);
    const [backUrl, setBackUrl] = useState(backside);

    // preview image state for each front or back
    const [{ alt, frontSrc }, setFrontImagesPreview] = useState({
        frontSrc: "",
        alt: ''
    });

    const [{ alter, backSrc }, setBackImagesPreview] = useState({
        backSrc: "",
        alter: ''
    });

    const fileFrChangeHandler = (event) => {
        console.log("^&^&^&*",event.target.files[0]); 
        if(event.target.files[0].size < 300000){
        setIdFileFrnt(event.target.files[0]);
        if (event.target.files[0]) {
            setFrontImagesPreview({
                frontSrc: URL.createObjectURL(event.target.files[0]),
                alt: event.target.files[0].name
            });
        }
    }else{
        toast.error("Image size must be less than 300kb.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
    }

    const fileBckChangeHandler = (event) => {
        console.log("^&^&^",event.target.files[0]); 
        if(event.target.files[0].size < 300000){
        setIdFileBck(event.target.files[0]);
        if (event.target.files[0]) {
            setBackImagesPreview({
                backSrc: URL.createObjectURL(event.target.files[0]),
                alter: event.target.files[0].name
            });
        }
    }else{
        toast.error("Image size must be less than 300kb.", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }
    }


    useEffect(() => {
        if (location.state.idfrint !== "" || location.state.idback !== "") {
            setIdFileFrnt(location.state.idfrint);
            setIdFileBck(location.state.idback);
            setBackUrl(location.state.idback)
            setFrontUrl(location.state.idfrint);

        }
    }, [location.state.idfrint, location.state.idback]);


    return (
        <div className="vdupl_maindiv">

            <h1>2<span style={{ fontSize: '1.3rem', fontWeight: '300', color: '#b8b8b8' }}>/3</span> Identification</h1>

            <div className="vdupl_card">
                <h3 className='vdupl_upltitle'>Upload your Document</h3>

                <div className='vdupl_flex'>

                    <div className='vdupl_flex2'>
                        <img src={frontSrc !== "" ? frontSrc : frontUrl} alt={alt} className='vdupl_img' />
                        
                        <h3>Front</h3>


                        <div className='uploadDiv'>
                            <label htmlFor="attachIdfr" className='vdupl_upl'><p>Upload</p> <ArrowUpwardIcon fontSize='16' /></label>
                            <input type="file" accept="image/*" id="attachIdfr" style={{ display: 'none' }} onChange={fileFrChangeHandler} />
                            {idfrint ? idfrint.name : null}
                        </div>
                    </div>

                    <div className='vdupl_flex2'>
                        <img src={backSrc !== "" ? backSrc : backUrl} alt={alter} className='vdupl_img' />
                     
                        <h3>Back</h3>

                        <div className='uploadDiv'>
                            <label htmlFor="attachIdback" className='vdupl_upl'><p>Upload</p> <ArrowUpwardIcon fontSize='16' /></label>
                            <input type="file" accept="image/*" id="attachIdback" style={{ display: 'none' }} onChange={fileBckChangeHandler} />
                            {idback ? idback.name : null}
                        </div>
                    </div>

                </div>
                <h3 className='vdupl_upltitle' style={{color:"red"}}> <strong>Note:-</strong> Image file size should be less than 300 kb</h3>
            </div>

            <div className='vdoc_flex3'>
                <NavLink to="/verify/document" className="vdoc_prev"
                    state={{
                        firstNm: location.state.firstNm,
                        midName: location.state.midName,
                        lastName: location.state.lastName,
                        dob: location.state.dob,
                        addr: location.state.addr,
                        pscode: location.state.pscode,
                        cntry: location.state.cntry,
                        city: location.state.city,
                        idtype: location.state.idtype,
                        panfrint : location.state.panfrint,
                        idfrint: idfrint,
                        idback: idback,
                        idFilePhoto: location.state.idFilePhoto,
                        action:location.state.action,
                    }}
                >
                    <ArrowLeftIcon /> Previous
                </NavLink>


                {
                    (idfrint === "" || idback === "") ?

                        (<div className="vdoc_next" style={{ backgroundColor: '#BDBDBD', cursor: "default" }}>
                            Next <ArrowRightIcon />
                        </div>) : (<Link to={"/verify/panuoload"}
                            state={{
                                firstNm: location.state.firstNm,
                                midName: location.state.midName,
                                lastName: location.state.lastName,
                                dob: location.state.dob,
                                addr: location.state.addr,
                                pscode: location.state.pscode,
                                cntry: location.state.cntry,
                                city: location.state.city,
                                idtype: location.state.idtype,
                                panfrint : location.state.panfrint,
                                idfrint: idfrint,
                                idback: idback,
                                idFilePhoto: location.state.idFilePhoto,
                                action:location.state.action,

                            }}
                            className="vdoc_next">
                            Next <ArrowRightIcon />
                        </Link>)
                }

            </div>
            <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />

        </div>
    );
}

export default VDocUp;