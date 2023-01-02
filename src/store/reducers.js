import { GET_TOKEN, GET_RFTOKEN, GET_USRDATA,OTP_VERIFY, GET_IP,SET_SYMBLE } from "./actions";

const defaultState = {
    token: "",
    rfTOken: "",
    name: "",
    email: "",
    ip: "",
    deviceId: "",
    secretkey: "",
    id: "",
    payerSymble:"",
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case GET_TOKEN:
            return {
                ...state,
                token: action.token
            };

        case GET_RFTOKEN:
            return {
                ...state,
                rfTOken: action.rfToken
            };
case OTP_VERIFY:
    return {
        ...state,
        isotpverify:action.isotpverify
    };
        case GET_USRDATA:
            return {
                ...state,
                name: action.name,
                email: action.email,
                secretkey: action.secretkey,
                authenticator: action.authenticator,
                referral_code: action.referral_code,
                id:action.id,
                user_id:action.user_id,
                user_type:action.user_type
            };

        case GET_IP:
            return {
                ...state,
                ip: action.ip,
                deviceId: action.did
            };
        case SET_SYMBLE:{
            return{
                ...state,
                payerSymble:action.syPair
            }; 
        }

        default:
            return state;
    }
};

export default reducer;