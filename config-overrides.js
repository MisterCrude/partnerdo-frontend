const path = require('path');

module.exports = function override(config) {
  config.resolve.alias = {
    ...config.resolve.alias,
    '@assets': path.resolve(__dirname, 'src/assets/'),
    '@components': path.resolve(__dirname, 'src/components/'),
    '@config': path.resolve(__dirname, 'src/config/'),
    '@hooks': path.resolve(__dirname, 'src/hooks/'),
    '@routing': path.resolve(__dirname, 'src/routing/'),
    '@screens': path.resolve(__dirname, 'src/screens/'),
    '@typing': path.resolve(__dirname, 'src/typing/'),
    '@utils': path.resolve(__dirname, 'src/utils/'),
    '@store': path.resolve(__dirname, 'src/store/'),
    '@src': path.resolve(__dirname, 'src/'),
  };

  return config;
};
