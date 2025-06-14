import { Icon } from "@/components/Icon";
import { Profile } from "./(components)/Profile";
import { PageLink } from "./(components)/PageLink";
import { Contact } from "./(components)/Contact";
import { Footer } from "@/components/Footer";
import { RetroBorder } from "@/components/retro/RetroBorder";
import { BlinkingText } from "@/components/retro/BlinkingText";
import { Marquee } from "@/components/retro/Marquee";
import { RetroVisitorCounter } from "@/components/retro/RetroVisitorCounter";
import { DigitalClock } from "@/components/retro/DigitalClock";
import { WebRing } from "@/components/retro/WebRing";
import { RetroGuestbook } from "@/components/retro/RetroGuestbook";
import { RetroMidiPlayer } from "@/components/retro/RetroMidiPlayer";
import { AAWelcome } from "@/components/retro/AAWelcome";
import { AABoard } from "@/components/retro/AABoard";
import { AAFooter } from "@/components/retro/AAFooter";

export default function Home() {
	return (
		<div className="retro-layout min-h-screen">
			<Marquee className="mb-4">
				🌟 ようこそ tenori.me へ 🌟 個人サイト運営中 🌟 リンクフリー 🌟 相互リンク募集中 🌟
			</Marquee>
			
			<AAWelcome />
			
			<div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-4 mt-4">
				{/* Left Sidebar */}
				<aside className="lg:col-span-1 space-y-4">
					<RetroVisitorCounter />
					<DigitalClock />
					<RetroMidiPlayer />
					<WebRing />
				</aside>

				{/* Main Content */}
				<main className="lg:col-span-2">
					<RetroBorder variant="gradient" className="mb-6">
						<div className="text-center">
							<h1 className="text-4xl font-bold mb-2 text-cyan-400">
								<BlinkingText>✨ tenori.me ✨</BlinkingText>
							</h1>
							<p className="text-yellow-300 text-sm">～ 個人サイト ～</p>
						</div>
					</RetroBorder>

					<RetroBorder variant="classic" className="mb-6">
						<section className="bg-white text-black">
							<h2 className="text-2xl font-bold mb-4 text-purple-800 border-b-2 border-purple-800 pb-2">
								💫 About me 💫
							</h2>
							<div className="flex flex-col md:flex-row gap-4">
								<div className="flex-shrink-0">
									<Icon />
								</div>
								<div className="flex-1">
									<Profile />
								</div>
							</div>
						</section>
					</RetroBorder>

					<RetroBorder variant="classic" className="mb-6">
						<section className="bg-white text-black">
							<h2 className="text-2xl font-bold mb-4 text-purple-800 border-b-2 border-purple-800 pb-2">
								📧 Contact 📧
							</h2>
							<Contact />
						</section>
					</RetroBorder>

					<RetroBorder variant="classic" className="mb-6">
						<section className="bg-white text-black">
							<h2 className="text-2xl font-bold mb-4 text-purple-800 border-b-2 border-purple-800 pb-2">
								🔗 Link 🔗
							</h2>
							<PageLink />
						</section>
					</RetroBorder>
				</main>

				{/* Right Sidebar */}
				<aside className="lg:col-span-1 space-y-4">
					<RetroGuestbook />
				</aside>
			</div>

			<div className="container mx-auto px-4 mt-6">
				<AABoard />
			</div>

			<div className="mt-6">
				<AAFooter />
			</div>

			<Footer />
		</div>
	);
}
