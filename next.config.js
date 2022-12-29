/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	productionBrowserSourceMaps: true,
	images: {
        domains: ['https://s3.eu-west-3.amazonaws.com'],
    },
	videos: {
		domains: ['https://s3.eu-west-3.amazonaws.com'],
	},
	
};

module.exports = nextConfig;
