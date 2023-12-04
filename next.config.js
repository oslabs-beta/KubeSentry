/** @type {import('next').NextConfig} */
module.exports = {
  webpack(config) {
    config.resolve.extensions.push('.ts', '.tsx');
    return config;
  }
};