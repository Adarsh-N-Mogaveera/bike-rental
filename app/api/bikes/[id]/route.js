// app/api/bikes/[id]/route.js
import { pool } from '../../../../lib/db';



export async function PATCH(req, { params }) {
  try {
    const bike_id = params.id;
    const { status } = await req.json();
    await pool.query('UPDATE Bike SET status = ? WHERE bike_id = ?', [status, bike_id]);
    return new Response(JSON.stringify({ message: 'Updated' }), { status: 200 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
