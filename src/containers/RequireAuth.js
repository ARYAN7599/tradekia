import { useLocation, Navigate, Outlet } from "react-router-dom";
import { connect } from 'react-redux';

const RequireAuth = (props) => {
    const location = useLocation();
    return (
    //    (props?.token&&props.isotpverify)?
    //    <Outlet />:props?.token?
    //     <Navigate to="/fa/emailotp" state={{ from: location }} replace />
    //     :<Navigate to="/login" state={{ from: location }} replace />
    (props.allowedRoles?.find(type => type===props.type)&&props.isotpverify && props.token)?
    <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />
    );
}



const mapStateToProps = (state) => {
    return ({
      token: state.token,
      type:state.user_type,
      isotpverify:state.isotpverify,
    })
  }
  
  
  export default connect(mapStateToProps)(RequireAuth);
// export default RequireAuth;