import clsx from "clsx";

export const ToolsContent = async () => {
	return (
		<section>
			<h2>tools</h2>
			<ul className="list">
				<li>
					<a
						href="/tools/pixel-image"
						className={clsx("hover:underline", "text-blue-500")}
					>
						画像をドット風にする
					</a>
				</li>
				<li>
					<a
						href="/tools/crop-icon"
						className={clsx("hover:underline", "text-blue-500")}
					>
						画像を切り抜くやつ
					</a>
				</li>
			</ul>
		</section>
	);
};
