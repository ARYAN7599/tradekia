import * as React from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';
import InfiniteScroll from "react-infinite-scroll-component";
import { connect } from 'react-redux';
// import { fetchUserData } from '../store/actions';
import { fetchUserData } from '../store/reducers/fetchapi';
import store from '../store/store';
import Notification from './notify/Notification';


function NotificationScreen(props) {
    const [items, setItems] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [length, setLength] = React.useState();
    const [from, setFrom] = React.useState(10);
    const [hasMore, setHasMore] = React.useState(true);
    const fetchMoreData = () => {
        let arr = [];
        if (items.length >= length) {
            setHasMore(false);
            return;
        }
        setTimeout(async () => {
            let data = {
                "user_id": props.loggedUserId
            }

            await axios.post('https://cryptoxin.com/index.php/apis/home/getNotification', data)
                .then(result => {
                    if (!result.data.error) {
                        const res = result.data;
                        let recArr = res.data;
                        //console.log(recArr);
                        if (from + 10 > length) {
                            for (let i = from; i < length; i++) {
                                arr.push(recArr[i]);
                            }
                        } else {
                            for (let i = from; i < from + 10; i++) {
                                arr.push(recArr[i]);
                            }
                        }

                      
                    } else {
                        
                        alert('Something went wrong.Try sometime later');
                    }
                    // console.log(items);
                    // return recArr;
                })
                .catch(err => console.log(err));


            setItems(items.concat(arr));
            setFrom(from + 10);
        }, 500);


        arr = [];
    };




    React.useEffect(() => {
        const data = {
            "user_id": props.loggedUserId
        }
        axios.post('https://cryptoxin.com/index.php/apis/home/getNotification', data)
            .then(result => {
                if (!result.data.error) {
                    let res = result.data;
                    let arr = res.data;
                    setLength(arr.length);
                    if (arr.length < 10) {

                        for (let i = 0; i < arr.length; i++) {
                            items.push(arr[i]);
                        }
                    } else {
                        for (let i = 0; i < 10; i++) {
                            items.push(arr[i]);
                        }
                    }
                    setLoading(false);
                }
                setLoading(false);
           

            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div style={{ marginTop: 75, padding: ' 0 1rem' }}>
            <Typography variant="h4" sx={{ marginBottom: 1 }} className='col_header'>Notifications</Typography>
            {
                loading === true ?
                    <Stack spacing={1}>
                        <Skeleton />
                        <Skeleton animation="wave" />
                        <Skeleton animation={false} />
                    </Stack> : items.length === 0 ? <h2>No Notifications....</h2> :

                        <InfiniteScroll
                            dataLength={items.length}
                            next={fetchMoreData}
                            hasMore={hasMore}
                            loader={<Stack spacing={1}>
                                <Skeleton />
                                <Skeleton animation="wave" />
                                <Skeleton animation={false} />
                            </Stack>}
                            endMessage={
                                <p style={{ textAlign: "center" }}>
                                    <b>Yay! You have seen it all</b>
                                </p>
                            }
                        >

                            {items.map((i, index) => (
                                <div key={index} >
                                    <Notification
                                        id={i.notification_id}
                                        text={i.notification_text}
                                        type={i.type}
                                        time={i.added_on}
                                        postId={i.post_id}
                                        activistId={i.activist_id} />
                                </div>
                            ))}
                        </InfiniteScroll>
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return ({
        loggedUserId: state.reducers.id
    })
}

const mapDispatchToProps = (dispatch) => {
    return ({
        getUserData: () => store.dispatch(fetchUserData())
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen);