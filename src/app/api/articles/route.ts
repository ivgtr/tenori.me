import { NextResponse } from "next/server";
import { XMLParser } from "fast-xml-parser";
import { Article } from "@/types/articles";

const articleSources = [
	{
		site: "Scrapbox",
		url: "https://scrapbox.io/api/pages/ivgtr",
	},
	{
		site: "Hatena",
		url: "https://ivgtr.hatenablog.jp/rss",
	},
	{
		site: "Qita",
		url: "https://qiita.com/tenori/feed.atom",
	},
] as const;

export type Site = (typeof articleSources)[number]["site"];

export async function GET() {
	const articleObject = articleSources.reduce(
		(acc, { site }) => {
			acc[site] = [];
			return acc;
		},
		{} as Record<Site, Article[]>,
	);

	try {
		const parser = new XMLParser();
		await Promise.all(
			articleSources.map(async (source) => {
				const response = await fetch(source.url);
				if (source.site === "Qita") {
					const text = await response.text();
					const data = parser.parse(text);
					const articles = data.feed.entry as {
						title: string;
						url: string;
						published: string;
					}[];
					articleObject[source.site] = articles
						.sort(
							(a, b) =>
								new Date(b.published).getTime() -
								new Date(a.published).getTime(),
						)
						.map((article) => ({
							title: article.title,
							url: article.url,
							created: article.published,
						}))
						.splice(0, 5);
				} else if (source.site === "Hatena") {
					const text = await response.text();
					const data = parser.parse(text);
					const articles = data.rss.channel.item as {
						title: string;
						link: string;
						pubDate: string;
					}[];
					articleObject[source.site] = articles
						.sort(
							(a, b) =>
								new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
						)
						.map((article) => ({
							title: article.title,
							url: article.link,
							created: article.pubDate,
						}))
						.splice(0, 5);
				} else if (source.site === "Scrapbox") {
					const data = await response.json();
					const pjName = data.projectName;
					const articles = data.pages as {
						title: string;
						created: number;
					}[];

					articleObject[source.site] = articles
						.sort((a, b) => b.created - a.created)
						.map((article) => ({
							title: article.title,
							url: `https://scrapbox.io/${pjName}/${encodeURIComponent(
								article.title,
							)}`,
							created: new Date(article.created * 1000).toISOString(),
						}))
						.splice(0, 5);
				}
			}),
		);
	} catch (error) {
		console.error(error);
	}

	return NextResponse.json(articleObject);
}
