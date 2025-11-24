// app/api/rents/[id]/return/route.js
import { pool } from '../../../../lib/db';


export async function POST(req, { params }) {
  const rental_id = params.id;
  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // lock rent row
    const [rentRows] = await conn.query('SELECT * FROM Rent WHERE rental_id = ? FOR UPDATE', [rental_id]);
    if (rentRows.length === 0) throw new Error('Rental not found');
    const rent = rentRows[0];

    // set actual end (we don't have actual_return column in your schema) — but we can update end_date to now OR simply mark bike available
    // **Since schema has only end_date, we'll treat actual return as updating end_date to NOW() and recompute hours/amount**
    const now = new Date();
    const nowSql = now.toISOString().slice(0, 19).replace('T', ' ');
    // recompute total hours & amount based on new end_date
    const [bikeRows] = await conn.query('SELECT rent_per_hour FROM Bike WHERE bike_id = ?', [rent.bike_id]);
    if (bikeRows.length === 0) throw new Error('Bike not found');
    const rph = Number(bikeRows[0].rent_per_hour);

    // compute new hours
    const start = new Date(rent.start_date);
    const diffHours = Math.ceil((now - start) / (1000 * 60 * 60));
    const newHours = Math.max(1, diffHours);
    const newAmount = Number((newHours * rph).toFixed(2));

    await conn.query('UPDATE Rent SET end_date = ?, total_hours = ?, total_amount = ? WHERE rental_id = ?', [nowSql, newHours, newAmount, rental_id]);

    // set bike to Available
    await conn.query('UPDATE Bike SET status = ? WHERE bike_id = ?', ['Available', rent.bike_id]);

    // mark pending payments for this rental as Completed and set payment_date
    await conn.query("UPDATE Payment SET status = 'Completed', payment_date = CURDATE() WHERE rental_id = ? AND status <> 'Completed'", [rental_id]);

    await conn.commit();
    return new Response(JSON.stringify({ message: 'Bike returned, rent updated, payments completed', rental_id, newHours, newAmount }), { status: 200 });
  } catch (err) {
    await conn.rollback();
    return new Response(JSON.stringify({ error: err.message }), { status: 400 });
  } finally {
    conn.release();
  }
}
