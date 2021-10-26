const path = require('path');
const cracoAlias = require('craco-alias');

module.exports = {
    webpack: {
        alias: {
            '@assets': path.resolve(__dirname, 'src/assets/'),
            '@components': path.resolve(__dirname, 'src/components/'),
            '@consts': path.resolve(__dirname, 'src/consts/'),
            '@hooks': path.resolve(__dirname, 'src/hooks/'),
            '@layouts': path.resolve(__dirname, 'src/layouts/'),
            '@typing': path.resolve(__dirname, 'src/typing/'),
            '@routing': path.resolve(__dirname, 'src/routing/'),
            '@screens': path.resolve(__dirname, 'src/screens/'),
            '@services': path.resolve(__dirname, 'src/services/'),
            '@slices': path.resolve(__dirname, 'src/store/slices/'),
            '@selectors': path.resolve(__dirname, 'src/store/selectors/'),
            '@src': path.resolve(__dirname, 'src/'),
            '@store': path.resolve(__dirname, 'src/store/'),
            '@theme': path.resolve(__dirname, 'src/theme/'),
            '@utils': path.resolve(__dirname, 'src/utils/'),
        },
    },
    jest: {
        moduleNameMapper: {
            '@assets/(.*)$': '<rootDir>/src/assets/$1',
            '@components/(.*)$': '<rootDir>/src/components/$1',
            '@consts/(.*)$': '<rootDir>/src/consts/$1',
            '@hooks/(.*)$': '<rootDir>/src/hooks/$1',
            '@layouts/(.*)$': '<rootDir>/src/layouts/$1',
            '@typing/(.*)$': '<rootDir>/src/typing/$1',
            '@routing/(.*)$': '<rootDir>/src/routing/$1',
            '@utils/(.*)$': '<rootDir>/src/utils/$1',
            '@slices/(.*)$': '<rootDir>/src/store/slices/$1',
            '@selectors/(.*)$': '<rootDir>/src/store/selectors/$1',
            '@store/(.*)$': '<rootDir>/src/store/$1',
            '@screens/(.*)$': '<rootDir>/src/screens/$1',
            '@services/(.*)$': '<rootDir>/src/services/$1',
            '@src/(.*)$': '<rootDir>/src/$1',
            '@theme/(.*)$': '<rootDir>/src/theme/$1',
        },
    },
    plugins: [
        {
            plugin: cracoAlias,
            options: {
                source: 'tsconfig',
                baseUrl: './src',
                tsConfigPath: './tsconfig.paths.json',
            },
        },
    ],
};
