import localFont from "next/font/local";

const marumonica = localFont({
	src: "./fonts/x12y16pxMaruMonica.woff",
	variable: "--font-marumonica",
	display: "swap",
});

const aahub = localFont({
	src: [
		{
			path: "../../public/fonts/aahub.woff2",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/aahub.woff",
			weight: "400",
			style: "normal",
		},
		{
			path: "../../public/fonts/aahub.ttf",
			weight: "400",
			style: "normal",
		},
	],
	variable: "--font-aahub",
	display: "swap",
});

export { marumonica, aahub };
