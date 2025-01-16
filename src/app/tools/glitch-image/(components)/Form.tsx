import { useEffect, useState } from "react";
import { Mode, SplitHeight } from "./GlitchImage";

type Props = {
	defaultMode: Mode;
	defaultSplitHeight: SplitHeight;
	handleChange: (mode: Mode, splitHeight: SplitHeight) => void;
};

export const Form = ({
	defaultMode,
	defaultSplitHeight,
	handleChange,
}: Props) => {
	const [mode, setMode] = useState<Mode>(defaultMode);
	const [splitHeight, setSplitHeight] =
		useState<SplitHeight>(defaultSplitHeight);

	useEffect(() => {
		handleChange(mode, splitHeight);
	}, [mode, splitHeight, handleChange]);

	return (
		<form className="inline-block w-full">
			<div className="flex items-center w-full mt-4">
				<label htmlFor="mode" className="px-4 py-2">
					モード
				</label>
				<div className="flex flex-wrap">
					{["r", "g", "b", "rgb"].map((m) => (
						<label key={m} className="flex items-center px-4 py-2">
							<input
								type="checkbox"
								value={m}
								checked={mode === m}
								onChange={() => setMode(m as Mode)}
								className="mr-2"
							/>
							{m}
						</label>
					))}
				</div>
			</div>
			<div className="flex items-center w-full mt-4">
				<label htmlFor="split-height" className="px-4 py-2">
					分割高さ
				</label>
				<select
					id="split-height"
					className="h-12 px-4 py-2 border-2 border-gray-600 rounded-lg"
					defaultValue={defaultSplitHeight}
					onChange={(e) => setSplitHeight(Number(e.target.value))}
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
};
