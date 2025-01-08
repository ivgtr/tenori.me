import Game from "./(components)/Game";
import { Header } from "@/components/Header";

export default function Labyrinth2d() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>2D迷路ゲーム</h2>
				<section className="flex justify-center items-center">
					<Game />
				</section>
			</main>
		</div>
	);
}
