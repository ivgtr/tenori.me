import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	site: "https://example.com",
	integrations: [mdx(), sitemap(), tailwind(), react()],
	adapter: cloudflare(),
	vite: {
		// Use react-dom/server.edge instead of react-dom/server.browser for React 19.
		// Without this, MessageChannel from node:worker_threads needs to be polyfilled.
		alias:
			process.env.NODE_ENV === "production"
				? {
						"react-dom/server": "react-dom/server.edge",
					}
				: undefined,
	},
});
