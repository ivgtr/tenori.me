import { Header } from "@/components/Header";
import { ImageToBase64 } from "./(components)/ImageToBase64";

export default function ImageToBase64Page() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h2>画像をbase64にする</h2>
				<section>
					<ImageToBase64 />
				</section>
			</main>
		</div>
	);
}
