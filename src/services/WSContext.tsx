import { createContext, ReactNode, useEffect, useRef, useState } from 'react';
import { IWSMessage, RequestStatus } from '@typing/api';

interface IWSContext {
    WSMessage?: IWSMessage;
    onSendWSMessage?: (WSMessage: IWSMessage) => void;
    WSConnectStatus?: RequestStatus;
}

export const WSContext = createContext<IWSContext>({});

interface IProps {
    children: ReactNode;
}

export const WSContextProvider = ({ children }: IProps) => {
    const [message, setMessage] = useState<IWSMessage>();
    const [WSConnectStatus, setWSConnectStatus] = useState(RequestStatus.IDLE);

    const socketRef = useRef<WebSocket>();

    const handleOpenConnection = () => setWSConnectStatus(RequestStatus.SUCCESS);
    const handleCloseConnection = () => setWSConnectStatus(RequestStatus.ERROR);
    const handleReceiveMessage = (message: MessageEvent<string>) => setMessage(JSON.parse(message.data));
    const handleSendMessage = <T extends unknown>(WSMessage: IWSMessage<T>) =>
        socketRef.current?.send(JSON.stringify(WSMessage));

    useEffect(() => {
        try {
            const token = localStorage.getItem('token');

            if (!token) return;

            setWSConnectStatus(RequestStatus.FETCHING);

            socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/?token=${token}`);
            socketRef.current.onopen = handleOpenConnection;
            socketRef.current.onmessage = handleReceiveMessage;
            socketRef.current.onclose = handleCloseConnection;
        } catch (error) {
            setWSConnectStatus(RequestStatus.ERROR);
            console.error(error);
        }

        return socketRef.current?.close;
    }, []);

    return (
        <WSContext.Provider value={{ WSMessage: message, onSendWSMessage: handleSendMessage, WSConnectStatus }}>
            {children}
        </WSContext.Provider>
    );
};
