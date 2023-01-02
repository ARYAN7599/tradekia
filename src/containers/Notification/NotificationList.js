import React , {memo} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { URL } from "../../helpers/global";
import axios from "axios";
import Stack from '@mui/material/Stack';
import { connect } from 'react-redux';
// Importing material UI components
import List from "@material-ui/core/List";
import ListSubheader from "@material-ui/core/ListSubheader";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import Collapse from "@material-ui/core/Collapse";
import Checkbox from "@material-ui/core/Checkbox";
import Box from "@mui/material/Box";
// Importing material UI icons
import InboxIcon from "@material-ui/icons/MoveToInbox";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";
import InfiniteScroll from "react-infinite-scroll-component";
import Skeleton from "@mui/material/Skeleton";
import { ReorderRounded } from "@mui/icons-material";

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		maxWidth: 360,
		backgroundColor: theme.palette.background.paper,
	},
	nested: {
		paddingLeft: theme.spacing(4),
	},
	demo: {
		backgroundColor: theme.palette.background.paper,
	},
}));

const NotificationList = (props) => {
	const classes = useStyles();
	const navigate = useNavigate();
	const [page, setPage] = React.useState(1);
	const [hasMore, setHasMore] = React.useState(true);
	const [open, setOpen] = React.useState(true);
	const [secondary, setSecondary] = React.useState(false);
	const [loading, setLoading] = React.useState(false);
	const [rowData, setRowData] = React.useState([]);
	const [totalNoti, setTotalNoti] = React.useState();
	const handleClick = () => {
		setOpen(!open);
	};

	const fetchMoreData = async () => {
		let arr = [];
		console.log("KKKKKKKK", page, "KKKKKKKKKKKKKKK", rowData.length);
		// setTimeout(async () => {
		let data = {
			"user_id": props.userId,
			"page_no": page
		};
		let config = {
			method: "POST",
			url: `${URL}/getUsersNotifications`,
			headers: {
				"Content-Type": "application/json",
				'x-access-token': `${props.token}`
			},
			data: data,
		};
		await axios(config).then(async (response) => {
			console.log("UUUUUUUU", response);
			let res = response.data.data;
			if (res && res.length > 0) {
				await setRowData(rowData.concat(res));
				setPage(prevPage => prevPage + 1);
			} else {
				setHasMore(false);
				return;
			}

		}).catch(err => console.log(err));

		// }, 100);


		arr = [];
	};
	function removeObjectWithId(arr, id) {
		const arrCopy = Array.from(arr);
		const objWithIdIndex = arrCopy.findIndex((obj) => obj.id === id);
		arrCopy.splice(objWithIdIndex, 1);
		return arrCopy;
	}

	const readNotification = async (e, id, type) => {
		console.log("KKKKKKKK ", type);
		try {
			let data = {
				"noti_id": id
			};
			let config = {
				method: "POST",
				url: `${URL}/reedNotifications`,
				headers: {
					"Content-Type": "application/json",
					'x-access-token': `${props.token}`
				},
				data: data
			};
			await axios(config).then(async function (res) {
				if (res.data.status) {
					const newArr = removeObjectWithId(rowData, id);
					setRowData(newArr);
					if (type === "P2P Orders") {
						navigate('/p2p');
					}

				}
			}).catch(function (error) {
				console.log("first Error", error);
				setLoading(false);
			});
		} catch (err) {
			console.log(err);
			setLoading(false);
		}

	}

	const deleteNotification = async (e, id) => {
		try {
			let data = {
				"noti_id": id
			};
			let config = {
				method: "POST",
				url: `${URL}/deleteNotifications`,
				headers: {
					"Content-Type": "application/json",
					'x-access-token': `${props.token}`
				},
				data: data
			};
			await axios(config).then(async function (res) {
				if (res.data.status) {
					const newArr = removeObjectWithId(rowData, id);
					setRowData(newArr);
				}
			}).catch(function (error) {
				console.log("first Error", error);
				setLoading(false);
			});
		} catch (err) {
			console.log(err);
			setLoading(false);
		}

	}
	const getpaindingnotifications = async () => {
		setLoading(true);
		try {
			let data = {
				"user_id": props.userId,
				"page_no": 0
			};
			let config = {
				method: "POST",
				url: `${URL}/getUsersNotifications`,
				headers: {
					"Content-Type": "application/json",
					'x-access-token': `${props.token}`
				},
				data: data
			};
			await axios(config).then(async function (res) {

				if (res?.data?.data?.length > 0) {
					let rdata = res?.data?.data;
					setLoading(false);
					setRowData(rdata);
				} else {
					setLoading(false);
					setHasMore(false);
					return;
				}
			}).catch(function (error) {
				console.log("first Error", error);
				setLoading(false);
			});
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	}

	React.useEffect(() => {
		getpaindingnotifications()
	}, []);

	return (
		<Grid item xs={12} md={12}>
			<div className={classes.demo}>
				{/* If checkbox is ticked then secondary text will be shown otherwise not */}
				<Checkbox
					checked={secondary}
					onChange={(event) => setSecondary(event.target.checked)}
				/>
				<List
					component="nav"
					aria-labelledby="nested-list-subheader"
					subheader={
						<ListSubheader component="div" id="nested-list-subheader">
							mark the checkbox above to see sublist
						</ListSubheader>
					}
					className={classes.root}
				>
					<ListItem button onClick={handleClick}>
						<ListItemIcon>
							<InboxIcon />
						</ListItemIcon>
						<ListItemText primary="Withdrow painding" />
						{/*code to open and closed list*/}
						{open ? <ExpandLess /> : <ExpandMore />}
					</ListItem>
					{loading ?
						<Box sx={{ height: 500, width: '100%' }}>
							<Skeleton />
							<Skeleton animation="wave" />
							<Skeleton animation={false} />
						</Box> : rowData.length === 0 ? <h4 style={{ marginLeft: '89px', color: "red", textAlign: "center" }} >No unread notification....</h4> :
							<InfiniteScroll dataLength={rowData.length}
								next={fetchMoreData}
								hasMore={hasMore}
								loader={
									<Box sx={{ width: '100%' }}>
										<Skeleton />
										<Skeleton animation="wave" />
										<Skeleton animation={false} />
									</Box>
								}
								endMessage={
									<p style={{ textAlign: "center" }}>
										<b>Yay! You have seen it all</b>
									</p>
								}
								style={{ display: 'flex', flexWrap: 'wrap' }}
							>

								<Collapse in={open} timeout="auto" unmountOnExit>
									{/*List item are wrapped inside List */}
									<List component="div" disablePadding>
										{rowData && rowData.length > 0 ?
											rowData.map((el, i) => {
												return (
													<ListItem> {/* Single list item */}
														<ListItemAvatar>
															<Avatar>
																<FolderIcon />
															</Avatar>
														</ListItemAvatar>
														<ListItemText onClick={(e) => readNotification(e, el.id, el.type)}
															primary={el.title}
															secondary={
																secondary ? el.discription : null
															}
															sx={{ cursor: "pointer" }}
														/>
														<ListItemSecondaryAction>
															{/*Inside the IconButton, we can render various icons*/}
															<IconButton edge="end" onClick={(e) => deleteNotification(e, el.id)} aria-label="delete">
																<DeleteIcon />
															</IconButton>
														</ListItemSecondaryAction>
													</ListItem>
												);

											})
											: 'Notification Not Found'}
									</List>
								</Collapse>
							</InfiniteScroll>

					}
				</List>
			</div>
		</Grid>
	);
}

const mapStateToProps = (state) => {
	return {
		token: state.token,
		rftokn: state.rfTOken,
		id: state.id,
		userId: state.user_id,
		ip: state.ip,
		did: state.deviceId,
		email: state.email,
	};
};
export default connect(mapStateToProps)(memo(NotificationList));
