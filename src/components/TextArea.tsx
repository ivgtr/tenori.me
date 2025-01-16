import clsx from "clsx";
import { useRef } from "react";

type TextAreaProps = {
	className?: string;
	onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const TextArea = ({ className, onChange, ...props }: TextAreaProps) => {
	const textareaWrapperRef = useRef<HTMLDivElement>(null);

	return (
		<div
			ref={textareaWrapperRef}
			className={clsx(
				"grid",
				"text-sm",
				"after:px-3.5",
				"after:py-2.5",
				"[&>textarea]:resize-none",
				"[&>textarea]:overflow-hidden",
				"[&>textarea]:[grid-area:1/1/2/2]",
				"after:[grid-area:1/1/2/2]",
				"after:whitespace-pre-wrap",
				"after:invisible",
				"after:content-[attr(data-cloned-val)_'_']",
				"after:border",
			)}
			data-cloned-val={props.defaultValue}
		>
			<textarea
				className={clsx(
					"w-full",
					"border",
					"border-transparent",
					"hover:border-slate-200",
					"appearance-none",
					"rounded",
					"px-3.5",
					"py-2.5",
					"outline-none",
					"focus:border-indigo-400",
					"focus:ring-2",
					"focus:ring-indigo-100",
					className,
				)}
				onChange={(e) => {
					const wrapper = textareaWrapperRef.current;
					if (wrapper) {
						wrapper.dataset.clonedVal = e.target.value;
					}

					if (onChange) {
						onChange(e);
					}
				}}
				{...props}
			></textarea>
		</div>
	);
};
