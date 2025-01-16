import Image from "next/image";

export default function Preview({ imageUrl }: { imageUrl: string | null }) {
	return (
		<div className="relative w-full h-72 mt-12">
			{imageUrl ? (
				<Image
					src={imageUrl}
					alt="画像をドット風にする"
					className="w-full h-full object-contain"
					fill
				/>
			) : (
				<p className="w-full h-full text-center">loading...</p>
			)}
		</div>
	);
}
