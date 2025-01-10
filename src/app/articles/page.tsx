import { Header } from "@/components/Header";
import { ArticlesContent } from "./(components)/ArticlesContent";
import { Footer } from "@/components/Footer";

export default function Articles() {
	return (
		<div>
			<Header to="/" />
			<main>
				<h1>Articles</h1>
				<ArticlesContent />
			</main>
			<Footer />
		</div>
	);
}
