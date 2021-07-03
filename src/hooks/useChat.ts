import { useState, useRef, useEffect } from 'react';
import { ChatroomMessage } from '@typing/chat';
import { WSMessageTypes, IWSMessage } from '@typing/api';
import { toCamelCase } from '@utils/convert';

const useChat = (chatroomId: string) => {
    const [messages, setMessages] = useState<ChatroomMessage[]>([]);
    const socketRef = useRef<WebSocket>();

    const token = localStorage.getItem('token');

    useEffect(() => {
        try {
            socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${chatroomId}/?token=${token}`);
            socketRef.current.onopen = () => {
                console.log('connected');
            };
            socketRef.current.onmessage = (message) => {
                const WSMessage = JSON.parse(message.data) as IWSMessage<ChatroomMessage[]>;
                const mormalizedResponse = WSMessage.message.map((item) => toCamelCase(item));

                if (WSMessage.type === WSMessageTypes.SEND_CHATROOM_MESSAGES) {
                    setMessages(mormalizedResponse);
                } else {
                    setMessages([]);
                }
            };
            socketRef.current.onclose = ({ type }) => {
                console.log(type, 'disconnected');
            };
        } catch (error) {
            console.error("Can't opent WS connection");
        }

        return () => {
            socketRef.current?.close();
        };
    }, [chatroomId]);

    const sendMessage = (message: string) => {
        const WSMessage: IWSMessage<string> = {
            type: WSMessageTypes.SEND_CHATROOM_MESSAGES,
            message,
        };

        socketRef.current?.send(JSON.stringify(WSMessage));
    };

    return { messages, sendMessage };
};
export default useChat;
