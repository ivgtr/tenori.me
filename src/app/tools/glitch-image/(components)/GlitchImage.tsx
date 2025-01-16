"use client";

import { useCallback, useState } from "react";
import { Form } from "./Form";
import { Stage } from "./Stage";

export type Mode = "r" | "g" | "b" | "rgb";
export type SplitHeight = number;

const defaultMode: Mode = "rgb";
const defaultSplitHeight: SplitHeight = 40;

export const GlitchImage = () => {
	const [mode, setMode] = useState<Mode>(defaultMode);
	const [splitHeight, setSplitHeight] =
		useState<SplitHeight>(defaultSplitHeight);

	const handleChange = useCallback((mode: Mode, splitHeight: SplitHeight) => {
		setMode(mode);
		setSplitHeight(splitHeight);
	}, []);

	return (
		<div>
			<Stage mode={mode} splitHeight={splitHeight} />
			<Form
				defaultMode={defaultMode}
				defaultSplitHeight={defaultSplitHeight}
				handleChange={handleChange}
			/>
		</div>
	);
};
