const path = require('path');

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@config': path.resolve(__dirname, 'src/config/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@models': path.resolve(__dirname, 'src/models/'),
        '@routing': path.resolve(__dirname, 'src/routing/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@slices': path.resolve(__dirname, 'src/slices/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@screens': path.resolve(__dirname, 'src/screens/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@src': path.resolve(__dirname, 'src/'),
        '@theme': path.resolve(__dirname, 'src/theme/'),
    };

    return config;
};
