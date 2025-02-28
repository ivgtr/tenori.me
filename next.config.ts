import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		domains: ["pixel-image.vercel.app", "crop-icon.vercel.app"],
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
};

export default nextConfig;
