import clsx from "clsx";
import { AcceseCounter } from "./AcceseCounter";

export const Footer = () => {
	return (
		<footer className={clsx("sticky", "top-[100vh]")}>
			<AcceseCounter />
			<div className={clsx("text-center")}>
				<small>©2025 ivgtr</small>
			</div>
		</footer>
	);
};
