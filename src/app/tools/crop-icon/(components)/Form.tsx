"use client";

import React, { useEffect, useState } from "react";
import { Pattern } from "./Preview";

type Props = {
	defaultImageUrl: string;
	defaultPattern: Pattern;
	handleChange: (imageUrl: string, pattern: Pattern) => void;
};

export default function Form({
	defaultImageUrl,
	defaultPattern,
	handleChange,
}: Props) {
	const [imageUrl, setImageUrl] = useState(defaultImageUrl);
	const [pattern, setPattern] = useState<Pattern>(defaultPattern);
	const patterns: Pattern[] = ["circle", "hart", "star"] as const;

	useEffect(() => {
		handleChange(imageUrl, pattern);
	}, [imageUrl, pattern, handleChange]);

	return (
		<form className="inline-block w-full">
			<div className="flex items-center w-full mt-4">
				<label htmlFor="image-url" className="px-4 py-2">
					画像URL
				</label>
				<input
					id="image-url"
					type="text"
					className="w-full h-12 px-4 py-2 border-2 border-gray-600 rounded-lg"
					defaultValue={defaultImageUrl}
					onBlur={(e) => {
						e.preventDefault();
						if (e.target.value) {
							setImageUrl(e.target.value);
						}
					}}
				/>
			</div>
			<div className="flex items-center w-full mt-4">
				<label htmlFor="cell-size" className="px-4 py-2">
					パターン
				</label>
				<select
					id="cell-size"
					className="h-12 px-4 py-2 border-2 border-gray-600 rounded-lg"
					defaultValue={defaultPattern}
					onChange={(e) => {
						e.preventDefault();
						setPattern(e.target.value as Pattern);
					}}
				>
					{patterns.map((p) => (
						<option key={p} value={p}>
							{p}
						</option>
					))}
				</select>
			</div>
		</form>
	);
}
