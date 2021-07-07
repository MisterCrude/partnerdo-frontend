import { WSMessageTypes } from '@typing/api';

class SocketClient {
    static socket: WebSocket;
    private url: string;

    constructor(url: string) {
        this.url = url;
    }

    connect() {
        const token = localStorage.getItem('token');

        return new Promise((resolve, reject) => {
            SocketClient.socket = new WebSocket(`ws://127.0.0.1:8000/ws/?token=${token}`);

            SocketClient.socket.onerror = () => reject();
            SocketClient.socket.onopen = () => resolve(SocketClient.socket?.readyState);
        });
    }

    disconnect() {
        return new Promise((resolve, reject) => {
            SocketClient.socket?.close();

            SocketClient.socket.onerror = () => reject();
            SocketClient.socket.onclose = () => resolve(SocketClient.socket.readyState);
        });
    }

    sendMessage<T>(msg: T) {
        return new Promise((resolve, reject) => {
            const message = JSON.stringify(msg);

            SocketClient.socket.send(message);

            SocketClient.socket.onerror = () => reject();
            resolve(message);
        });
    }

    on(messageType: WSMessageTypes, callback: () => void) {
        return new Promise((resolve, reject) => {
            resolve('');
        });
    }
}

export default SocketClient;
