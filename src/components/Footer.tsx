import clsx from "clsx";
import { AcceseCounter } from "./AcceseCounter";

export const Footer = () => {
	return (
		<footer className={clsx("sticky", "top-[100vh]")}>
			<AcceseCounter />
			<small>©2025 ivgtr</small>
		</footer>
	);
};
