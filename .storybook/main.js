const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
    webpackFinal: async (config) => {
        const rootDir = path.resolve(__dirname, '../');

        config.resolve.alias = {
            ...config.resolve.alias,
            '@assets': path.resolve(rootDir, 'src/assets/'),
            '@components': path.resolve(rootDir, 'src/components/'),
            '@config': path.resolve(rootDir, 'src/config/'),
            '@hooks': path.resolve(rootDir, 'src/hooks/'),
            '@layouts': path.resolve(rootDir, 'src/layouts/'),
            '@models': path.resolve(rootDir, 'src/models/'),
            '@routing': path.resolve(rootDir, 'src/routing/'),
            '@utils': path.resolve(rootDir, 'src/utils/'),
            '@slices': path.resolve(rootDir, 'src/slices/'),
            '@store': path.resolve(rootDir, 'src/store/'),
            '@screens': path.resolve(rootDir, 'src/screens/'),
            '@services': path.resolve(rootDir, 'src/services/'),
            '@src': path.resolve(rootDir, 'src/'),
            '@theme': path.resolve(rootDir, 'src/theme/'),
        };

        return config;
    },
};
