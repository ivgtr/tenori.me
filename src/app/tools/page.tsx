import { Header } from "@/components/Header";
import { ToolsContent } from "./(components)/ToolsContent";
import { RetroBorder } from "@/components/retro/RetroBorder";
import { BlinkingText } from "@/components/retro/BlinkingText";

export default function Tools() {
	return (
		<div className="retro-layout min-h-screen">
			<Header to="/" />
			<main className="container mx-auto px-4 py-8">
				<RetroBorder variant="gradient" className="mb-6">
					<div className="text-center">
						<h1 className="text-2xl font-bold mb-4 text-yellow-300">
							<BlinkingText>🔧 便利ツール集 🔧</BlinkingText>
						</h1>
						<div className="text-sm text-cyan-400">
							※ 個人製作のツールです。バグがあっても泣かないでください ※
						</div>
					</div>
				</RetroBorder>
				<div className="text-green-400 font-mono">
					<ToolsContent />
				</div>
			</main>
		</div>
	);
}
