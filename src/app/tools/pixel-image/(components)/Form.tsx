"use client";

import React, { useEffect, useState } from "react";

type Props = {
	defaultImageUrl: string;
	defaultCellSize: string;
	defaultKSize: string;
	handleChange: (imageUrl: string, size: string, k: string) => void;
};

export default function Form({
	defaultImageUrl,
	defaultCellSize,
	defaultKSize,
	handleChange,
}: Props) {
	const [imageUrl, setImageUrl] = useState(defaultImageUrl);
	const [cellSize, setCellSize] = useState(defaultCellSize);
	const [kSize, setKSize] = useState(defaultKSize);

	useEffect(() => {
		handleChange(imageUrl, cellSize, kSize);
	}, [imageUrl, cellSize, kSize, handleChange]);

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
					セルサイズ
				</label>
				<select
					id="cell-size"
					className="h-12 px-4 py-2 border-2 border-gray-600 rounded-lg"
					defaultValue={defaultCellSize}
					onChange={(e) => setCellSize(e.target.value)}
				>
					{Array.from({ length: 50 }, (_, i) => i + 1).map((i) => (
						<option key={i} value={i}>
							{i}
						</option>
					))}
				</select>
			</div>
			<div className="flex items-center w-full mt-4">
				<label htmlFor="k-size" className="px-4 py-2">
					Kサイズ
				</label>
				<select
					id="k-size"
					className="h-12 px-4 py-2 border-2 border-gray-600 rounded-lg"
					defaultValue={defaultKSize}
					onChange={(e) => setKSize(e.target.value)}
				>
					{Array.from({ length: 50 }, (_, i) => i + 1).map((i) => (
						<option key={i} value={i}>
							{i}
						</option>
					))}
				</select>
			</div>
		</form>
	);
}
