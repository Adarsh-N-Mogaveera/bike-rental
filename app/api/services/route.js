// app/api/services/route.js
import { pool } from '../../../lib/db';

import { genId } from '../../../../lib/utils';

export async function GET() {
  const [rows] = await pool.query('SELECT * FROM Service ORDER BY service_date DESC');
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(req) {
  const conn = await pool.getConnection();
  try {
    const body = await req.json();
    const service_id = body.service_id || genId('S');
    const { bike_id, service_type, service_date, cost, remark } = body;
    if (!bike_id) return new Response(JSON.stringify({ error: 'bike_id required' }), { status: 400 });

    await conn.beginTransaction();
    await conn.query('INSERT INTO Service (service_id, bike_id, service_type, service_date, cost, remark) VALUES (?, ?, ?, ?, ?, ?)', [service_id, bike_id, service_type, service_date, cost, remark]);
    // set bike status to In Service
    await conn.query('UPDATE Bike SET status = ? WHERE bike_id = ?', ['In Service', bike_id]);
    await conn.commit();
    return new Response(JSON.stringify({ message: 'Service recorded', service_id }), { status: 201 });
  } catch (err) {
    await conn.rollback();
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  } finally {
    conn.release();
  }
}
