export const BASE_URL = process.env.REACT_APP_BASE_URL as string;
export const STATIC_FILTES_URL = process.env.REACT_APP_STATIC_FILTES_URL as string;

console.log(BASE_URL);

export const BACKEND_ROUTING = {
    AUTH: {
        LOGIN: 'auth/login/',
        LOGOUT: 'auth/logout/',
        REGISTER: 'auth/registration/',
        PASSWORD_RESET: 'auth/password/reset/',
        PASSWORD_CONFIRM: 'auth/password/reset/confirm/',
        PASSWORD_CHANGE: 'auth/password/change/',
        PROFILE: 'auth/user/',
        PROFILE_AVATAR: 'user/avatar',
    },
    PROPOSAL: {
        LIST: 'proposals/',
        FILTERS: 'proposals/filters',
        CREATE: 'proposals/create',
    },
    CHAT: {
        CHATROOMS: 'chat-rooms',
        CREATE_CHATROOM: 'chat-rooms/create',
    },
    USER: 'user/',
};
