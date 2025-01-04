"use client";

import React, { useCallback, useState } from "react";
import Form from "./Form";

export type Pattern = "circle" | "hart" | "star";

const defaultImageUrl =
	"https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png";
const defaultPattern: Pattern = "circle";

export default function Preview() {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const changeImageUrl = useCallback((imageUrl: string, pattern: Pattern) => {
		const url = new URL("https://crop-icon.vercel.app/api");
		url.searchParams.set("url", imageUrl);
		url.searchParams.set("p", pattern);
		setImageUrl(url.toString());
	}, []);

	console.log(imageUrl);

	return (
		<div>
			<div className="relative w-full h-72 mt-12 bg-gray-200">
				{imageUrl ? (
					// eslint-disable-next-line @next/next/no-img-element
					<img
						src={imageUrl}
						alt="画像を切り抜くやつ"
						className="w-full h-full object-contain"
					/>
				) : (
					<p className="w-full h-full text-center">loading...</p>
				)}
			</div>
			<Form
				defaultImageUrl={defaultImageUrl}
				defaultPattern={defaultPattern}
				handleChange={changeImageUrl}
			/>
		</div>
	);
}
