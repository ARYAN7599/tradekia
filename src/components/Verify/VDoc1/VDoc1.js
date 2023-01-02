import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import passport from "../../../assets/images/passport.svg";
import id from "../../../assets/images/idcard.svg";
import dl from "../../../assets/images/dl.svg";

import "./VDoc1.css";

function VDoc1() {
  let location = useLocation();
  // console.log(location, "location");

  return (
    <div className="vdoc_maindiv">
      <h1>
        2
        <span
          style={{ fontSize: "1.3rem", fontWeight: "300", color: "#b8b8b8" }}
        >
          /3
        </span>{" "}
        Identification
      </h1>

      <div className="vdoc_card">
        <h3 className="vdoc_upltitle">Upload your Document</h3>
        <p className="vdoc_upltitle2">Select type of document</p>

        <div className="vdoc_flex">
          <div className="vdoc_flex2">
            <img src={passport} alt=" " className="vdoc_img" />
            <h3>Passport</h3>
            <Link
              to={"/verify/upload"}
              state={{
                firstNm: location.state.firstNm,
                midName: location.state.midName,
                lastName: location.state.lastName,
                dob: location.state.dob,
                addr: location.state.addr,
                pscode: location.state.pscode,
                cntry: location.state.cntry,
                city: location.state.city,
                idfrint: location.state.idfrint,
                idback: location.state.idback,
                idFilePhoto: location.state.idFilePhoto,
                panfrint : location.state.panfrint,
                action: location.state.action,
                idtype: "passport",
              }}
              className="vdoc_upl"
            >
              Select <ArrowUpwardIcon fontSize="16" />
            </Link>
          </div>

          <div className="vdoc_flex2">
            <img src={id} alt=" " className="vdoc_img" />
            <h3>ID Card</h3>
            <Link
              to={"/verify/upload"}
              state={{
                firstNm: location.state.firstNm,
                midName: location.state.midName,
                lastName: location.state.lastName,
                dob: location.state.dob,
                addr: location.state.addr,
                pscode: location.state.pscode,
                cntry: location.state.cntry,
                city: location.state.city,
                idfrint: location.state.idfrint,
                idback: location.state.idback,
                idFilePhoto: location.state.idFilePhoto,
                panfrint : location.state.panfrint,
                action: location.state.action,
                idtype: "idcard",
              }}
              className="vdoc_upl"
            >
              Select <ArrowUpwardIcon fontSize="16" />
            </Link>
          </div>

          <div className="vdoc_flex2">
            <img src={dl} alt=" " className="vdoc_img" />
            <h3>Driver's License</h3>
            <Link
              to={"/verify/upload"}
              state={{
                firstNm: location.state.firstNm,
                midName: location.state.midName,
                lastName: location.state.lastName,
                dob: location.state.dob,
                addr: location.state.addr,
                pscode: location.state.pscode,
                cntry: location.state.cntry,
                city: location.state.city,
                idfrint: location.state.idfrint,
                idback: location.state.idback,
                idFilePhoto: location.state.idFilePhoto,
                panfrint : location.state.panfrint,
                action: location.state.action,
                idtype: "driver license",
              }}
              className="vdoc_upl"
            >
              Select <ArrowUpwardIcon fontSize="16" />
            </Link>
          </div>
        </div>
      </div>

      <NavLink to="/verify" className="vdoc_prev">
        <ArrowLeftIcon /> Previous
      </NavLink>
    </div>
  );
}

export default VDoc1;
