import { neon } from "@neondatabase/serverless";

const incrementCountSQL = `
  INSERT INTO tb_count (name, count)
  VALUES ('tenori', 1)
  ON CONFLICT (name)
  DO UPDATE SET count = tb_count.count + 1
  RETURNING count;
`;

export async function GET() {
	const sql = neon(process.env.DB_URL!);
	const [count] = await sql(incrementCountSQL);

	return new Response(
		JSON.stringify({
			count: Number(count.count) + 1,
		}),
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);
}
