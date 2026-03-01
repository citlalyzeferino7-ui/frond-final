import { pool } from "@/lib/db"

export async function GET(req) {
  const { searchParams } = new URL(req.url)
  const search = searchParams.get("search") || ""

  const query = `
    SELECT * FROM products
    WHERE 
      CAST(id AS TEXT) ILIKE $1
      OR name ILIKE $1
      OR CAST(price AS TEXT) ILIKE $1
  `

  const values = [`%${search}%`]

  const { rows } = await pool.query(query, values)

  return Response.json(rows)
}