import clsx from "clsx";
import Link from "next/link";

const tools = [
	{
		name: "画像をドット風にする",
		url: "/tools/pixel-image",
	},
	{
		name: "画像を切り抜くやつ",
		url: "/tools/crop-icon",
	},
	{
		name: "画像をマウスでグリッチする",
		url: "/tools/glitch-image",
	},
	{
		name: "画像をbase64にする",
		url: "/tools/image-to-base64",
	},
	{
		name: "横書きの内容を縦書きするやつ",
		url: "/tools/tategaki",
	},
	{
		name: "Xキャラクタープロンプト生成",
		url: "/tools/x-character-prompt-generator",
	},
	{
		name: "横スクロール2Dアクションゲーム",
		url: "/tools/side-scroller-game",
	},
];

export const ToolsContent = async () => {
	return (
		<section>
			<h2>tools</h2>
			<ul className="list">
				{tools.map((tool) => (
					<li key={tool.url}>
						<Link
							href={tool.url}
							className={clsx("hover:underline", "text-blue-500")}
						>
							{tool.name}
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
};
