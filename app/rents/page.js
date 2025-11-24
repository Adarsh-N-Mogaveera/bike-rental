// app/rents/page.js
"use client";
import { useEffect,useState } from "react";
import Link from "next/link";

export default function RentsPage(){
  const [rents,setRents] = useState([]);
  useEffect(()=>fetchRents(),[]);
  async function fetchRents(){ const res = await fetch('/api/rents'); setRents(await res.json()); }

  async function returnBike(rental_id){
    if(!confirm('Confirm return?')) return;
    await fetch(`/api/rents/${rental_id}/return`, { method: 'POST' });
    fetchRents();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Rents</h1>
        <Link href="/rents/new" className="bg-blue-600 text-white px-3 py-1 rounded">New Booking</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr><th>ID</th><th>Customer</th><th>Bike</th><th>Start</th><th>End</th><th>Amount</th><th>Action</th></tr>
          </thead>
          <tbody>
            {rents.map(r => (
              <tr key={r.rental_id} className="border-t">
                <td className="py-2">{r.rental_id}</td>
                <td>{r.customer_name}</td>
                <td>{r.bike_model}</td>
                <td>{new Date(r.start_date).toLocaleString()}</td>
                <td>{new Date(r.end_date).toLocaleString()}</td>
                <td>₹{r.total_amount}</td>
                <td>
                  <button onClick={()=>returnBike(r.rental_id)} className="text-sm text-green-600">Return</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
