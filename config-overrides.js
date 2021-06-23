const path = require('path');

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@consts': path.resolve(__dirname, 'src/consts/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@typing': path.resolve(__dirname, 'src/typing/'),
        '@routing': path.resolve(__dirname, 'src/routing/'),
        '@screens': path.resolve(__dirname, 'src/screens/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@slices': path.resolve(__dirname, 'src/slices/'),
        '@src': path.resolve(__dirname, 'src/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@theme': path.resolve(__dirname, 'src/theme/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
    };

    return config;
};
