import { Header } from "@/components/Header";
import { ToolsContent } from "./(components)/ToolsContent";
import { Footer } from "@/components/Footer";

export default function Tools() {
	return (
		<div>
			<Header to="/" />
			<main>
				<h1>Tools</h1>
				<ToolsContent />
			</main>
			<Footer />
		</div>
	);
}
