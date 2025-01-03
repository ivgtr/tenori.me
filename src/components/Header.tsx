import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import Link from "next/link";

export const Header = ({ to = "/" }: Readonly<{ to: string }>) => {
	return (
		<header>
			<Link
				href={to}
				className={clsx(
					"inline-block",
					"p-2",
					"text-gray-700",
					"dark:text-gray-100",
					"transition-all",
					"duration-200",
					"hover:text-opacity-80",
				)}
			>
				<FontAwesomeIcon icon={faArrowLeft} />
			</Link>
		</header>
	);
};
