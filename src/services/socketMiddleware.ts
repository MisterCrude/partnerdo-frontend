import { Middleware, AnyAction } from 'redux';
import { RootState } from '@src/store/rootReducer';
import { WSReadyState, WSMessageTypes, IWSMessage, RequestStatus } from '@typing/api';
import { BASE_URL } from '@consts/api';

import SocketClient from '@services/socketClient';
import { IChatroom, IChatroomNotificationType } from '@typing/chat';
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

                    // Listenig for income server messages
                    socket.on<IChatroom[] | unknown>((message: IWSMessage<IChatroom[] | unknown>) => {
                        /**
                         * CHATROOM LIST
                         */
                        if (message.type === WSMessageTypes.CHATROOM_LIST) {
                            dispatch({
                                type: 'chatroom/setChatroomListRequestStatus',
                                payload: RequestStatus.FETCHING,
                            });

                            const { chatroomList, hasNotification } = message.message as {
                                chatroomList: IChatroom[];
                                hasNotification: boolean;
                            };

                            dispatch({ type: 'chatroom/setChatroomList', payload: { chatroomList, hasNotification } });

                            dispatch({
                                type: 'chatroom/setChatroomListRequestStatus',
                                payload: RequestStatus.SUCCESS,
                            });
                        }

                        /**
                         * CHATROOM MESSAGE LIST
                         */
                        console.log(message.type);
                        if (message.type === WSMessageTypes.MESSAGE_LIST) {
                            dispatch({
                                type: 'chatroom/setChatroomMessageListRequestStatus',
                                payload: RequestStatus.FETCHING,
                            });

                            dispatch({ type: 'chatroom/setChatroomMessageList', payload: message.message });

                            dispatch({
                                type: 'chatroom/setChatroomMessageListRequestStatus',
                                payload: RequestStatus.SUCCESS,
                            });
                        }

                        /**
                         * NOTIFICATION
                         */
                        if (message.type === WSMessageTypes.NOTIFICATION_TYPE) {
                            dispatch({
                                type: 'chatroom/setNotificationType',
                                payload: IChatroomNotificationType.IDLE,
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

            // CHATROOM MESSAGE
            case WSMessageTypes.CHATROOM_MESSAGE:
                try {
                    await socket.sendMessage(toSnakeCase(action.payload));
                } catch (error) {
                    console.log(`Error ${WSMessageTypes.CHATROOM_MESSAGE}`);
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
