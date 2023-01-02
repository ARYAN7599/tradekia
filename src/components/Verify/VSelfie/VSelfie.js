import React, { useState,useEffect } from 'react';
import axios from 'axios';
import { PulseBubbleLoader } from 'react-loaders-kit';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { ToastContainer, toast } from 'react-toastify';
import {URL} from '../../../helpers/global'; 
import 'react-toastify/dist/ReactToastify.css';
// import swal from 'sweetalert';
import Swal from "sweetalert2";
import frontside from '../../../assets/images/frontside.svg';
import selfyimg from '../../../assets/images/selfytext.jpg';
import { connect } from 'react-redux';
import { updToken, updRfToken } from "../../../store/actions";

import './VSelfie.css';
import { Image } from '@mui/icons-material';

function VSelfie(props) {
    let location = useLocation();
    let navigate = useNavigate();
    console.log("*******************122555",location);
    const [idFilePhoto, setIdFilePhoto] = useState('');
    const [frontUrl, setFrontUrl] = useState(frontside);
    const [isLoading,setIsLoading] = useState(false); 

    // preview image state for each front or back
    const [{ alt, frontSrc }, setFrontImagesPreview] = useState({
        frontSrc: "",
        alt: ''
    });


    const refreshtokn = () => {
        const data = {
            "refreshToken": props.rftokn,
            "ipaddress": props.ip,
            "deviceid": props.did
        }

        axios.post(`${URL}token`, data, {
            headers: {
                'x-access-token': props.token
            }
        }).then(res => {
                if (res.data.status) {
                    props.saveToken(res.data.token);
                    props.saveRfToken(res.data.refreshToken);
                }
            }).catch(error => console.log(error));
    }

    const verifyHandler = () => {
        setIsLoading(true);
        let bodyFormData = new FormData();
        bodyFormData.append('first_name', location.state.firstNm);
        bodyFormData.append('middle_name', location.state.midName);
        bodyFormData.append('last_name', location.state.lastName);
        bodyFormData.append('date_of_birth', location.state.dob);
        bodyFormData.append('address', location.state.addr);
        bodyFormData.append('postal_code', location.state.pscode);
        bodyFormData.append('country', location.state.cntry);
        bodyFormData.append('city', location.state.city);
        bodyFormData.append('email', props.email);
        bodyFormData.append('action', location.state.action);
        bodyFormData.append('identity_type', location.state.idtype);
        bodyFormData.append('pannumber',location.state.pannumber);
        bodyFormData.append('images[]', location.state.idfrint);
        bodyFormData.append('images[]', location.state.idback);
        bodyFormData.append('images[]', idFilePhoto);
        bodyFormData.append('images[]',location.state.panfrint); 
        axios.post(`${URL}addKyc`, bodyFormData, {
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'multipart/form-data, application/json',
                'Accept': 'application/json, multipart/form-data',
            }
        }
        ).then(res => {
            console.log("res@@@@@@@@@@@@@@@@@@@@@@@@@@@@",res.data); 
                if (res.data.status) {
                    setIsLoading(false);
                   // swal("Well Done", "KYC Submitted Successfully", "success");
                   Swal.fire(
                    'Well Done',
                    'Your KYC  has been Submitted Successfully',
                    'success'
                  ).then((result) => {
                    if (result.isConfirmed) {
                      // window.location.reload();
                      navigate('/profile');
                    }
                  });
                //    swal("Well Done", "KYC Submitted Successfully", "success");
                    //navigate('/profile');
                }else{
                    setIsLoading(false);
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
            }).catch(error => {
                console.log("res*********************************",error); 
                setIsLoading(false);
                if (error.response.status === 401) {
                    refreshtokn();
                    toast.error('Some error occured, please try again some time.', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                }
            });
    }

    useEffect(() => {
      if( location.state.idFilePhoto!==""){
        setIdFilePhoto(location.state.idFilePhoto);
        setFrontUrl(location.state.idFilePhoto);
      }

    }, [location.state.idFilePhoto]);
        const fileFrChangeHandler = (event) => {
        setIdFilePhoto(event.target.files[0]);
        if (event.target.files[0]) {
            setFrontImagesPreview({
                frontSrc: URL.createObjectURL(event.target.files[0]),
                alt: event.target.files[0].name
            });
        }
    }
    

    return (
        <div className="vself_maindiv">

            <h1>3<span style={{ fontSize: '1.3rem', fontWeight: '300', color: '#b8b8b8' }}>/3</span> Identification</h1>

            <div className="vself_card" style={{backgroundImage:'url('+selfyimg+')',backgroundSize: "cover",
        //   height: "100%",
        //   color: "#f5f5f5"
          }}>
                <h3 className='vself_upltitle'>Upload your Photo</h3>
                <div className='vself_flex'>
                    <div className='vself_flex2'>
                        <img src={frontSrc !== "" ? frontSrc : frontUrl} alt={alt} className='vself_img' />
                        <h3></h3>
                        <div className='uploadDiv'>
                            <label htmlFor="attachIdPhoto"  className='vself_upl'><p>Upload</p> <ArrowUpwardIcon fontSize='16' /></label>
                            <input type="file" id="attachIdPhoto" accept="image/*" style={{ display: 'none' }} onChange={fileFrChangeHandler} />
                            {idFilePhoto ? idFilePhoto.name : null}
                        </div>
                    </div>

                </div>
                <h3 className='vdupl_upltitle' style={{color:"red"}}> <strong>Note:-</strong> Image file size should be less than 300 kb</h3>
            </div>

            <div className='vself_flex3'>
                <NavLink to="/verify/panuoload" className="vself_prev"
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
                        idfrint: location.state.idfrint,
                        idback: location.state.idback,
                        panfrint:location.state.panfrint,
                        pannumber:location.state.pannumber,
                        idFilePhoto:location.state.idFilePhoto,

                    }}
                >
                    <ArrowLeftIcon /> Previous
                </NavLink>

                {
                    ( idFilePhoto === "") ?

                        (<button className="vself_next" style={{ backgroundColor: '#BDBDBD', cursor: "default" }}>
                           {(location.state.action)==='add'?"Submit":"Update"}
                        </button>) : (
                             isLoading ?
                                <button className="vself_next">
                                    <PulseBubbleLoader />
                                </button>
                                :
                        <button className="vself_next" onClick={verifyHandler}>
                           {(location.state.action)==='add'?"Submit":"Update"}  
                        </button>
                        )
                }
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

const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(VSelfie);