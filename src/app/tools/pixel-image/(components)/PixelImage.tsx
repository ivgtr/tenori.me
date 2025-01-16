"use client";

import { useState, useCallback } from "react";
import Form from "./Form";
import Preview from "./Preview";

const defaultImageUrl =
	"https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png";
const defaultCellSize = "15";
const defaultKSize = "8";

export const PixelImage = () => {
	const [imageUrl, setImageUrl] = useState<string | null>(null);

	const changeImageUrl = useCallback(
		(imageUrl: string, size: string, k: string) => {
			const url = new URL("https://pixel-image.vercel.app/api");
			url.searchParams.set("image", imageUrl);
			url.searchParams.set("size", size);
			url.searchParams.set("k", k);
			setImageUrl(url.toString());
		},
		[],
	);
	return (
		<div>
			<Preview imageUrl={imageUrl} />
			<Form
				defaultImageUrl={defaultImageUrl}
				defaultCellSize={defaultCellSize}
				defaultKSize={defaultKSize}
				handleChange={changeImageUrl}
			/>
		</div>
	);
};
