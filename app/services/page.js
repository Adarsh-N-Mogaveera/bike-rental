// app/services/page.js
"use client";
import { useEffect,useState } from "react";

export default function ServicesPage(){
  const [services,setServices] = useState([]);
  useEffect(()=>fetch('/api/services').then(r=>r.json()).then(setServices),[]);
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Services</h1>
        <a href="/services/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Service</a>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500"><tr><th>ID</th><th>Bike</th><th>Type</th><th>Date</th><th>Cost</th></tr></thead>
          <tbody>
            {services.map(s => (
              <tr key={s.service_id} className="border-t">
                <td className="py-2">{s.service_id}</td>
                <td>{s.bike_id}</td>
                <td>{s.service_type}</td>
                <td>{s.service_date}</td>
                <td>₹{s.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
