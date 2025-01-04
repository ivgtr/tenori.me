import clsx from "clsx";
import Preview from "./(components)/Preview";
import { Header } from "@/components/Header";

export default function PixelImage() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>画像をドット風にする</h2>
				<section>
					<Preview />
				</section>
				<section>
					<h3>使い方</h3>
					<ul className="list">
						<li>
							<p>画像URLにドット風にしたい画像のURLを入力</p>
						</li>
						<li>
							<p>ドットの大きさ（セルサイズ）を調整</p>
						</li>
						<li>
							<p>色の範囲（Kサイズ）を調整</p>
						</li>
					</ul>
				</section>
				<section>
					<h3>source</h3>
					<ul>
						<li>
							<a
								href="https://github.com/ivgtr/pixel-image"
								className={clsx("hover:underline", "text-blue-500")}
							>
								ivgtr/pixel-image
							</a>
						</li>
					</ul>
				</section>
			</main>
		</div>
	);
}
