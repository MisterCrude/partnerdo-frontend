import { useState, useRef, useEffect } from 'react';
import { toCamelCase } from '@utils/convert';
import { IProfile } from '@models/profile';

type Sender = Pick<IProfile, 'username' | 'firstName' | 'lastName' | 'id'>;

interface Message {
    created: string;
    message: string;
    type: string;
    sender: Sender;
}

const useChat = (conversationId: string) => {
    const [messages, setMessages] = useState<Message[]>([]);
    const socketRef = useRef<WebSocket>();

    const token = localStorage.getItem('token');

    useEffect(() => {
        try {
            socketRef.current = new WebSocket(`ws://127.0.0.1:8000/ws/chat/dadfadfadf/?token=${token}`);

            socketRef.current.onopen = () => {
                console.log('connected');
            };
            socketRef.current.onmessage = (message) => {
                const newMessage = JSON.parse(message.data);

                setMessages((prevState) => [...prevState, newMessage]);
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
    }, [conversationId]);

    const sendMessage = (message: string) => {
        socketRef.current?.send(
            JSON.stringify({
                type: 'message',
                message,
            })
        );
    };

    return { messages, sendMessage };
};
export default useChat;
