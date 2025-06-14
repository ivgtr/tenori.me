import clsx from "clsx";
import Link from "next/link";
import { AACharacter } from "@/components/retro/AACharacter";

const tools = [
	{
		name: "画像をドット風にする",
		url: "/tools/pixel-image",
		description: "あの頃のゲームっぽくできるよ",
		status: "🟢 動作中",
		category: "画像処理"
	},
	{
		name: "画像を切り抜くやつ",
		url: "/tools/crop-icon",
		description: "アイコン作成に便利かも",
		status: "🟢 動作中",
		category: "画像処理"
	},
	{
		name: "画像をマウスでグリッチする",
		url: "/tools/glitch-image",
		description: "サイバーパンクっぽい感じに",
		status: "🟢 動作中",
		category: "画像処理"
	},
	{
		name: "画像をbase64にする",
		url: "/tools/image-to-base64",
		description: "プログラマー向け",
		status: "🟢 動作中",
		category: "開発支援"
	},
	{
		name: "横書きの内容を縦書きするやつ",
		url: "/tools/tategaki",
		description: "日本語らしく縦に書こう",
		status: "🟢 動作中",
		category: "テキスト"
	},
	{
		name: "Xキャラクタープロンプト生成",
		url: "/tools/x-character-prompt-generator",
		description: "AIでキャラ作りたい人向け",
		status: "🟢 動作中",
		category: "AI支援"
	},
	{
		name: "横スクロール2Dアクションゲーム",
		url: "/tools/side-scroller-game",
		description: "暇つぶしにどうぞ",
		status: "🟢 動作中",
		category: "ゲーム"
	},
];

const categories = [...new Set(tools.map(tool => tool.category))];

export const ToolsContent = async () => {
	return (
		<div className="space-y-8">
			{/* サイト管理人の一言 */}
			<div className="border-2 border-cyan-400 bg-gray-900 p-4">
				<div className="flex items-start space-x-4">
					<AACharacter character="mona" className="text-cyan-400 flex-shrink-0" />
					<div className="flex-1">
						<div className="text-cyan-400 font-bold mb-2">管理人より</div>
						<div className="text-sm text-green-300 leading-relaxed">
							個人的に作ったツールを置いてます。<br />
							需要があるかは不明ですが、自由に使ってください。<br />
							不具合報告は受け付けませんｗ<br />
							<span className="text-yellow-300">※IE6では動作しません</span>
						</div>
					</div>
				</div>
			</div>

			{/* カテゴリ別ツール一覧 */}
			{categories.map((category) => (
				<div key={category} className="border border-green-400 bg-gray-800">
					<div className="bg-green-400 text-black px-4 py-2 font-bold">
						📁 {category}
					</div>
					<div className="p-4">
						<div className="grid gap-4">
							{tools
								.filter(tool => tool.category === category)
								.map((tool) => (
									<div key={tool.url} className="border border-gray-600 bg-black p-3 hover:bg-gray-900 transition-colors">
										<div className="flex justify-between items-start mb-2">
											<Link
												href={tool.url}
												className="text-cyan-400 hover:text-yellow-300 hover:underline font-bold text-lg"
											>
												{tool.name}
											</Link>
											<span className="text-xs">{tool.status}</span>
										</div>
										<div className="text-sm text-gray-300 mb-1">
											{tool.description}
										</div>
										<div className="text-xs text-gray-500">
											URL: {tool.url}
										</div>
									</div>
								))}
						</div>
					</div>
				</div>
			))}

			{/* 更新履歴風 */}
			<div className="border border-gray-600 bg-gray-800 p-4">
				<div className="text-green-400 font-bold mb-3 border-b border-gray-600 pb-1">
					📝 ツール更新履歴
				</div>
				<div className="text-sm space-y-1">
					<div><span className="text-cyan-400">2025/06/15</span> - ツールページをレトロ風にリデザイン</div>
					<div><span className="text-cyan-400">2025/06/15</span> - 横スクロール2Dアクションゲーム追加</div>
					<div><span className="text-cyan-400">2025/06/15</span> - グリッチ画像ツールのマウス操作改善</div>
					<div><span className="text-cyan-400">2025/06/14</span> - Xキャラクタープロンプト生成ツール追加</div>
					<div><span className="text-cyan-400">2025/01/16</span> - 画像をbase64にするツール追加</div>
					<div><span className="text-cyan-400">2025/01/16</span> - 縦書き変換ツール追加</div>
					<div><span className="text-cyan-400">2025/01/16</span> - グリッチ画像ツール追加</div>
					<div><span className="text-cyan-400">2025/01/09</span> - 2D迷路ゲーム追加</div>
					<div><span className="text-cyan-400">2025/01/04</span> - 画像切り抜きツール追加</div>
					<div className="text-gray-500">...</div>
				</div>
			</div>
		</div>
	);
};
