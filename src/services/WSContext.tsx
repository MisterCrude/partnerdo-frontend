import { createContext, ReactNode, useEffect, useRef } from 'react';

interface IWSContext {
    messages: string[];
}

export const WSContext = createContext<IWSContext>({ messages: [] });

interface IProps {
    children: ReactNode;
}

export const WSContextProvider = ({ children }: IProps) => {
    const socketRef = useRef<WebSocket>();

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${token}`);
            socketRef.current.onopen = () => {
                console.log('connected');
            };
            socketRef.current.onclose = ({ type }) => {
                console.log(type, 'disconnected');
            };
        } catch (error) {}

        return socketRef.current?.close;
    }, []);

    return <WSContext.Provider value={{ messages: [] }}>{children}</WSContext.Provider>;
};
