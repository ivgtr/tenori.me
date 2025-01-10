"use client";

import {
	faBlogger,
	faBluesky,
	faGithub,
	faSteam,
	faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

const accounts = [
	{
		title: "Twitter",
		alt: "mawaru_hana",
		url: "https://twitter.com/mawaru_hana",
		icon: faTwitter,
	},
	{
		title: "Bluesky",
		alt: "tenori",
		url: "https://bsky.app/profile/tenori.me",
		icon: faBluesky,
	},
	{
		title: "Github",
		alt: "ivgtr",
		url: "https://github.com/ivgtr",
		icon: faGithub,
	},
	{
		title: "Steam",
		alt: "Steam",
		url: "https://steamcommunity.com/id/oyanmi",
		icon: faSteam,
	},
	{
		title: "Scrapbox",
		alt: "Scrapbox",
		url: "https://scrapbox.io/ivgtr/",
		icon: faBlogger,
	},
];

export const Contact = () => {
	return (
		<ul className={clsx("flex", "flex-wrap", "gap-2")}>
			{accounts.map((account, i) => {
				const style = {
					animationDelay: `${i * 0.1 + 0.2}s`,
				};

				return (
					<li className={clsx("animate-fade-in")} style={style} key={i}>
						<a
							href={account.url}
							className={clsx(
								"flex",
								"items-center",
								"justify-center",
								"w-8",
								"h-8",
								"bg-gray-700",
								"dark:bg-gray-100",
								"dark:text-gray-700",
								"text-gray-100",
								"text-base",
								"rounded-full",
								"overflow-hidden",
								"transition-all",
								"duration-200",
								"hover:text-opacity-80",
								"cursor-pointer",
							)}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={account.title}
						>
							<FontAwesomeIcon icon={account.icon} size="1x" fixedWidth />
						</a>
					</li>
				);
			})}
		</ul>
	);
};
