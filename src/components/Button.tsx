import clsx from "clsx";

type ButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
	className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
	children,
	onClick,
	className,
	...props
}: ButtonProps) => {
	return (
		<button
			onClick={onClick}
			className={clsx(
				"block",
				"w-36",
				"px-4",
				"py-2",
				"text-white",
				"rounded-lg",
				"disabled:opacity-50",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);
};
