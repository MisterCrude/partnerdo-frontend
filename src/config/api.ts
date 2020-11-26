export const BACKENTD_BASE_URL = process.env.REACT_APP_BASE_URL;

export const BACKEND_ROUTING = {
    AUTH: {
        LOGIN: 'auth/login/',
        LOGOUT: 'auth/logout/',
        PASSWORD_RESET: 'auth/password/reset/',
        PASSWORD_CONFIRM: 'auth/password/reset/confirm/',
        PASSWORD_CHANGE: 'auth/password/change/',
        USER: 'auth/user/',
    },
};
