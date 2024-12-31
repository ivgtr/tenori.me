import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
// @ts-check
import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
	prefetch: true,
	site: "https://example.com",
	integrations: [mdx(), sitemap(), tailwind()],
	adapter: vercel(),
});
