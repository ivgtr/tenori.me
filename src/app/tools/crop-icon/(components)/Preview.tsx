export default function Preview({ imageUrl }: { imageUrl: string | null }) {
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
		</div>
	);
}
