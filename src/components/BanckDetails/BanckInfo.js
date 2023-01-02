import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import ProfileInfo from "../../components/Profile/ProfileInfo/ProfileInfo";
import { PulseBubbleLoader } from 'react-loaders-kit';
import TextField from '@material-ui/core/TextField';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import moment from "moment";
import DatePicker from 'react-date-picker';
import { URL } from "../../helpers/global";
import axios from "axios";
import { connect } from 'react-redux';
import './VPers.css';

function BanckInfo(props) {
    const [ahName, setAhName] = useState("");
    const [bName, setBName] = useState('');
    const [aNo, setANo] = useState('');
    const [branchName, setBranchName] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [bType, setBType] = useState('');
    const [dType, setDType] = useState("");
    const [idback, setBackPic] = useState("");
    const [idFilePhoto, setSelfiePic] = useState("");
    const [action, setAction] = useState("add");
    const [value,setValue] = useState('1');
    const [dtype,setDtype] = useState('1');
    const [issubmit,setIssubmit] = useState(false); 

    const handleaHnameChange = (event) => {
        setAhName(event.target.value);
    }

    const handleBNameChange = (event) => {
        setBName(event.target.value);
    }

    const handleAccountChange = (event) => {
        setANo(event.target.value);
    }


    const handleBranchNameChange = (event) => {
        setBranchName(event.target.value);
    }

    const handleIfscCodeChane = (val) => {
        setIfscCode(val);
    }

    const selectBtype = (val) => {
        setBType(val);
    }
    const selectDtype = (val) => {
        setDType(val);
    }
    const handileSubmitBanckDetails = () => {

    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
      const myOptions = ['One', 'Two', 'Three', 'Four', 'Five'];

    return (
        <div className="container-fluid container-xl profile_div" style={{ marginTop: '1rem' }}>
            <ProfileInfo />
            <Box sx={{width:'75%'}}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <TabList
                        onChange={handleChange}
                        aria-label="lab API tabs example"
                      >
                        <Tab
                          className="mtghjy"
                          label=" Add Bank Details"
                          onClick={(e) => setDtype("1")}
                          value="1"
                        />
                        <Tab
                          className="mtghjy"
                          label="Add Upi Id "
                          onClick={(e) => setDtype("2")}
                          value="2"
                        />
                      </TabList>
                    </Box>
                    {/* Limit Side Buy Or Sell Code Start  */}
                    <TabPanel
                      id="tabOutline"
                      value="1"
                      style={{ marginTop: "8px" }}
                    >
                      <Box className="boxflex">
                        <h4 className="tradheader" style={{ float: 'left', width: '100%' }}>
                          <span>Bank Details</span>
                        </h4>
                          {/* <Box> */}
                            <div>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Account Holder Name
                                </FormHelperText>

                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={ahName}
                                  onChange={handleaHnameChange}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                 Bank  Name
                                </FormHelperText>

                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={ahName}
                                  onChange={handleaHnameChange}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>

                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Branch  Name
                                </FormHelperText>

                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={ahName}
                                  onChange={handleaHnameChange}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>

                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  IFSC Code 
                                </FormHelperText>

                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={ahName}
                                  onChange={handleaHnameChange}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Amount
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={"limitqty"}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />

                              </FormControl>

                        
                              {issubmit ?
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  <PulseBubbleLoader />
                                </Button>
                                :
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  onClick={handileSubmitBanckDetails}
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  Add Bank Details 
                                </Button>
                              }

                            </div>
                      </Box>
                    </TabPanel>
                    <TabPanel
                      id="tabOutline"
                      value="2"
                      style={{ marginTop: "8px" }}
                    >
                      <Box className="boxflex">
                        <h4 className="tradheader" style={{ float: 'left', width: '100%' }}>
                          <span>Add Upi Ids </span>
                        </h4>
                          {/* <Box> */}
                            <div>
                              <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                 Upi Ids 
                                </FormHelperText>

                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={ahName}
                                  onChange={handleaHnameChange}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />
                              </FormControl>
                              {/* <FormControl className="fikerjs"
                                sx={{ width: "100%" }}
                                variant="outlined"
                              >
                                <FormHelperText
                                  className="labelnm"
                                  id="outlined-weight-helper-text"
                                >
                                  Amount
                                </FormHelperText>
                                <OutlinedInput
                                  id="outlined-adornment-weight"
                                  value={"limitqty"}
                                  aria-describedby="outlined-weight-helper-text"
                                  sx={{
                                    height: "30px",
                                    borderRadius: "10px",
                                    paddingRight: "0px",
                                    lineHeight: "0.4375em",
                                    fontSize: "0.8856rem",
                                  }}
                                />

                              </FormControl> */}

                        
                              {issubmit ?
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  <PulseBubbleLoader />
                                </Button>
                                :
                                <Button className="butnbyfufi df1"
                                  variant="contained"
                                  onClick={handileSubmitBanckDetails}
                                  sx={{
                                    m: 1,
                                    width: "100%",
                                    backgroundColor: "#03675b",
                                  }}
                                  disableElevation
                                >
                                  AddBanck Details 
                                </Button>
                              }

                            </div>
                      </Box>
                    </TabPanel>

                  </TabContext>
                  {/* <p className="disclaimer"><strong>Disclaimer: </strong> We are complying with the latest norms formed by the government so we will deduct 1% TDS on every sell transaction.</p> */}
           
            {/* <div className="vpers_maindiv">
                <h1> Banck Details </h1>
                <div className="vpers_card">
                    <div className="vpers_firstdiv">
                        <h3 style={{ textAlign: 'center' }}>Banck Details</h3>
                        <div >
                            <div>
                                <input
                                    type="text"
                                    placeholder="Account Holder Name"
                                    required
                                    className="vpers_inp"
                                    value={ahName}
                                    onChange={handleaHnameChange} />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Banck Name"
                                    className="vpers_inp"
                                    value={bName}
                                    onChange={handleBNameChange} />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Account Number"
                                    required
                                    className="vpers_inp"
                                    value={aNo}
                                    onChange={handleAccountChange} />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Branch Name"
                                    required
                                    className="vpers_inp vper_width"
                                    value={branchName}
                                    onChange={handleBranchNameChange} />
                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    required
                                    className="vpers_inp vper_width"
                                    value={ifscCode}
                                    onChange={handleIfscCodeChane} />
                            </div>
                        </div>
                    </div>
                </div>

                {
                    (ahName === "" || ahName === "" || aNo === "Invalid date" || branchName === "" || ifscCode === "") ?
                        (<div className="vpers_next" style={{ backgroundColor: '#BDBDBD', cursor: "default" }}>
                            Next <ArrowRightIcon />
                        </div>) : (<div onClick={handileSubmitBanckDetails} className="vpers_next">
                            Next <ArrowRightIcon />
                        </div>)
                }

            </div> */}
            </Box>
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

export default connect(mapStateToProps)(BanckInfo);