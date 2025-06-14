import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	darkMode: "media",
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontFamily: {
				'mono': ['var(--font-aahub)', 'ui-monospace', 'SFMono-Regular', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
			},
			animation: {
				"fade-in": "fade-in 0.3s ease-in-out backwards",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: "0",
						transform: "translateY(1rem)",
					},
					"60%": {
						opacity: "1",
					},
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
