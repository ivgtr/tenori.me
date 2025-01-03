import { Header } from "@/components/Header";
import { ToolsContent } from "./(components)/ToolsContent";

export default function Tools() {
	return (
		<div>
			<Header to="/" />
			<main>
				<h1>Articles</h1>
				<ToolsContent />
			</main>
		</div>
	);
}
