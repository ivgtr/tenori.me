type Counter = {
	count: number;
};

const fetchAcceseCount = async () => {
	try {
		const { NEXT_PUBLIC_BASE_URL = "" } = process.env;
		const url = new URL("/api/counter", NEXT_PUBLIC_BASE_URL).toString();
		const response = await fetch(url, {
			next: { revalidate: 60 },
		});
		return (await response.json()) as Counter;
	} catch (error) {
		console.error(error);
		return {} as Counter;
	}
};
export const AcceseCounter = async () => {
	const acceseCount = await fetchAcceseCount();

	if (Object.keys(acceseCount).length === 0) {
		return <p>データ取得エラー</p>;
	}

	return (
		<div>
			<p>あなたは{acceseCount.count}人目の訪問者です</p>
		</div>
	);
};
