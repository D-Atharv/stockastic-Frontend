import { io } from 'socket.io-client';

let socket;

const getSocket = () => {
    if (!socket) {
        socket = io('http://localhost:8000', {
            withCredentials: true,
        });
    }
    return socket;
};

export default getSocket;
