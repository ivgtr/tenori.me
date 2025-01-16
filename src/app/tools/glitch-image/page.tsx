import { Header } from "@/components/Header";
import { GlitchImage } from "./(components)/GlitchImage";

export default function GlitchImagePage() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>画像をマウスでグリッチする</h2>
				<section>
					<GlitchImage />
				</section>
				<section>
					<h3>使い方</h3>
					<ul className="list">
						<li>
							<p>画像を読み込む</p>
						</li>
						<li>
							<p>ぐりぐりする</p>
						</li>
						<li>
							<p>PCでしか動きません</p>
						</li>
					</ul>
				</section>
			</main>
		</div>
	);
}
