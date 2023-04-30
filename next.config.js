const {version} = require('./package.json');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  publicRuntimeConfig: {
    appVersion: version
  }
}

module.exports = nextConfig
