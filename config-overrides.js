const path = require('path');

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@screens': path.resolve(__dirname, 'src/screens/'),
        '@config': path.resolve(__dirname, 'src/config/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@routing': path.resolve(__dirname, 'src/routing/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@models': path.resolve(__dirname, 'src/models/'),
        '@slices': path.resolve(__dirname, 'src/slices/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@src': path.resolve(__dirname, 'src/'),
    };

    return config;
};
