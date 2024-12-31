/** @type {import('tailwindcss').Config} */
export default {
	content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
	theme: {
		extend: {
			animation: {
				"fade-in": "fade-in 0.3s ease-in-out backwards",
			},
			keyframes: {
				"fade-in": {
					"0%": {
						opacity: 0,
						transform: "translateY(1rem)",
					},
					"60%": {
						opacity: 1,
					},
					"100%": { opacity: 1, transform: "translateY(0)" },
				},
			},
		},
	},
	plugins: [],
};
