import { Header } from "@/components/Header";
import { ArticlesContent } from "./(components)/ArticlesContent";

export default function Articles() {
	return (
		<div>
			<Header to="/" />
			<main>
				<h1>Articles</h1>
				<ArticlesContent />
			</main>
		</div>
	);
}
