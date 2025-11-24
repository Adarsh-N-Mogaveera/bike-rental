// app/bikes/new/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewBike(){
  const router = useRouter();
  const [form,setForm] = useState({ bike_id:'', model_name:'', num_plate:'', rent_per_hour:''});
  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch('/api/bikes', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if(res.ok) router.push('/bikes'); else alert('error');
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Bike</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
        <input value={form.bike_id} onChange={e=>setForm({...form,bike_id:e.target.value})} placeholder="Bike ID e.g. B01" className="w-full p-2 border rounded" required />
        <input value={form.model_name} onChange={e=>setForm({...form,model_name:e.target.value})} placeholder="Model name" className="w-full p-2 border rounded" />
        <input value={form.num_plate} onChange={e=>setForm({...form,num_plate:e.target.value})} placeholder="Number plate" className="w-full p-2 border rounded" />
        <input value={form.rent_per_hour} type="number" onChange={e=>setForm({...form,rent_per_hour:e.target.value})} placeholder="Rent per hour" className="w-full p-2 border rounded" />
        <div className="text-right"><button className="bg-green-600 text-white px-3 py-1 rounded">Add Bike</button></div>
      </form>
    </div>
  );
}
