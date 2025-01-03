import { Site } from "@/app/api/articles/route";
import { FormattedDate } from "@/components/FormattedDate";
import { Article } from "@/types/articles";
import clsx from "clsx";

const fetchArticles = async () => {
	try {
		const { NEXT_PUBLIC_BASE_URL = "" } = process.env;
		const url = new URL("/api/articles", NEXT_PUBLIC_BASE_URL).toString();
		const response = await fetch(url);
		return (await response.json()) as Record<Site, Article[]>;
	} catch (error) {
		console.error(error);
		return {} as Record<Site, Article[]>;
	}
};

export const ArticlesContent = async () => {
	const articles = await fetchArticles();
	return (
		<ul className="list">
			{Object.entries(articles).map(([site, articles]) => (
				<li key={site}>
					<h2>{site}</h2>
					<ul>
						{articles.map((article) => (
							<li key={article.url}>
								<p>
									<FormattedDate date={article.created} />-{" "}
									<a
										href={article.url}
										target="_blank"
										className={clsx("hover:underline", "text-blue-500")}
									>
										{article.title}
									</a>
								</p>
							</li>
						))}
					</ul>
				</li>
			))}
		</ul>
	);
};
