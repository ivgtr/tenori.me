"use client";

import useSWR from "swr/immutable";

type Counter = {
	count: number;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const AcceseCounter = () => {
	const { data, error } = useSWR<Counter>(
		`${process.env.NEXT_PUBLIC_BASE_URL}/api/counter`,
		fetcher,
	);

	return (
		<div>
			{error ? (
				<p>あなたは蜊∽ｸ?荳?屁蜊?ｺ皮卆蜊∝屁人目の訪問者です</p>
			) : !data ? (
				<p>あなたは...人目の訪問者です</p>
			) : (
				<p>あなたは{data.count}人目の訪問者です</p>
			)}
		</div>
	);
};
