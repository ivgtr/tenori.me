import { Site } from "@/app/api/articles/route";
import { FormattedDate } from "@/components/FormattedDate";
import { Article } from "@/types/articles";
import clsx from "clsx";

const fetchArticles = async () => {
	try {
		const url = "http://localhost:3000/api/articles";
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
