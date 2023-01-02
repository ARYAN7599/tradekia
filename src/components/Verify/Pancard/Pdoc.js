import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from "react-router-dom";
import {URL} from '../../../helpers/global';
import Swal from "sweetalert2";
import { connect } from 'react-redux';
import axios from 'axios'; 
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import frontside from '../../../assets/images/frontside.svg';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../VDocUp/VDocUp.css';
import { SentimentVerySatisfiedOutlined } from '@mui/icons-material';
function Pdoc(props) {
    let location = useLocation();
    const [panfrint,setPanfrint] =useState(''); 
    const [frontUrl, setFrontUrl] = useState(frontside);
    const [pannumber,setPannumber] = useState(''); 
    const [isvailid,setIsvailid] = useState(false); 
    // const [backUrl, setBackUrl] = useState(backside);
    console.log("**********",location); 

    // preview image state for each front or back
    const [{ alt, frontSrc }, setFrontImagesPreview] = useState({
        frontSrc: "",
        alt: ''
    });

    const checkPanNumeber = async(pannu) => {
        const data = {
            "email":props.email,
            "pannumber": pannu
        }
       await axios.post(`${URL}CheckpanNumber`, data, {
            headers: {
                'x-access-token': props.token
            }
        }).then(res => {
            console.log('res.data.status',res.data)
                if (res.data.status) {
                    setIsvailid(true); 
                }else{
                    setIsvailid(false); 
                    toast.error(res.data.message, {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
                }
            }).catch(error => console.log(error));
    }

const handlePannumberChange = (event)=>{
    if(event.target.value.length > 10){
        toast.error("Pan Card number  must be of 10 character", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
    }else{
            setPannumber(event.target.value);
            if(event.target.value.length===10){
                checkPanNumeber(event.target.value);   
            }
    }
  
}
    const fileFrChangeHandler = (event) => {
        if(event.target.files[0].size < 300000){
        setPanfrint(event.target.files[0]);
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

    useEffect(() => {
        if (location.state.panfrint !== "" ) {
            setPanfrint(location.state.panfrint);
            setFrontUrl(location.state.panfrint);

        }
    }, [location.state.panfrint]);


    return (
        <div className="vdupl_maindiv">

            <h1>2<span style={{ fontSize: '1.3rem', fontWeight: '300', color: '#b8b8b8' }}>/3</span> Identification</h1>

            <div className="vdupl_card">
                <h3 className='vdupl_upltitle'>Upload your Pan card</h3>

                <div className='vdupl_flex'>
                    <div className='vdupl_flex2'>
                        <img src={frontSrc !== "" ? frontSrc : frontUrl} alt={alt} className='vdupl_img' />
                        <h3></h3>
                        <div className='uploadDiv'>
                            <label htmlFor="attachIdfr" className='vdupl_upl'><p>Upload</p> <ArrowUpwardIcon fontSize='16' /></label>
                            <input type="file" accept="image/*" id="attachIdfr" style={{ display: 'none' }} onChange={fileFrChangeHandler} />
                            {panfrint ? panfrint.name : null}
                        </div>
                        {/* <h1></h1> */}
                        <br/>
                        <div>
                            <input
                                type="text"
                                placeholder="Pan Number"
                                required
                                className="vpers_inp"
                                value={pannumber}
                                onChange={handlePannumberChange} />
                        </div>
                    </div>

                 

                </div>
                <h3 className='vdupl_upltitle' style={{color:"red"}}> <strong>Note:-</strong> Image file size should be less than 300 kb</h3>
            </div>

            <div className='vdoc_flex3'>
                <NavLink to="/verify/upload" className="vdoc_prev"
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
                        idfrint:location.state.idfrint,
                        idback:location.state.idback,
                        panfrint: panfrint,
                        pannumber:pannumber,
                        idFilePhoto: location.state.idFilePhoto,
                        action:location.state.action,
                    }}
                >
                    <ArrowLeftIcon /> Previous
                </NavLink>

                {
                    (panfrint === "" || pannumber==="" || pannumber.length !==10 || isvailid===false) ?
                  
                        (<div className="vdoc_next" style={{ backgroundColor: '#BDBDBD', cursor: "default" }}>
                            {  console.log("sjdhfdjl",pannumber)}
                            Next <ArrowRightIcon />
                        </div>) : (<Link to={"/verify/selfie"}
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
                                idfrint:location.state.idfrint,
                                idback:location.state.idback,
                                panfrint: panfrint,
                                pannumber:pannumber,
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

const mapStateToProps = (state) => {
    return ({
        token: state.token,
        rftokn: state.rfTOken,
        ip: state.ip,
        did: state.deviceId,
        email: state.email,
    })
}
export default connect(mapStateToProps)(Pdoc);