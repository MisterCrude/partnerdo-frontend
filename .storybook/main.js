const path = require('path');

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/preset-create-react-app'],
    webpackFinal: async (config) => {
        const toPath = (pathname) => path.join(process.cwd(), pathname);

        config.resolve.alias = {
            ...config.resolve.alias,

            // App aliases
            '@assets': toPath('src/assets/'),
            '@components': toPath('src/components/'),
            '@config': toPath('src/config/'),
            '@hooks': toPath('src/hooks/'),
            '@layouts': toPath('src/layouts/'),
            '@models': toPath('src/models/'),
            '@routing': toPath('src/routing/'),
            '@utils': toPath('src/utils/'),
            '@slices': toPath('src/slices/'),
            '@store': toPath('src/store/'),
            '@screens': toPath('src/screens/'),
            '@services': toPath('src/services/'),
            '@src': toPath('src/'),
            '@theme': toPath('src/theme/'),

            // Storybook
            '@emotion/core': toPath('node_modules/@emotion/react'),
            'emotion-theming': toPath('node_modules/@emotion/react'),
        };

        return config;
    },
};
