// app/rents/new/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewRent(){
  const router = useRouter();
  const [customers,setCustomers] = useState([]);
  const [bikes,setBikes] = useState([]);
  const [form,setForm] = useState({ rental_id:'', cust_id:'', bike_id:'', start_date:'', end_date:'' });

  useEffect(()=>{ fetch('/api/customers').then(r=>r.json()).then(setCustomers); fetch('/api/bikes').then(r=>r.json()).then(setBikes); },[]);

  async function handleSubmit(e){
    e.preventDefault();
    // build full body: include cust object if new
    const cust = customers.find(c=>c.cust_id===form.cust_id) || { cust_id: form.cust_id, name: 'Unknown' };
    const body = { rental_id: form.rental_id, bike_id: form.bike_id, start_date: form.start_date, end_date: form.end_date, cust };
    const res = await fetch('/api/rents', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body) });
    if(res.ok) router.push('/rents'); else alert('Error creating rent');
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create Booking</h1>
      <form className="bg-white p-4 rounded shadow space-y-3" onSubmit={handleSubmit}>
        <input placeholder="Rental ID (R01)" value={form.rental_id} onChange={e=>setForm({...form,rental_id:e.target.value})} className="w-full p-2 border rounded" />
        <select value={form.cust_id} onChange={e=>setForm({...form,cust_id:e.target.value})} className="w-full p-2 border rounded" required>
          <option value="">Select Customer</option>
          {customers.map(c=> <option key={c.cust_id} value={c.cust_id}>{c.name} ({c.cust_id})</option> )}
        </select>
        <select value={form.bike_id} onChange={e=>setForm({...form,bike_id:e.target.value})} className="w-full p-2 border rounded" required>
          <option value="">Select Bike</option>
          {bikes.filter(b=>b.status==='Available').map(b=> <option key={b.bike_id} value={b.bike_id}>{b.model_name} - {b.num_plate}</option>)}
        </select>
        <input type="datetime-local" value={form.start_date} onChange={e=>setForm({...form,start_date:e.target.value})} className="w-full p-2 border rounded" required />
        <input type="datetime-local" value={form.end_date} onChange={e=>setForm({...form,end_date:e.target.value})} className="w-full p-2 border rounded" required />
        <div className="text-right"><button className="bg-green-600 text-white px-3 py-1 rounded">Create Booking</button></div>
      </form>
    </div>
  );
}
