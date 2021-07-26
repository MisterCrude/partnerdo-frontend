import { IWSMessage } from '@typing/api';
import { toCamelCase, toSnakeCase } from '@utils/convert';

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

    sendMessage<T extends unknown>(message: IWSMessage<T>) {
        return new Promise((resolve, reject) => {
            const stringifyMsg = JSON.stringify(toSnakeCase(message));

            SocketClient.socket.send(stringifyMsg);
            SocketClient.socket.onerror = () => reject();

            resolve(message);
        });
    }

    on<T>(callback: (message: IWSMessage<T>) => void) {
        SocketClient.socket.onmessage = (messageEvent: MessageEvent<string>) => {
            const message = JSON.parse(messageEvent.data);
            callback(toCamelCase(message));
        };
    }
}

export default SocketClient;
