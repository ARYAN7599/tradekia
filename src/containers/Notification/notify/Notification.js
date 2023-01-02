import React from "react";
import { Link as RouterLink, useHistory } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Masonry from '@mui/lab/Masonry';
import './Notification.css';
import axios from "axios";
function Notification(props) {
    const history = useHistory();
    const [avImg, setAvImg] = React.useState(null);
    const [type, setType] = React.useState(props.type);
    const [post, setPost] = React.useState();
    const [postAv, setPostAv] = React.useState();
    const [postName, setPostName] = React.useState();
    const [postImg, setPostImg] = React.useState([]);
    const [isImage, setIsImage] = React.useState(false);
    const [isVideo, setIsVideo] = React.useState(false);
    function imgZoomHandler() {
        var modal = document.getElementById("img_mymodal");
        var modalImg = document.getElementById("postimg");
        modal.style.display = "block";
        modalImg.src = this.src;
    }

    const spanClickHandler = () => {
        var modal = document.getElementById("img_mymodal");
        modal.style.display = "none";
    }


    React.useEffect(() => {
        const data = {
            "user_id": props.activistId,
            "accessed_by": props.activistId

        }
        axios.post('https://cryptoxin.com/index.php/apis/home/getUserProfile', data)
            .then(res => {
                if (!res.data.error) {
                    if (res) {
                        let response = res.data.data;
                        setAvImg(response.image);
                    }
                } else {
                    alert('Something went wrong.Try sometime later');
                }
            })
    }, [])

    React.useEffect(() => {
        if (type === "post" && props.activistId != 21) {
            const data = {
                "post_id": props.postId,
                "user_id": props.activistId
            }
            axios.post('https://cryptoxin.com/index.php/apis/home/getSinglePost', data).
                then(res => {
                    if (!res.data.error) {
                        const response = res.data.data;
                        //console.log(response, props.postId);
                        if (response.description) {
                            setPost(response.description);
                        }
                        setPostAv(response.user_image);
                        setPostName(response.user);
                        if (response.images.length !== 0) {
                            setPostImg(response.images);
                            const file = response.images[0];
                            if (file.includes("mp4")) {
                                setIsVideo(true);
                                setIsImage(false);
                            } else {
                                setIsImage(true);
                            }
                        }
                    } else {
                        alert('Something went wrong.Try sometime later');
                    }
                }).catch(err => console.log(err))
        }
    }, []);

    const goToSinglePost = () => {
        history.push(`/post/${props.postId}`);
    }

    return (
        <Card outlined className="notif_card">
            <div>
                <RouterLink to={{ pathname: `/profile`, search: `id=${props.activistId}`, }} style={{ textDecoration: 'none' }}>
                    {
                        (avImg == null) ? <Avatar sx={{ height: 35, width: 35 }} /> :
                            <Avatar src={avImg} sx={{ height: 35, width: 35 }} />
                    }
                </RouterLink>
            </div>

            <div style={{ paddingLeft: 10 }}>
                <Typography sx={{ fontSize: '1.3rem' }}>{props.text}</Typography>
                <Typography>{props.time}</Typography>

                {
                    (type == "post" && post) ?
                        //<RouterLink to={{ pathname: `/post/:${props.postId}`, state: { id: props.postId } }} style={{ textDecoration: 'none' }}>
                        <Card sx={{ margin: 1, padding: 1, cursor: 'pointer', backgroundColor: '#d1e1e9' }} onClick={goToSinglePost}>
                            {/* <CardHeader
                                avatar={
                                    <Avatar src={postAv} sx={{ height: 35, width: 35 }} />
                                }
                                title={postName}
                            /> */}
                            {/* <Typography sx={{ fontSize: 13 }}>{post}</Typography> */}
                            <div dangerouslySetInnerHTML={{ __html: `${post}` }} style={{ fontSize: 13 }} />
                            {
                                (isVideo) ?
                                    <div >
                                        <video width="350" height="250" controls >
                                            <source src={postImg[0]} type="video/mp4" />
                                        </video>
                                    </div> : (postImg.length > 1) ?

                                        <div columns={3} spacing={1} className="notif_img_stack">
                                            {postImg.map((item, index) => (
                                                <div key={index}>
                                                    <img
                                                        src={item}
                                                        loading="lazy"
                                                        style={{ borderBottomLeftRadius: 4, borderBottomRightRadius: 4 }}

                                                    />

                                                    {/* <div id="img_mymodal" class="img_modal" onClick={spanClickHandler}>
                                                        <span class="img_close" onClick={spanClickHandler}>&times;</span>
                                                        <img class="img-modal-content" id="postimg" />
                                                    </div> */}
                                                </div>
                                            ))}
                                        </div> :


                                        postImg.map((i, index) => (
                                            <div key={index} className="post_img_container">
                                                <img src={i} />
                                                {/* <div id="img_mymodal" class="img_modal" onClick={spanClickHandler}>
                                                    <span class="img_close" onClick={spanClickHandler}>&times;</span>
                                                    <img class="img-modal-content" id="postimg" />
                                                </div> */}
                                            </div>
                                        ))
                            }


                        </Card>
                        //</RouterLink> 
                        : null

                }
            </div>
        </Card>
    );
}

export default Notification;