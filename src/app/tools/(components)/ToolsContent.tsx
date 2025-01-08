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
		name: "2D迷路",
		url: "/tools/labyrinth-2d",
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
