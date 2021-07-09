import { Middleware, AnyAction } from 'redux';
import { RootState } from '@src/store/rootReducer';
import { WSReadyState, WSMessageTypes, IWSMessage, RequestStatus } from '@typing/api';
import { BASE_URL } from '@consts/api';

import SocketClient from '@services/socketClient';
import { IChatroom } from '@typing/chat';

const socket = new SocketClient(BASE_URL);

// TODO: import all action creators from chatroomSlice
export const socketMiddleware: Middleware<Record<string, unknown>, RootState> = ({ dispatch }) => {
    return (next) => async (action: AnyAction) => {
        next(action);

        switch (action.type) {
            case 'profile/setProfile':
                try {
                    const connectStatus = await socket.connect();

                    socket.on<IChatroom[] | unknown>((message: IWSMessage<IChatroom[] | unknown>) => {
                        dispatch({
                            type: 'chatrooms/setChatroomListRequestStatus',
                            payload: RequestStatus.FETCHING,
                        });

                        if (message.type === WSMessageTypes.CHATROOM_LIST) {
                            dispatch({ type: 'chatrooms/setChatroomList', payload: message.message as IChatroom[] });
                        }

                        dispatch({
                            type: 'chatrooms/setChatroomListRequestStatus',
                            payload: RequestStatus.SUCCESS,
                        });
                    });

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
