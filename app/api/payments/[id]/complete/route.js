// app/api/payments/[id]/complete/route.js
import { pool } from '../../../../lib/db';


export async function PATCH(req, { params }) {
  try {
    const payment_id = params.id;
    await pool.query("UPDATE Payment SET status = 'Completed', payment_date = CURDATE() WHERE payment_id = ?", [payment_id]);
    return new Response(JSON.stringify({ message: 'Payment completed' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
