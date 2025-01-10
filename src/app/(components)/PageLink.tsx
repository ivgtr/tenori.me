import clsx from "clsx";
import Link from "next/link";

export const PageLink = () => {
	return (
		<ul className="list">
			<li>
				<Link
					href="/articles"
					data-astro-prefetch="viewport"
					className={clsx("hover:underline", "text-blue-500")}
				>
					articles
				</Link>
			</li>
			<li>
				<Link
					href="/tools"
					className={clsx("hover:underline", "text-blue-500")}
				>
					tools
				</Link>
			</li>
		</ul>
	);
};
