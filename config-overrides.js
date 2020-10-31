const path = require('path');

module.exports = function override(config) {
    config.resolve.alias = {
        ...config.resolve.alias,
        '@assets': path.resolve(__dirname, 'src/assets/'),
        '@components': path.resolve(__dirname, 'src/components/'),
        '@containers': path.resolve(__dirname, 'src/containers/'),
        '@config': path.resolve(__dirname, 'src/config/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@models': path.resolve(__dirname, 'src/models/'),
        '@routing': path.resolve(__dirname, 'src/routing/'),
        '@pages': path.resolve(__dirname, 'src/pages/'),
        '@services': path.resolve(__dirname, 'src/services/'),
        '@store': path.resolve(__dirname, 'src/store/'),
        '@slices': path.resolve(__dirname, 'src/slices/'),
        '@styles': path.resolve(__dirname, 'src/styles/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@src': path.resolve(__dirname, 'src/'),
    };

    return config;
};
