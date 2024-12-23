import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactStrictMode: true,
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Cache-Control",
						value: "public, max-age=31536000, immutable" // 1 year caching
					}
				]
			}
		];
	}
};

export default nextConfig;
