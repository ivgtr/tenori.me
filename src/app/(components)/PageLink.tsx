import Link from "next/link";
import { BlinkingText } from "@/components/retro/BlinkingText";

const links = [
	{
		href: "/tools",
		title: "🔧 Tools",
		description: "便利ツール集",
		bgColor: "bg-cyan-100",
		borderColor: "border-cyan-400",
		textColor: "text-cyan-800"
	},
	// NOTE: Articles link hidden - content may not be available
	// {
	// 	href: "/articles", 
	// 	title: "📖 Articles",
	// 	description: "記事・ブログ",
	// 	bgColor: "bg-green-100",
	// 	borderColor: "border-green-400", 
	// 	textColor: "text-green-800"
	// }
];

export const PageLink = () => {
	return (
		<div className="space-y-4">
			<div className="text-center mb-4">
				<BlinkingText className="text-purple-600 font-bold">
					🚀 サイト内リンク 🚀
				</BlinkingText>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{links.map((link, index) => (
					<Link
						key={index}
						href={link.href}
						className={`block ${link.bgColor} ${link.borderColor} border-4 p-4 hover:scale-105 transition-transform duration-200 shadow-[inset_2px_2px_4px_rgba(255,255,255,0.8),inset_-2px_-2px_4px_rgba(0,0,0,0.3)] hover:shadow-[inset_-2px_-2px_4px_rgba(255,255,255,0.8),inset_2px_2px_4px_rgba(0,0,0,0.3)]`}
					>
						<div className="text-center">
							<div className={`font-bold text-lg ${link.textColor} mb-2`}>
								{link.title}
							</div>
							<div className="text-sm text-gray-600">
								{link.description}
							</div>
							<div className="mt-2 text-2xl">
								→
							</div>
						</div>
					</Link>
				))}
			</div>

			<div className="mt-6 border-2 border-orange-400 bg-orange-50 p-3">
				<h4 className="font-bold text-orange-800 mb-2 text-center">
					🔥 おすすめコンテンツ 🔥
				</h4>
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
					<Link 
						href="/tools/side-scroller-game"
						className="block bg-white border border-gray-400 p-2 hover:bg-gray-50 transition-colors"
					>
						<span className="font-mono">🎮 横スクロールゲーム</span>
					</Link>
					<Link 
						href="/tools/tategaki"
						className="block bg-white border border-gray-400 p-2 hover:bg-gray-50 transition-colors"
					>
						<span className="font-mono">📝 縦書きツール</span>
					</Link>
					<Link 
						href="/tools/glitch-image"
						className="block bg-white border border-gray-400 p-2 hover:bg-gray-50 transition-colors"
					>
						<span className="font-mono">🌈 グリッチ画像</span>
					</Link>
					<Link 
						href="/tools/x-character-prompt-generator"
						className="block bg-white border border-gray-400 p-2 hover:bg-gray-50 transition-colors"
					>
						<span className="font-mono">✨ プロンプト生成</span>
					</Link>
				</div>
			</div>
		</div>
	);
};
