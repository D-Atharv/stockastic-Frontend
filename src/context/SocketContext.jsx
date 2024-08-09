// SocketContext.js
import React, { createContext, useContext, useMemo } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
    const socket = useMemo(() => {
        return io('http://localhost:8000', {
            withCredentials: true,
        });
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
