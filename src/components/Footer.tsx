import clsx from "clsx";
import { RetroBorder } from "./retro/RetroBorder";
import { BlinkingText } from "./retro/BlinkingText";

export const Footer = () => {
	return (
		<footer className={clsx("sticky", "top-[100vh]", "mt-8")}>
			<RetroBorder variant="classic" className="text-center bg-white text-black">
				<div className="space-y-2">
					<BlinkingText className="text-red-600 font-bold">
						🚧 サイト更新中 🚧
					</BlinkingText>
					<div className="text-sm">
						<p>このサイトは1024x768以上の解像度でご覧ください</p>
						<p>Netscape Navigator 4.0以上推奨</p>
					</div>
					<div className="border-t-2 border-gray-400 pt-2">
						<small className="text-gray-600">
							©2025 ivgtr | Last Update: 2025/01/15 | 
							<BlinkingText className="text-blue-600"> リンクフリー </BlinkingText>
						</small>
					</div>
				</div>
			</RetroBorder>
		</footer>
	);
};
