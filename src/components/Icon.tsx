import clsx from "clsx";
import Image from "next/image";

export const Icon = () => {
	return (
		<div className={clsx("box-border", "w-32", "h-32")}>
			<div className={clsx("w-full", "h-full", "overflow-hidden")}>
				<Image
					src="/icon.png"
					alt="伊吹風子"
					width={360}
					height={360}
					className="object-cover"
					priority={true}
				/>
			</div>
		</div>
	);
};
