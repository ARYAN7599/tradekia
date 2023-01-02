import React , { memo } from 'react';
import { connectSocket, disconnect } from '../../socketConfig';
import { useLocation, useNavigate, Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import { URL } from "../../helpers/global";
import { styled } from '@mui/material/styles';
import { Box, } from '@mui/system';
import { Typography } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { BiChevronLeft, BiCamera, BiVideo } from "react-icons/bi";
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import Picker from 'emoji-picker-react';
import { connect } from 'react-redux';

import './ChatScreen.css';
import ChatMsg from './ChatMsg/ChatMsg';
const scrollToBottom = () => {
    var myDiv = document.getElementsByClassName("chat_msg_div")[0];
    myDiv.scrollTop = myDiv.scrollHeight;
}
const SendMsgBox = styled(TextField)(({ theme }) => ({
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '5rem',
        },

    }
}));

function ChatScreen(props) {
    const history = useNavigate();
    const { state } = useLocation();
    const [msgsArr, setMsgsArr] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [onlineStatus, setOnlineStatus] = React.useState(true);
    const [loading2, setLoading2] = React.useState(true);
    const [recName, setRecName] = React.useState(null);
    const [recAv, setRecAv] = React.useState(null);
    const [roomId, setRoomId] = React.useState();
    const [chatMsg, setChatMsg] = React.useState();
    const [socket2, setSocket2] = React.useState();
    const [chosenEmoji, setChosenEmoji] = React.useState(null);
    const [isimogiesOpen, setIsimogiesOpen] = React.useState(false);




    // const choseEmojiHandaler = ()=>{
    //     setIsimogiesOpen(!isimogiesOpen)

    // }
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };
    const goBack = () => {
        disconnect();
        history(-1)
    }


    const msgChangeHandler = (event) => {
        setChatMsg(event.target.value);
    }

    const sendMsgHandler = () => {
        if (chatMsg) {
            var c = socket2.emit('sendMessage', {
                "room_id": `${roomId}`,
                "order_id": `${props.mid}`,
                "sender": `${props.loggedUSerId}`,
                "receiver": `${props.rid}`,
                "msgtxt": `${chatMsg}`,
                "msgType": "Text"
            });
        }
        setChatMsg('');
    }

    const sendImgChangeHandler = (event) => {
        console.log("Hellllllllllll", event);
        let bodyFormData = new FormData();
        bodyFormData.append('image', event.target.files[0], event.target.files[0].name);
        axios.post(`${URL}uploadImage`, bodyFormData, {
            headers: {
                'Content-Type': 'multipart/form-data, application/json',
                'Accept': 'application/json, multipart/form-data',
            }
        }).then(res => {
            console.log("***************", res.data);
            if (res.data.status) {
                socket2.emit('sendMessage', {
                    "room_id": `${roomId}`,
                    "order_id": `${props.mid}`,
                    "sender": `${props.loggedUSerId}`,
                    "receiver": `${props.rid}`,
                    "msgtxt": `${res.data.img}`,
                    "msgType": "image"
                })
            } else {
                alert('Something went wrong.Try sometime later');
            }
        }).catch(err => console.log(err))

    }

    //connection
    React.useEffect(() => {
        console.log("props.loggedUSerId", props.loggedUSerId, "props.rid", props.rid);
        const socket = connectSocket();
        setSocket2(socket);
        socket.emit("connection");

        socket.emit('establishConnection', { "user_id": `${props.loggedUSerId}` });

        socket.emit('openChatBox', { "sender_id": `${props.loggedUSerId}`, "receiver_id": `${props.rid}` });

        socket.on('getRoomId', data => {
            setRoomId(data.room_id);
            setInterval(() => {
                socket.emit('getLastThirtyMessages', {
                    "room_id": `${data.room_id}`,
                    "sender": props.loggedUSerId,
                    "receiver": `${props.rid}`,
                    "mid": `${props.mid}`
                })
                socket.on('sendLastThirtyMessages', data => {
                    const l = data.messages.length;
                    setMsgsArr([...data.messages])
                    if (l > 0) {
                        setOnlineStatus(data.messages[l - 1].onlineStatus);
                    }

                    setLoading(false)

                })

            }, 1000);
        })
        return function cleanup() {
            disconnect();
        }

    }, [])

    React.useEffect(() => {
        setRecName(`${props.username}`);
        setRecAv("https://assets.coingecko.com/coins/images/24012/small/logo.jpg?1646030643");
        setLoading2(false);
    }, [])



    const verifyName = (
        <div className="verify_flex">
            <div>
                < RouterLink to={{ pathname: `/profile`, search: `id=18`, }} style={{ textDecoration: 'none', color: 'black' }}>
                    <Typography sx={{ fontSize: 8, paddingLeft: 2 }}>{recName}</Typography>
                </RouterLink >

                {
                    (!onlineStatus) ?
                        <Typography sx={{ color: '#0171AE', fontSize: 8, paddingLeft: 2 }}>online</Typography> : null
                }
            </div>

            {/* {
                props.verified ?
                    <img src={verifyImg} alt="Verify" style={{ height: '2.5rem', width: '2.5rem', marginLeft: 5 }} />
                    : null
            } */}
        </div>
    )

    return (
        // <div style={{ marginTop: 82, padding: ' 0 1rem' }}>
        <div >
            <Box className="chat_div chat_box">
                <div className="chat_header_div">
                    <div className='chat_head_fl'>
                        <IconButton aria-label="back"
                            onClick={goBack}>
                            <BiChevronLeft fontSize={30} />
                        </IconButton>
                        <Avatar src={recAv} />
                        {verifyName}
                    </div>

                </div>

                <div className="chat_msg_div" id="style-6" onLoad={scrollToBottom}>

                    {
                        (loading) ? <Stack spacing={1}>
                            <Skeleton />
                            <Skeleton animation="wave" />
                            <Skeleton animation={false} />
                        </Stack> :
                            (
                                msgsArr.map((i, index) => (

                                    <ChatMsg
                                        key={index}
                                        msg={i.last_message}
                                        time={i.last_message_time}
                                        messageBy={i.message_by}
                                        seen={i.seen_status}
                                        msgType={i.message_type} />
                                ))
                            )
                    }
                </div>
                <div className="chat_text_div">
                    <SendMsgBox
                        id="send msg"
                        label="Type Your Message"
                        variant="outlined"
                        multiline
                        sx={{ width: '88%' }}
                        value={chatMsg}
                        onChange={msgChangeHandler}

                    />
                    <div>
                        <label for="sendImgMsg">
                            <BiCamera fontSize={30} sx={{ cursor: 'pointer' }} />
                        </label>
                        <input type="file" id="sendImgMsg" accept="image/*" style={{ display: 'none' }} onChange={sendImgChangeHandler} />
                    </div>
                    {/* <SendIcon sx={{ color: '#0171AE', height: 27, width: 27, cursor: 'pointer' }} onClick={setIsimogiesOpen(!isimogiesOpen)} /> */}

                    {/* {isimogiesOpen? */}
                    {/* <div>
                        {chosenEmoji ? (
                            <span>You chose: {chosenEmoji.emoji}</span>
                        ) : (
                            <span>No emoji Chosen</span>
                        )}
                        <Picker onEmojiClick={onEmojiClick} />
                    </div> */}
                    {/* :''} */}

                    <SendIcon sx={{ color: '#0171AE', height: 27, width: 27, cursor: 'pointer' }} onClick={sendMsgHandler} />
                </div>
            </Box>
        </div>
    );
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

export default connect(mapStateToProps)(memo(ChatScreen));