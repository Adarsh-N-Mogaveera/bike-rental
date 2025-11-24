// app/api/customers/route.js
import { pool } from '../../../lib/db';


export async function GET() {
  const [rows] = await pool.query('SELECT * FROM Customer');
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { cust_id, name, phone, email, address } = body;
    if (!cust_id || !name) return new Response(JSON.stringify({ error: 'cust_id and name required' }), { status: 400 });
    await pool.query('INSERT INTO Customer (cust_id, name, phone, email, address) VALUES (?, ?, ?, ?, ?)', [cust_id, name, phone, email, address]);
    return new Response(JSON.stringify({ message: 'Customer created' }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
