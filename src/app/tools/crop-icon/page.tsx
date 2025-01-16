import clsx from "clsx";
import { Header } from "@/components/Header";
import { ClopIcon } from "./(components)/ClopIcon";

export default function ClopIconPage() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>画像を切り抜くやつ</h2>
				<section>
					<ClopIcon />
				</section>
				<section>
					<h3>使い方</h3>
					<ul className="list">
						<li>
							<p>画像URLに切り抜きたい画像のURLを入力</p>
						</li>
						<li>
							<p>形を選択</p>
						</li>
					</ul>
				</section>
				<section>
					<h3>source</h3>
					<ul>
						<li>
							<a
								href="https://github.com/ivgtr/crop-icon"
								className={clsx("hover:underline", "text-blue-500")}
							>
								ivgtr/crop-icon
							</a>
						</li>
					</ul>
				</section>
			</main>
		</div>
	);
}
