import { Header } from "@/components/Header";
import { ToolsContent } from "./(components)/ToolsContent";

export default function Tools() {
	return (
		<div className="min-h-screen bg-black text-green-400 font-mono">
			<Header to="/" />
			<main className="container mx-auto px-4 py-8">
				<div className="border-2 border-green-400 bg-black p-6 mb-6">
					<h1 className="text-2xl font-bold text-center mb-4 text-yellow-300">
						🔧 便利ツール集 🔧
					</h1>
					<div className="text-center text-sm text-cyan-400 mb-4">
						※ 個人製作のツールです。バグがあっても泣かないでください ※
					</div>
				</div>
				<ToolsContent />
			</main>
		</div>
	);
}
