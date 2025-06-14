import { Header } from "@/components/Header";
import { XCharacterPromptGenerator } from "./(components)/XCharacterPromptGenerator";

export default function XCharacterPromptGeneratorPage() {
	return (
		<div>
			<Header to="/tools" />
			<main>
				<h1>X Character Prompt Generator</h1>
				<XCharacterPromptGenerator />
			</main>
		</div>
	);
}