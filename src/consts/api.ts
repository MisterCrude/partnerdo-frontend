export const BACKENTD_BASE_URL = process.env.REACT_APP_BASE_URL;

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
        CHAT_ROOMS: 'proposals/chat-rooms',
    },
    USER: 'user/',
};
