import { event } from "jquery";
import React, { useEffect, useState } from "react";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import { URL } from "../../../helpers/global";
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Button from '@mui/material/Button';
import Swal from "sweetalert2";
import { connect } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import frontside from '../../../assets/images/frontside.svg';
import selfyimg from '../../../assets/images/selfytext.jpg';
import axios from "axios";
function BankDetails(props) {
    const [brandId, setBrandId] = useState(""); // id merek
    const [brand, setBrand] = useState("Cheque"); // merek terpilih
    const [typeSelected, setTypeSelected] = useState([]); // tipe terpilih
    const [acHoName, setAcHoName] = useState();
    const [bname, setBname] = useState();
    const [acNumber, setAcNumber] = useState();
    const [ifscCode, setIfscCode] = useState();
    const [actype, setActype] = useState();
    const [branchName, setBranchName] = useState();
    const [upiId, setUpiId] = useState();
    const [mtype, setMtype] = useState('b');
    const [qrcodePhoto, setQrcodePhoto] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [value, setValue] = useState("1");
    const [upiHName, setUpiHName] = useState();
    const [frontUrl, setFrontUrl] = useState(frontside);
    const [idFilePhoto, setIdFilePhoto] = useState('');
    const [{ alt, frontSrc }, setFrontImagesPreview] = useState({
        frontSrc: "",
        alt: ''
    });
    
    const brands = [
        { id: 1, name: "Cheque" },
        { id: 2, name: "Passbook" },
        { id: 3, name: "Bank Statement" }
    ];
    const fileFrChangeHandler = (event) => {
        setIdFilePhoto(event.target.files[0]);
        if (event.target.files[0]) {
            setFrontImagesPreview({
                frontSrc: URL.createObjectURL(event.target.files[0]),
                alt: event.target.files[0].name
            });
        }
    }

    const handileAcHolderNameChange = (event) => {
        setAcHoName(event.target.value);

    }
    const handileAcNumberChange = (event) => {
        setAcNumber(event.target.value);
    }

    const handileIfscCodeChange = (event) => {
        setIfscCode(event.target.value);
    }
    const handileAccountTypeChange = (event) => {
        setActype(event.target.value);
    }
    const handileUpiIdChange = (event) => {
        setUpiId(event.target.value);
    }
    const handileBranchNameChange = (event) => {
        setBranchName(event.target.value)
    }
    const handileBankNameChnage = (event) => {
        setBname(event.target.value);
    }

    const handileUpiHolderNameChnage = (event) => {
        setUpiHName(event.target.value);
    }

    const qrChangeHandler = (event) => {
        setQrcodePhoto(event.target.files[0]);
        if (event.target.files[0]) {
            setFrontImagesPreview({
                frontSrc: URL.createObjectURL(event.target.files[0]),
                alt: event.target.files[0].name
            });
        }
    }

    const bankDetailsHandler = async () => {
        let bodyFormData = {
            "a_no": acNumber,
            "ba_na": bname,
            "d_type": actype,
            "user_id": "13",
            "branch_name": branchName,
            "b_type": actype,
            "ifsc_code": ifscCode,
            "a_h_n": acHoName

        }
        let config = {
            method: 'post',
            url: `${URL}saveBanckdetailes`,
            headers: {
              'x-access-token': props.token,
              'Content-Type': 'application/json'
            },
            data: bodyFormData
          };

        await axios(config).then(function (res) {
            if (res.data.status) {
                Swal.fire(
                    'Well Done',
                    'Your Bank Details has been Submitted Successfully',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                });
            } else {
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

        }).catch(function (error) {
            console.log(error);
            toast.error('Some error occured, please try again some time.', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        });
    }

    const isValid = function (value) {
        if (value === undefined || value === null) {
            return false
        }
        if (typeof value === "string" && value.trim().length === 0) return false
        return true;
    }
    const saveUpiIdHandiler = async () => {
        var data = new FormData();
        if (!isValid(upiId)) {
            setIsLoading(false);
            toast.error("UPI Id Is requried", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        if (!isValid(upiHName)) {
            setIsLoading(false);
            toast.error("UPI Id Holder Name Is requried", {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }

        data.append('user_id', props.user_id);
        data.append('images', idFilePhoto);
        data.append('upi_id', upiId);
        data.append('ac_h_name', upiHName);
        data.append('id_type', 'PhonePaye');
        var config = {
            method: 'post',
            url: `${URL}saveUPIdetailes`,
            headers: {
                'x-access-token': props.token,
                'Content-Type': 'application/json'
            },
            data: data
        };

        await axios(config).then(function (res) {
            if (res.data.status) {
                setIsLoading(false);
                Swal.fire(
                    'Well Done',
                    'Your UPI Details has been Submitted Successfully',
                    'success'
                ).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                        //    navigate('/profile');
                    }
                });
            } else {
                setIsLoading(false);
                toast.error(res.data.msg, {
                    position: "bottom-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        }).catch(function (error) {
            console.log(error);
        });


    }

    const handleChang1e = (event, newValue) => {
        setValue(newValue);
    };








    return (
        <>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                        onChange={handleChang1e}
                        aria-label="lab API tabs example"
                    >
                        <Tab
                            className="mtghjy"
                            label="Add Bank Details"
                            onClick={(e) => setMtype("b")}
                            value="1"
                        />
                        <Tab
                            className="mtghjy"
                            label="Add UPI Id"
                            onClick={(e) => setMtype("u")}
                            value="2"
                        />
                    </TabList>
                </Box>
                <TabPanel
                    id="tabOutline"
                    value="1"
                    style={{ marginTop: "8px" }}
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <TextField
                                label="A/C Holder Name"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '40ch' }}
                                onChange={handileAcHolderNameChange}
                                value={acHoName}
                                // variant="standard"
                                multiline={true}

                            />
                            <TextField
                                label="Bank Name"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '40ch' }}
                                onChange={handileBankNameChnage}
                                value={bname}
                                // variant="standard"
                                multiline={true}
                            />
                            <FormControl fullWidth sx={{ m: 1 }}>
                                <InputLabel htmlFor="outlined-adornment-amount">A/C Number </InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-amount"
                                    value={acNumber}
                                    onChange={handileAcNumberChange}
                                    label="A/C Number"
                                    multiline={true}
                                // variant="standard"
                                />
                            </FormControl>
                        </div>
                        <div>
                            <TextField
                                label="IFSC Code "
                                id="filled-start-adornment"
                                sx={{ m: 1, width: '30ch' }}
                                onChange={handileIfscCodeChange}
                                value={ifscCode}
                                // variant="standard"
                                multiline={true}
                            />
                            <TextField
                                label="Branch Name"
                                id="filled-start-adornment"
                                sx={{ m: 1, width: '35ch' }}
                                onChange={handileBranchNameChange}
                                value={branchName}
                                // variant="standard"
                                multiline={true}
                            />
                            <TextField
                                label="Account Type"
                                id="filled-start-adornment"
                                sx={{ m: 1, width: '25ch' }}
                                onChange={handileAccountTypeChange}
                                value={actype}
                                // variant="standard"
                                multiline={true}
                            />
                        </div>
                    </Box>
                    <Button variant="contained" onClick={bankDetailsHandler} disableElevation>
                        Submit
                    </Button>
                </TabPanel>
                <TabPanel
                    id="tabOutline"
                    value="2"
                    style={{ marginTop: "8px" }}
                >
                    <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <div>
                            <TextField
                                label="UPI ID"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '40ch' }}
                                onChange={handileUpiIdChange}
                                value={upiId}
                                // variant="standard"
                                multiline={true}
                            />

                            <TextField
                                label="UPI Holder Name"
                                id="outlined-start-adornment"
                                sx={{ m: 1, width: '40ch' }}
                                onChange={handileUpiHolderNameChnage}
                                value={upiHName}
                                // variant="standard"
                                multiline={true}
                            />
                        </div>

                        <div id="outlined-start-adornment">
                            
                            {/* <div className="vself_card_bank" style={{
                                backgroundImage: 'url(' + selfyimg + ')', backgroundSize: "cover",
                                //   height: "100%",
                                //   color: "#f5f5f5"
                            }}> */}
                                <h3 className='vself_upltitle'>Upload your QR Code</h3>
                                <div className='vself_flex'>
                                    <div className='vself_flex2'>
                                        <img src={frontSrc !== "" ? frontSrc : frontUrl} alt={alt} className='vself_img' />
                                        <h3></h3>
                                        <div className='uploadDiv'>
                                            <label htmlFor="attachIdPhoto" className='vself_upl'><p>Upload</p> <ArrowUpwardIcon fontSize='16' /></label>
                                            <input type="file" id="attachIdPhoto" accept="image/*" style={{ display: 'none' }} onChange={fileFrChangeHandler} />
                                            {idFilePhoto ? idFilePhoto.name : null}
                                        </div>
                                    </div>

                                </div>
                                {/* <h3 className='vdupl_upltitle' style={{ color: "red" }}> <strong>Note:-</strong> Image file size should be less than 300 kb</h3>
                             */}
                            {/* </div> */}
                        </div>
                    </Box>
                    <Button variant="contained" onClick={saveUpiIdHandiler} disableElevation>
                        Submit
                    </Button>
                </TabPanel>
            </TabContext>


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
        </>
    )
}




const mapStateToProps = (state) => {
    return ({
        token: state.token,
        rftokn: state.rfTOken,
        ip: state.ip,
        did: state.deviceId,
        email: state.email,
        user_id: state.user_id
    })
}

export default connect(mapStateToProps)(BankDetails);