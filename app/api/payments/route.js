// app/api/payments/route.js
import { pool } from '../../../lib/db';

import { genId } from '../../../../lib/utils';

export async function GET() {
  const [rows] = await pool.query('SELECT * FROM Payment ORDER BY payment_date DESC');
  return new Response(JSON.stringify(rows), { status: 200 });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const payment_id = body.payment_id || genId('P');
    const { rental_id, payment_mode, amount } = body;
    if (!rental_id) return new Response(JSON.stringify({ error: 'rental_id required' }), { status: 400 });

    // insert payment
    await pool.query('INSERT INTO Payment (payment_id, rental_id, payment_mode, amount, payment_date, status) VALUES (?, ?, ?, ?, ?, ?)', [payment_id, rental_id, payment_mode || null, amount || null, null, 'Pending']);
    return new Response(JSON.stringify({ message: 'Payment created', payment_id }), { status: 201 });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}

// route to complete payment (app/api/payments/[id]/complete)
