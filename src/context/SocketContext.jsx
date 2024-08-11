import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'js-cookie';


const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        // const socketInstance = io(import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000');
        const socketInstance = io(import.meta.env.VITE_NEXT_PUBLIC_SERVER_URL || 'http://localhost:8000', {
            auth: {
                token: Cookies.get('jwt'),
            },
        });
        setSocket(socketInstance);

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    return useContext(SocketContext);
};
