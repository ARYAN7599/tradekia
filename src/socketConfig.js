import socketIOClient from "socket.io-client";
// const endpoint='http://localhost:5000';
const endpoint='https://p2p.tradekia.com/';
let socket;
export const connectSocket = () => {
    socket = socketIOClient(endpoint);
    return socket;
}

export const disconnect = () => {
    socket.disconnect();
}
