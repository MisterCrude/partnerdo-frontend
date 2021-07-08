import { Middleware, AnyAction } from 'redux';
import { RootState } from '@src/store/rootReducer';
import { WSReadyState } from '@typing/api';
import { BASE_URL } from '@consts/api';

import SocketClient from '@services/socketClient';

const socket = new SocketClient(BASE_URL);

export const socketMiddleware: Middleware<Record<string, unknown>, RootState> = ({ dispatch }) => {
    return (next) => async (action: AnyAction) => {
        next(action);

        switch (action.type) {
            case 'profile/setProfile':
                try {
                    const connectStatus = await socket.connect();

                    socket.on((message: any) => console.log(message));

                    // receive chatroom list

                    console.log(WSReadyState[connectStatus as number]);
                } catch (error) {
                    console.log('WebSocket connection error');
                }
                break;

            case 'profile/removeProfile':
                try {
                    const disconnectStatus = await socket.disconnect();

                    console.log(WSReadyState[disconnectStatus as number]);
                } catch (error) {
                    console.log('WebSocket disconnection error');
                }
                break;

            case 'test_ws':
                try {
                    await socket.sendMessage(action.payload);
                } catch (error) {
                    console.log('test_ws');
                }
                break;
        }
    };
};

export default socketMiddleware;
