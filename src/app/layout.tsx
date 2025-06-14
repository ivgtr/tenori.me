import type { Metadata } from "next";
import { marumonica } from "../styles/fonts";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import "@fortawesome/fontawesome-svg-core/styles.css";
import "@/styles/globals.scss";
import { RetroBackground } from "@/components/retro/RetroBackground";

export const metadata: Metadata = {
	title: "tenori.me - 個人サイト",
	description: "卵の殻を破らねば、雛鳥は生まれずに死んでいく。",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja">
			<body className={`${marumonica.variable} retro-site`}>
				<RetroBackground />
				{children}
			</body>
		</html>
	);
}
