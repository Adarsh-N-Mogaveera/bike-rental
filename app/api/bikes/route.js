// app/api/bikes/route.js
import pool from '../../../../lib/db';

export async function GET() {
  const [rows] = await pool.query('SELECT * FROM Bike');
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(req) {
  try {
    const { bike_id, model_name, num_plate, rent_per_hour, status } = await req.json();
    if (!bike_id) return new Response(JSON.stringify({ error: 'bike_id required' }), { status: 400 });
    await pool.query('INSERT INTO Bike (bike_id, model_name, num_plate, rent_per_hour, status) VALUES (?, ?, ?, ?, ?)', [bike_id, model_name, num_plate, rent_per_hour, status || 'Available']);
    return new Response(JSON.stringify({ message: 'Bike added' }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
