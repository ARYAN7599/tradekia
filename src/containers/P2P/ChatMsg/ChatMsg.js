import React , {memo} from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { Typography } from "@mui/material";
import { BiCheckDouble, BiCheck } from "react-icons/bi";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Slide from '@mui/material/Slide';
import CloseIcon from "@mui/icons-material/Close";
import { connect } from 'react-redux';
import './ChatMsg.css';
import { ImportantDevicesTwoTone } from "@mui/icons-material";
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  });
  
  
  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
      padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
      padding: theme.spacing(1),
    },
  }));
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
function ChatMsg(props) {
    const [user, setUser] = React.useState(false);
    const [seen, setSeen] = React.useState(props.seen);
    const [msgType, setMsgType] = React.useState(props.msgType);
    const [imgOpen , setImgOpen] = React.useState(false); 
    const [img ,setImg] = React.useState(); 

    React.useEffect(() => {
       
        if (props.messageBy === props.loggedUSerId) {
            setUser(true)
        } else {
            setUser(false)
        }
    }, [user]);

    const imgOpenHaindlar = (e,ig)=>{
        setImgOpen(true);
        setImg(ig)
    }
    const imgCloseHaindler =()=>{
        setImgOpen(false); 
    }

    return (
        <>        
        {(user === true) ?

            // <div style={{ width: '40%', marginBottom: '1rem', alignSelf: 'flex-end' }}>
            <div style={{ width: '80%', marginBottom: '1rem', alignSelf: 'flex-end' }}>
                <Card
                    outlined
                    sx={{ paddingBottom: 0,borderRadius:'10px' }} className="msg_card">
                    <CardContent sx={{ paddingBottom: 0 }}>
                        {
                            (msgType == "Text" || msgType == "text") ?
                                // <Typography sx={{ fontSize:'6',lineHeight:'0.9',letterSpacing:'0.00838em'}}> {props.msg}</Typography>
                                <span sx={{ fontSize:'6',lineHeight:'0.9',letterSpacing:'0.00838em'}}> {props.msg}</span>
                                 :
                                <img src={props.msg} onClick={(e)=>{imgOpenHaindlar(e,props.msg)}} style={{ objectFit: 'contain', cursor :'pointer', width: '80%' }} />
                                // <img src={props.msg} style={{ width: '20%' }} />
                        }
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            {/* <Typography sx={{ fontSize:'6',lineHeight:'0.9',letterSpacing:'0.00838em'}}>{props.time}</Typography> */}
                            <span sx={{ fontSize:'6',lineHeight:'0.9',backgroundColor:'red', color:'green', letterSpacing:'0.00838em'}}>{props.time}</span>
                            <IconButton aria-label="seen">
                                {
                                    seen == 0 ? <BiCheck /> : <BiCheckDouble color="#0171AE" />
                                }
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
            </div> :

            <div style={{ width: '80%',marginBottom: '1rem', alignSelf: 'flex-start' }}>
                <Card outlined sx={{ paddingBottom: 0,borderRadius:'10px'}} className="msg_card1">
                    <CardContent sx={{ paddingBottom: 0 }}>
                        {
                            (msgType == "Text" || msgType == "text") ?
                                <Typography sx={{ fontSize: 12  }}> {props.msg}</Typography> :
                                <img src={props.msg} onClick={(e)=>{imgOpenHaindlar(e,props.msg)}} style={{ objectFit: 'contain',cursor :'pointer', width: '80%' }} />
                        }
                        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                            <Typography>{props.time}</Typography>
                        </div>

                    </CardContent>
                </Card>
            </div>}
            <BootstrapDialog style={{ marginTop: '5rem' }} lg={5}
        className="bootbhuyform"
        onClose={imgCloseHaindler}
        aria-labelledby="customized-dialog-title"
        data-mdb-backdrop="static"
        maxWidth='xl'
        TransitionComponent={Transition}
        open={imgOpen}
      >
        <BootstrapDialogTitle
          id="customizeddd-dialog-title_option_sell"
          onClose={imgCloseHaindler}
        >
          {/* sell Open Qr code */}
        </BootstrapDialogTitle>
        <div className="wrapper2">
          <div className="wrapperImgs">
            <img src={img} className="wraprImgs" />
          </div></div>
      </BootstrapDialog>
            </>


    )
}

const mapStateToProps = (state) => {
    return {
        id: state.id,
        loggedUSerId: state.user_id,
        token: state.token,
        email: state.email,
        name: state.name,
        symbleP: state.payerSymble,
    };
};
export default connect(mapStateToProps, null)(memo(ChatMsg));