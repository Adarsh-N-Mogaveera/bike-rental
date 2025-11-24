module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/api/rents/route.js [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// app/api/rents/route.js
__turbopack_context__.s([
    "GET",
    ()=>GET,
    "POST",
    ()=>POST
]);
(()=>{
    const e = new Error("Cannot find module '../../../../lib/db'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '../../../../lib/utils'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
async function GET() {
    const [rows] = await pool.query(`
    SELECT r.*, c.name AS customer_name, b.model_name AS bike_model, b.rent_per_hour
    FROM Rent r
    JOIN Customer c ON r.cust_id = c.cust_id
    JOIN Bike b ON r.bike_id = b.bike_id
    ORDER BY r.start_date DESC
  `);
    return new Response(JSON.stringify(rows), {
        status: 200
    });
}
async function POST(req) {
    const conn = await pool.getConnection();
    try {
        const body = await req.json();
        const rental_id = body.rental_id || genId('R');
        const { bike_id, start_date, end_date, cust } = body;
        if (!bike_id || !start_date || !end_date || !cust || !cust.cust_id) {
            return new Response(JSON.stringify({
                error: 'missing bike_id/start_date/end_date/cust.cust_id'
            }), {
                status: 400
            });
        }
        await conn.beginTransaction();
        // lock the bike row
        const [bikeRows] = await conn.query('SELECT * FROM Bike WHERE bike_id = ? FOR UPDATE', [
            bike_id
        ]);
        if (bikeRows.length === 0) throw new Error('Bike not found');
        const bike = bikeRows[0];
        if (bike.status !== 'Available') throw new Error(`Bike not available (status=${bike.status})`);
        // ensure customer exists
        const [custRows] = await conn.query('SELECT * FROM Customer WHERE cust_id = ?', [
            cust.cust_id
        ]);
        if (custRows.length === 0) {
            await conn.query('INSERT INTO Customer (cust_id, name, phone, email, address) VALUES (?, ?, ?, ?, ?)', [
                cust.cust_id,
                cust.name,
                cust.phone,
                cust.email,
                cust.address
            ]);
        }
        // compute hours & amount
        const total_hours = computeHours(start_date, end_date);
        const total_amount = (Number(bike.rent_per_hour) * total_hours).toFixed(2);
        // insert rent
        await conn.query('INSERT INTO Rent (rental_id, cust_id, bike_id, start_date, end_date, total_hours, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?)', [
            rental_id,
            cust.cust_id,
            bike_id,
            start_date,
            end_date,
            total_hours,
            total_amount
        ]);
        // update bike status to Rented
        await conn.query('UPDATE Bike SET status = ? WHERE bike_id = ?', [
            'Rented',
            bike_id
        ]);
        await conn.commit();
        return new Response(JSON.stringify({
            message: 'Booking created',
            rental_id,
            total_hours,
            total_amount
        }), {
            status: 201
        });
    } catch (err) {
        await conn.rollback();
        return new Response(JSON.stringify({
            error: err.message
        }), {
            status: 400
        });
    } finally{
        conn.release();
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__26ff354b._.js.map