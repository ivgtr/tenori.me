import { Header } from "@/components/Header";
import { Tategaki } from "./(components)/Tategaki";

export default function TategakiPage() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>横書きの内容を縦書きするやつ</h2>
				<section>
					<Tategaki />
				</section>
			</main>
		</div>
	);
}
