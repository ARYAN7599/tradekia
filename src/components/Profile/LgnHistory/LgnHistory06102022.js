import React from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { ArrowForwardIos, ArrowBackIos } from "@mui/icons-material";

import { URL } from "../../../helpers/global";

import { connect } from 'react-redux';
import { updToken, updRfToken } from "../../../store/actions";

import './LgnHistory.css';

import LgnHistoryTable from "./LgnHistoryTable";

function LgnHistory(props) {
    const [lgHist, setLgHist] = React.useState([]);
    const [page, setPage] = React.useState(1);
    const [length, setLength] = React.useState();

    const onPrev = () => {
        setPage(page - 1);
    }
    const onNext = () => {
        setPage(page + 1);
    }
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

    React.useEffect(() => {

        const data = {
            "email": props.email
        }
        axios.post(`${URL}getHistory`, data, {
            headers: {
                'x-access-token': props.token
            }
        }).then(res => {
                if (res.data.status) {
                    let arr = res.data.data;
                    setLength(arr.length);
                    setLgHist(arr);
                }
            }).catch(error => {
                if (error.response.status == 401) {
                    refreshtokn();
                }
            });

    }, [page]);

    if (!lgHist) {
        return <h2>Loading....</h2>;
    }


    return (
        <div className="prlgn_div">
            <Grid container sx={{ justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <h2 className="prlgn_title">Login History</h2>

                <div>
                    <IconButton onClick={onPrev} disabled={page <= 1} >
                        <ArrowBackIos sx={{ fontSize: 17 }} />
                    </IconButton>
                    <IconButton onClick={onNext} disabled={length < 10}>
                        <ArrowForwardIos sx={{ fontSize: 17 }} />
                    </IconButton>
                </div>
            </Grid>
            <LgnHistoryTable lgnhist={lgHist} />

            <Grid container sx={{ justifyContent: 'flex-end' }}>
                <IconButton onClick={onPrev} disabled={page <= 1}>
                    <ArrowBackIos sx={{ fontSize: 17 }} />
                </IconButton>
                <IconButton onClick={onNext} disabled={length < 10}>
                    <ArrowForwardIos sx={{ fontSize: 17 }} />
                </IconButton>
            </Grid>
        </div>

    );
}

const mapStateToProps = (state) => {
    return ({
        email: state.email,
        token: state.token,
        rftokn: state.rfTOken,
        ip: state.ip,
        did: state.deviceId,
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        saveToken: (tkn) => dispatch(updToken(tkn)),
        saveRfToken: (rftkn) => dispatch(updRfToken(rftkn)),
    })
}


export default connect(mapStateToProps , mapDispatchToProps)(LgnHistory);