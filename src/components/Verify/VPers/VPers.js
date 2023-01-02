import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import moment from "moment";
import DatePicker from 'react-date-picker';
import { URL } from "../../../helpers/global";
import axios from "axios";
import { connect } from 'react-redux';
import './VPers.css';

function VPers(props) {
    const [frname, setFrName] = useState("");
    const [mdname, setMdName] = useState('');
    const [lname, setLName] = useState('');
    const [addr, setAddr] = useState('');
    const [postal, setPostal] = useState('');
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const [idfrint, setFrntPic] = useState("");
    const [idback, setBackPic] = useState("");
    const [idFilePhoto, setSelfiePic] = useState("");
    const [panPic,setPanPic] = useState(""); 
    const [action,setAction] = useState("add");
    // setting data for input field of date div so that next button should not be disable
    const [inputDate, setInputDate] = useState("");
    // using moment to subtract 18 years from now
    let dat = moment().subtract(18, 'year')._d;
    const [datetype, setDatetype] = useState(dat);

    // format to change date to string and send to data base
    let sendDate = moment(datetype).format('DD-MM-YYYY');

    // function to display Date Picker and hide input field
    const dobOnclick = () => {
        document.querySelector(".dobInput").style.display = "none";
        document.querySelector(".dobDate").style.display = "block";
        // setting input field of date div so that next button should be clickable
        setInputDate(sendDate);
    }

    // if date data is available then update sendDate which is using initial data date by subtracting only 18 years
    if (inputDate !== "") {
        sendDate = inputDate;
    }

    const handleFnameChange = (event) => {
        setFrName(event.target.value);
    }


    const handleMnameChange = (event) => {
        setMdName(event.target.value);
    }


    const handleLnameChange = (event) => {
        setLName(event.target.value);
    }

    const handleAddrChange = (event) => {
        setAddr(event.target.value);
    }


    const handlePostalChange = (event) => {
        setPostal(event.target.value);
    }

    const selectCountry = (val) => {
        setCountry(val);
    }

    const selectRegion = (val) => {
        setRegion(val);
    }


    useEffect(() => {
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
                            setFrName(res.data.data[0].first_name);
                            setMdName(res.data.data[0].middle_name);
                            setLName(res.data.data[0].last_name);
                            setAddr(res.data.data[0].address);
                            setPostal(res.data.data[0].postal_code);
                            setCountry(res.data.data[0].country);
                            setInputDate(res.data.data[0].date_of_birth);
                            setRegion(res.data.data[0].city);
                            // setFrntPic(res.data.data[0].front_photo);
                            // setBackPic(res.data.data[0].back_photo);
                            // setSelfiePic(res.data.data[0].selfie_photo);
                            // setPanPic(res.data.data[0].pan_photo); 
                            setAction("update");
                        }


                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } catch (err) {
                console.log(err);
            }
        };
        getUserInfo();
    }, [props.email,props.token]);


    return (
        <div className="vpers_maindiv">

            <h1>1<span style={{ fontSize: '1.3rem', fontWeight: '300', color: '#b8b8b8' }}>/3</span> Identification</h1>

            <div className="vpers_card">
                <div className="vpers_firstdiv">
                    <h3>Basic Info</h3>
                    <div >
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                className="vpers_inp"
                                value={frname}
                                onChange={handleFnameChange}  />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Middle Name(if applicable)"
                                className="vpers_inp"
                                value={mdname}
                                onChange={handleMnameChange} />
                        </div>

                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                required
                                className="vpers_inp"
                                value={lname}
                                onChange={handleLnameChange} />
                        </div>

                        <div>
                            <input className="vpers_inp dobInput" readOnly placeholder='Set Your Date of birth' value={inputDate === "" ? 'Set Your Date of birth' : inputDate} onClick={dobOnclick} />
                            <DatePicker onChange={setDatetype} value={datetype} maxDate={dat} className="vpers_inp dobDate" format="dd-MM-y" />
                        </div>
                    </div>
                </div>

                <div className="vpers_firstdiv" style={{marginTop:"-5px"}}>
                    <h3>Residential Address</h3>
                    <div>
                        <input
                            type="text"
                            placeholder="Address"
                            required
                            className="vpers_inp vper_width"
                            value={addr}
                            onChange={handleAddrChange} />
                    </div>

                    <div>
                        <input
                            type="number"
                            placeholder="Postal Code"
                            required
                            className="vpers_inp vper_width"
                            value={postal}
                            onChange={handlePostalChange} />
                    </div>

                    <div>
                        <CountryDropdown
                            value={country}
                            onChange={(val) => selectCountry(val)}
                            className="vpers_inp vper_width2" />
                    </div>
                    <div>
                        <RegionDropdown
                            country={country}
                            value={region}
                            onChange={(val) => selectRegion(val)}
                            className="vpers_inp vper_width2" />
                    </div>
                </div>
            </div>

            {
                (frname === "" || lname === "" || sendDate === "Invalid date" || inputDate === "" || addr === "" || postal === "" || country === "" || region === "") ?

                    (<div className="vpers_next" style={{ backgroundColor: '#BDBDBD', cursor: "default" }}>
                        Next <ArrowRightIcon />
                    </div>) : (<Link to={"/verify/document"}
                        state={{
                            firstNm: frname,
                            midName: mdname,
                            lastName: lname,
                            dob: sendDate,
                            addr: addr,
                            pscode: postal,
                            cntry: country,
                            city: region,
                            idfrint:idfrint,
                            idback:idback,
                            idFilePhoto:idFilePhoto,
                            panfrint:panPic,
                            action:action,
                        }}
                        className="vpers_next">
                        Next <ArrowRightIcon />
                    </Link>)
            }

        </div>
    );
}

const mapStateToProps = (state) => {
    return ({
        name: state.name,
        email: state.email,
        token: state.token,
    })
}

export default connect(mapStateToProps)(VPers);