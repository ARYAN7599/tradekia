export const GET_TOKEN = 'GET_TOKEN';
export const GET_RFTOKEN = 'GET_RFTOKEN';
export const GET_USRDATA = 'GET_USRDATA';
export const GET_IP = 'GET_IP';
export const SET_SYMBLE='SET_SYMBLE'; 
export const OTP_VERIFY='OTP_VERIFY'; 

export const updToken = value => ({
    type: GET_TOKEN,
    token: value
});
 export const updOtpVerify = value =>({
    type: OTP_VERIFY,
    isotpverify:value,
 })

export const updRfToken = value => ({
    type: GET_RFTOKEN,
    rfToken: value
});

export const updUserData = (name, email, secretkey, authenticator, referral_code, id,user_id,user_type) => ({
    type: GET_USRDATA,
    name: name,
    email: email,
    secretkey: secretkey,
    authenticator: authenticator,
    referral_code: referral_code,
    id: id,
    user_id:user_id,
    user_type:user_type

});

export const updIP = (ip, did) => ({
    type: GET_IP,
    ip: ip,
    did: did
});

export const saveSymblePair=(syPair)=>({
    type:SET_SYMBLE,
    syPair:syPair
}); 

