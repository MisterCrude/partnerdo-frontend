import { Middleware, AnyAction } from 'redux';
import { RootState } from '@src/store/rootReducer';
import { WSReadyState, WSMessageTypes, IWSMessage, RequestStatus } from '@typing/api';
import { BASE_URL } from '@consts/api';

import SocketClient from '@services/socketClient';
import { IChatroom } from '@typing/chat';
import { toSnakeCase } from '@src/utils/convert';

const socket = new SocketClient(BASE_URL);

// TODO: import all action creators from chatroomSlice
export const socketMiddleware: Middleware<Record<string, unknown>, RootState> = ({ dispatch }) => {
    return (next) => async (action: AnyAction) => {
        next(action);

        switch (action.type) {
            // SET PROFILE
            case 'profile/setProfile':
                try {
                    const connectStatus = await socket.connect();

                    socket.on<IChatroom[] | unknown>((message: IWSMessage<IChatroom[] | unknown>) => {
                        if (message.type === WSMessageTypes.CHATROOM_LIST) {
                            dispatch({
                                type: 'chatrooms/setChatroomListRequestStatus',
                                payload: RequestStatus.FETCHING,
                            });

                            dispatch({ type: 'chatrooms/setChatroomList', payload: message.message as IChatroom[] });

                            dispatch({
                                type: 'chatrooms/setChatroomListRequestStatus',
                                payload: RequestStatus.SUCCESS,
                            });
                        }

                        if (message.type === WSMessageTypes.HAS_NEW_MESSAGE) {
                            dispatch({ type: 'chatrooms/setHasNewMessage', payload: true });
                        }

                        if (message.type === WSMessageTypes.CHATROOM_MESSAGE_LIST) {
                            dispatch({
                                type: 'chatrooms/setChatroomMessageListRequestStatus',
                                payload: RequestStatus.FETCHING,
                            });
                            dispatch({ type: 'chatrooms/setChatroomMessageList', payload: message.message });

                            dispatch({
                                type: 'chatrooms/setChatroomMessageListRequestStatus',
                                payload: RequestStatus.SUCCESS,
                            });
                        }
                    });

                    console.log(WSReadyState[connectStatus as number]);
                } catch (error) {
                    console.log('WebSocket connection error');
                }
                break;

            // REMOVE PROFILE
            case 'profile/removeProfile':
                try {
                    const disconnectStatus = await socket.disconnect();

                    console.log(WSReadyState[disconnectStatus as number]);
                } catch (error) {
                    console.log('WebSocket disconnection error');
                }
                break;

            case WSMessageTypes.NEW_CHATROOM_MESSAGE:
                try {
                    await socket.sendMessage(toSnakeCase(action.payload));
                } catch (error) {
                    console.log(`Error ${WSMessageTypes.NEW_CHATROOM_MESSAGE}`);
                }
                break;

            // CREATE CHATROOM
            case WSMessageTypes.CONNECT_TO_CHATROOM:
                try {
                    await socket.sendMessage(toSnakeCase(action.payload));
                } catch (error) {
                    console.log(`Error ${WSMessageTypes.CONNECT_TO_CHATROOM}`, error);
                }
                break;
        }
    };
};

export default socketMiddleware;
