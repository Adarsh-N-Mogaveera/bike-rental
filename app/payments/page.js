// app/payments/page.js
"use client";
import { useEffect,useState } from "react";

export default function PaymentsPage(){
  const [payments,setPayments] = useState([]);
  useEffect(()=>fetch('/api/payments').then(r=>r.json()).then(setPayments),[]);
  async function complete(id){ await fetch(`/api/payments/${id}/complete`,{ method: 'PATCH' }); fetch('/api/payments').then(r=>r.json()).then(setPayments);}
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Payments</h1>
        <a href="/payments/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Payment</a>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500"><tr><th>ID</th><th>Rental</th><th>Amount</th><th>Mode</th><th>Date</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {payments.map(p=>(
              <tr key={p.payment_id} className="border-t"><td className="py-2">{p.payment_id}</td><td>{p.rental_id}</td><td>₹{p.amount}</td><td>{p.payment_mode}</td><td>{p.payment_date}</td><td>{p.status}</td>
                <td>{p.status!=='Completed' && <button className="text-green-600" onClick={()=>complete(p.payment_id)}>Complete</button>}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
