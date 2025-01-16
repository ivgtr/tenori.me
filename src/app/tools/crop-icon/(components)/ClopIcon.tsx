"use client";

import { useCallback, useState } from "react";
import Form from "./Form";
import Preview from "./Preview";

export type Pattern = "circle" | "hart" | "star";

const defaultImageUrl =
	"https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png";
const defaultPattern: Pattern = "circle";

export const ClopIcon = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const changeImageUrl = useCallback((imageUrl: string, pattern: Pattern) => {
		const url = new URL("https://crop-icon.vercel.app/api");
		url.searchParams.set("url", imageUrl);
		url.searchParams.set("p", pattern);
		setImageUrl(url.toString());
	}, []);

	return (
		<div>
			<Preview imageUrl={imageUrl} />
			<Form
				defaultImageUrl={defaultImageUrl}
				defaultPattern={defaultPattern}
				handleChange={changeImageUrl}
			/>
		</div>
	);
};
