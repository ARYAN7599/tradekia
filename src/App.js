import React from 'react';
import { Routes, Route,useNavigate,Navigate,useLocation} from "react-router-dom";
import Dashboard from './containers/Dashboard/Dashboard';
import KycInfos from './containers/Dashboard/KycInfos';

import CreateAcc from './components/CreateAccount/CreateAcc';
import CrAccOtp from './components/CreateAccount/CreateAccOtp';
import Login from './components/Login/Login';
import ResetEmail from './components/ForgtPas/ResetEmail/ResetEmail';
import Otp from './components/ForgtPas/Otp/Otp';
import ConfirmPas from './components/ForgtPas/ConfirmPas/ConfirmPas';
import ReferralRegistration from './components/CreateAccount/ReferralRegistration.js';
import Home from './containers/Home/Home';
import EmailOTP from './components/2FA/disable2fa/emailOTP/EmailOTP';
import Fa3 from './components/2FA/fa3/Fa3';
import Admin from './containers/Admin/Admin';
import QuickBuy from "./containers/QuickBuy/QuickBuy";  
import { connect } from 'react-redux';
import RequireAuth from './containers/RequireAuth';
import ChartView from './containers/TradeChart/ChartLive'; 
import Aboutus from './components/Dashboard/Aboutus';
import TermsConditions from './components/Dashboard/TermsConditions';
import PrivacyPolicy from './components/Dashboard/PrivacyPolicy';
import { requestFirebaseNotificationPermission,onMessageListener } from './Firebase.js';

import Setorder from './containers/MakeOrders/Setorders.js';

const ROLES = {
  'User': 2,
  'Editor': 1984,
  'Admin': 1
}
function App(props) {
  React.useEffect(() => {
    requestFirebaseNotificationPermission()
        .then((firebaseToken) => {
          console.log("JJJJJJJJJJJ",firebaseToken); 
            // setToken(firebaseToken);
      
        }) .catch((err) => {
          console.log("EEEEEEEEE",err); 
            return err;
        });

    // onMessageListener().then((res)=>{
    //   console.log("CCCCCCCCCc",res); 
    // })

        // return function cleanup() {
        //     disconnect();
        // }
}, [])

  const navigate = useNavigate();
  const location = useLocation();
  let routes = (
    <Routes>
      <Route path={"/confirm"} element={<ConfirmPas />} />
      {/*<Route path={"/admin"} element={<Admin />} /> */}
      <Route path={"/resetotp"} element={<Otp />} />
      <Route path={"/reset"} element={<ResetEmail />} />
      <Route exact path={"/createaccount/otp"} element={<CrAccOtp />} />
      <Route exact path={"/createaccount"} element={<CreateAcc />} />
      <Route exact path={"/createaccount/:id"} element={<ReferralRegistration />} />
    
      <Route path={"/chartLive"} element={<ChartView/>} />
      <Route path="/" element={<Dashboard />} />
      <Route path={"/aboutus"} element={<Aboutus />} />
       <Route path="/KycInfos" element={<KycInfos />} />

      <Route path={"/trmsConditions"} element={<TermsConditions />} />
      <Route path={"/prvacyplcy"} element={<PrivacyPolicy />} />
      {/* <Route element={<RequireAuth  />}> */}
      <Route exact path='/fa/emailotp' element={<EmailOTP />} />
      <Route path="/fa/verification" element={<Fa3 />} /> 
      {/* <Route exact path="/quickbuy" element={<QuickBuy/>}/> */}
      {/* </Route> */}
      {/* //private route */}
      <Route path={"/login"} element={<Login />} />
      <Route element={<RequireAuth allowedRoles={[ROLES.User]}   />}>
      <Route path={"*"} element={<Home />} />
      </Route>
      <Route element={<RequireAuth allowedRoles={[ROLES.Admin]}  />}>
      <Route path={"*"} element={<Admin />} />
      </Route>
    </Routes>
  );
  
  // if (props.token && props.type===1) {
  //     console.log("here is admin route "); 
  //     routes = (
  //       <Routes>
  //         <Route path={"*"} element={<Admin />} />
  //       </Routes>
  //     )
  //   }else if(props.token&&props.type===2){
  //     routes = (
  //       <Routes>
  //         <Route path={"*"} element={<Home />} />
  //       </Routes>
  //     )
  //   }else{
  //     console.log("Hello friends"); 
      
  //     // navigate('/login');
  //   // <Navigate to="/" replace state={{ from: location }} />
  //   // <Navigate to="/login" replace state={{ from: location }} />
  //   <Navigate to="/login" replace />;
      
      
  //   }
    
  // if(props.token){
  //   routes = (
  //           <Routes>
  //             <Route path={"*"} element={<Home />} />
  //           </Routes>
  //         )
  // }
 
  return (
    <div className="App">
      {routes}
    </div>
  );
}
const mapStateToProps = (state) => {
  return ({
    token: state.token,
    type:state.user_type
    
  })
}


export default connect(mapStateToProps)(App);
