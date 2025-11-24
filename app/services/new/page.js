// app/services/new/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewService(){
  const router = useRouter();
  const [bikes,setBikes] = useState([]);
  const [form,setForm] = useState({ service_id:'', bike_id:'', service_type:'', service_date:'', cost:'', remark:''});
  useEffect(()=>fetch('/api/bikes').then(r=>r.json()).then(setBikes),[]);
  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/services', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if(res.ok) router.push('/services'); else alert('error');
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Service</h1>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
        <select value={form.bike_id} onChange={e=>setForm({...form,bike_id:e.target.value})} required className="w-full p-2 border rounded">
          <option value="">Select Bike</option>
          {bikes.map(b=> <option key={b.bike_id} value={b.bike_id}>{b.model_name} - {b.bike_id}</option>)}
        </select>
        <input placeholder="Service type" value={form.service_type} onChange={e=>setForm({...form,service_type:e.target.value})} className="w-full p-2 border rounded" />
        <input type="date" value={form.service_date} onChange={e=>setForm({...form,service_date:e.target.value})} className="w-full p-2 border rounded" />
        <input type="number" value={form.cost} onChange={e=>setForm({...form,cost:e.target.value})} className="w-full p-2 border rounded" />
        <textarea value={form.remark} onChange={e=>setForm({...form,remark:e.target.value})} className="w-full p-2 border rounded" placeholder="Remark" />
        <div className="text-right"><button className="bg-green-600 text-white px-3 py-1 rounded">Add</button></div>
      </form>
    </div>
  );
}
