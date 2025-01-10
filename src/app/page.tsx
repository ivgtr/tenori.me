import { Icon } from "@/components/Icon";
import { Profile } from "./(components)/Profile";
import { PageLink } from "./(components)/PageLink";
import { Contact } from "./(components)/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
	return (
		<div>
			<main>
				<h1>tenori.uk</h1>
				<section>
					<h2>About me</h2>
					<Icon />
					<Profile />
				</section>
				<section>
					<h2>Contact</h2>
					<Contact />
				</section>
				<section>
					<h2>Link</h2>
					<PageLink />
				</section>
			</main>
			<Footer />
		</div>
	);
}
