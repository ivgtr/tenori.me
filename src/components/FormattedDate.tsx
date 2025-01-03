"use client";

export const FormattedDate = ({ date }: { date: string }) => {
	const dateObj = new Date(date);
	return (
		<time dateTime={dateObj.toISOString()}>
			{dateObj.toLocaleDateString("ja-jp", {
				year: "numeric",
				month: "short",
				day: "numeric",
			})}
		</time>
	);
};
