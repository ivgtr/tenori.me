"use client";

import React, { useCallback, useState } from "react";
import Form from "./Form";
import Image from "next/image";

const defaultImageUrl =
	"https://pbs.twimg.com/profile_images/1633247750010830848/8zfRrYjA_400x400.png";
const defaultCellSize = "15";
const defaultKSize = "8";

export default function Preview() {
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
			<div className="relative w-full h-72 mt-12">
				{imageUrl ? (
					<Image
						src={imageUrl}
						alt="像をドット風にする"
						className="w-full h-full object-contain"
						fill
					/>
				) : (
					<p className="w-full h-full text-center">loading...</p>
				)}
			</div>
			<Form
				defaultImageUrl={defaultImageUrl}
				defaultCellSize={defaultCellSize}
				defaultKSize={defaultKSize}
				handleChange={changeImageUrl}
			/>
		</div>
	);
}
