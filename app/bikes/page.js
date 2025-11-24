// app/bikes/page.js
"use client";
import Link from "next/link";
import { useEffect,useState } from "react";

export default function BikesPage(){
  const [bikes, setBikes] = useState([]);
  useEffect(()=>fetchData(),[]);
  async function fetchData(){ const res = await fetch('/api/bikes'); setBikes(await res.json()); }

  async function changeStatus(bike_id, status){
    await fetch(`/api/bikes/${bike_id}`, { method: 'PATCH', body: JSON.stringify({ status }), headers:{'Content-Type':'application/json'}});
    fetchData();
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Bikes</h1>
        <Link href="/bikes/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Bike</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr><th>ID</th><th>Model</th><th>Plate</th><th>Rent/hr</th><th>Status</th><th>Action</th></tr>
          </thead>
          <tbody>
            {bikes.map(b => (
              <tr key={b.bike_id} className="border-t">
                <td className="py-2">{b.bike_id}</td>
                <td>{b.model_name}</td>
                <td>{b.num_plate}</td>
                <td>₹{b.rent_per_hour}</td>
                <td>{b.status}</td>
                <td>
                  {b.status !== 'Available' && <button onClick={()=>changeStatus(b.bike_id,'Available')} className="text-sm text-green-600">Make Available</button>}
                  {b.status === 'Available' && <button onClick={()=>changeStatus(b.bike_id,'In Service')} className="text-sm text-orange-600 ml-2">Mark Service</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
