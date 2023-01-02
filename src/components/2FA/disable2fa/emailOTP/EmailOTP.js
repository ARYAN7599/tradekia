import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { URL } from "../../../../helpers/global";
import create_img from "../../../../assets/images/create_acc.jpg";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updToken, updRfToken, updOtpVerify } from "../../../../store/actions";
// import { requestFirebaseNotificationPermission } from '../../../../Firebase.js';
import Notification from "../../../../containers/Notification/Notification";
import Timer from "../../../../hooks/Timer";
import "./SCSS/EmailOTP.css";
// let axios = require('axios');
const EmailOTP = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { prevPath } = location.state;
  const [otp1, setOtp1] = useState("");
  const [otp2, setOtp2] = useState("");
  const [otp3, setOtp3] = useState("");
  const [otp4, setOtp4] = useState("");
  const [otp5, setOtp5] = useState("");
  const [otp6, setOtp6] = useState("");
  const [token, setToken] = React.useState();
  const [minutes, setMinutes] = useState("5");
  const [seconds, setSeconds] = useState("01");
  const [isLoading,setIsLoading] = useState(false); 
  //firebase init

  // React.useEffect(() => {
  //   requestFirebaseNotificationPermission()
  //       .then((firebaseToken) => {
  //          if(firebaseToken){
  //           setToken(firebaseToken);
  //          }else{
  //            alert("The notification permission was not granted and blocked instead");
  //          }
  //       }).catch((err) => {
  //           console.log("firbaseInitdsd",err);
  //         //   alert("The notification permission was not granted and blocked instead");
  //           return err;
  //       });
  // }, []);
  // Timer Code
  useEffect(() => {
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });
  // End Timer Code
  const otp1change = (event) => {
    setOtp1(event.target.value);
  };
  const otp2change = (event) => {
    setOtp2(event.target.value);
  };
  const otp3change = (event) => {
    setOtp3(event.target.value);
  };
  const otp4change = (event) => {
    setOtp4(event.target.value);
  };
  const otp5change = (event) => {
    setOtp5(event.target.value);
  };
  const otp6change = (event) => {
    setOtp6(event.target.value);
  };

  const logout = () => {
    console.log("Ldfhjdfbjhd",props); 
    props.saveToken("");
    props.saveRfToken("");
    props.saveIsOtpVerfy(false);
    navigate("/");
  };
  const verifyOtp = async () => {
    let OTP = otp1 + otp2 + otp3 + otp4 + otp5 + otp6;
    let data = JSON.stringify({
      email: `${props.email}`,
      otp: `${OTP}`,
    });
    console.log("Hello", data, "props.token", props.token);
    let config = {
      method: "post",
      url: `${URL}verifyEmailOTP`,
      headers: {
        "x-access-token": `${props.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        if (response.data.status) {
          props.saveIsOtpVerfy(true);
          toast.success("OTP matched successfully", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          if (prevPath === "/login") {
            navigate("/quickbuy");
          } else if (prevPath === "/profile") {
            navigate("/fa/disable2fa");
          }
        } else {
          toast.error("Please enter OTP correctly or refresh again", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
      .catch(function (error) {
        console.log(error);
        toast.error("Please enter OTP correctly or refresh again", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        logout();
      });
  };

  // const resendOTp=async ()=>{

  // }
  const sendEmailOTP = async () => {
    // let axios = require('axios');
    let data = JSON.stringify({
      email: `${props.email}`,
    });
    let config = {
      method: "post",
      url: `${URL}requestEmailOTP`,
      headers: {
        "x-access-token": `${props.token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    await axios(config)
      .then(function (response) {
        setMinutes("5");
        setSeconds("01");
        toast.info(
          "OTP sent successfully,Please check Your Registered Email to Verify it.",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      })
      .catch(function (error) {
        toast.error(error.message, {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        logout();
      });
  };

  useEffect(() => {
    let container = document.getElementsByClassName("otp_inp_div")[0];
    container.onkeyup = function (e) {
      let target = e.srcElement || e.target;
      let maxiLength = parseInt(target.attributes["maxLength"].value, 10);
      let myLength = target.value.length;
      if (myLength >= maxiLength) {
        let next = target;
        while ((next = next.nextElementSibling)) {
          if (next == null) break;
          if (next.tagName.toLowerCase() === "input") {
            next.focus();
            break;
          }
        }
      }
      // Move to previous field if empty (user pressed backspace)
      else if (myLength === 0) {
        let previous = target;
        while ((previous = previous.previousElementSibling)) {
          if (previous == null) break;
          if (previous.tagName.toLowerCase() === "input") {
            previous.focus();
            break;
          }
        }
      }
    };

    sendEmailOTP();
  }, []);

  return (
    <div className="container otp_main_div">
      <div className="otp_img_div">
        <img src={create_img} alt="login" />
      </div>
      <div className="container otp_div">
        <h1 style={{ marginBottom: "0px" }}>
          <span style={{ color: "#FEB101" }}>Verify </span>OTP
        </h1>
        <p className="otp_sub">Enter the OTP sent to your registered email </p>
     

        <div className="container otp_inp_div" style={{marginTop:'16px'}}>
          <input
            type="text"
            maxLength="1"
            id="otp1"
            className="otp_inp"
            value={otp1}
            onChange={otp1change}
          />
          <input
            type="text"
            maxLength="1"
            id="otp2"
            className="otp_inp"
            value={otp2}
            onChange={otp2change}
          />
          <input
            type="text"
            maxLength="1"
            id="otp3"
            className="otp_inp"
            value={otp3}
            onChange={otp3change}
          />
          <input
            type="text"
            maxLength="1"
            id="otp4"
            className="otp_inp"
            value={otp4}
            onChange={otp4change}
          />
          <input
            type="text"
            maxLength="1"
            id="otp5"
            className="otp_inp"
            value={otp5}
            onChange={otp5change}
          />
          <input
            type="text"
            maxLength="1"
            id="otp5"
            className="otp_inp"
            value={otp6}
            onChange={otp6change}
          />
        </div>

        {minutes === 0 && seconds === 0 ? (
          <button className="otp_acc_btn" onClick={sendEmailOTP}>
            Resend OTP
          </button>
        ) : (
          <>
            <p className="otp_sub">
              <span>Otp expire in</span> {minutes}:
              {seconds < 10 ? `0${seconds}` : seconds}
            </p>
           {otp1 === "" ||
            otp2 === "" ||
            otp3 === "" ||
            otp4 === "" ||
            otp5 === "" ||
            otp6 === "" ? (
              <button className="otp_acc_btn grey_submit">Submit</button>
            ) : (
              <button className="otp_acc_btn" onClick={verifyOtp}>
                Submit
              </button>
            )}
          </>
        )}
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
      <Notification />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    email: state.email,
    token: state.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    saveToken: (tkn) => dispatch(updToken(tkn)),
    saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
    saveIsOtpVerfy: (otpverify) => dispatch(updOtpVerify(otpverify)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailOTP);
