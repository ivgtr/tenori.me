import { Header } from "@/components/Header";
import { SideScrollerGame } from "./(components)/SideScrollerGame";

export default function SideScrollerGamePage() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>横スクロール2Dアクションゲーム</h2>
				<section>
					<SideScrollerGame />
				</section>
			</main>
		</div>
	);
}