// app/payments/new/page.js
"use client";
import { useEffect,useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPayment(){
  const router = useRouter();
  const [rents,setRents] = useState([]);
  const [form,setForm] = useState({ payment_id:'', rental_id:'', payment_mode:'', amount:''});
  useEffect(()=>fetch('/api/rents').then(r=>r.json()).then(setRents),[]);
  async function submit(e){
    e.preventDefault();
    const res = await fetch('/api/payments', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    if(res.ok) router.push('/payments'); else alert('error');
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Payment</h1>
      <form onSubmit={submit} className="bg-white p-4 rounded shadow space-y-3">
        <select required value={form.rental_id} onChange={e=>setForm({...form,rental_id:e.target.value})} className="w-full p-2 border rounded">
          <option value="">Select Rental</option>
          {rents.map(r=> <option key={r.rental_id} value={r.rental_id}>{r.rental_id} - {r.customer_name}</option>)}
        </select>
        <input placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Mode (UPI/Cash)" value={form.payment_mode} onChange={e=>setForm({...form,payment_mode:e.target.value})} className="w-full p-2 border rounded" />
        <div className="text-right"><button className="bg-green-600 text-white px-3 py-1 rounded">Add Payment</button></div>
      </form>
    </div>
  );
}
