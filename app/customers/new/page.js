// app/customers/new/page.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewCustomer() {
  const router = useRouter();
  const [form, setForm] = useState({ cust_id:'', name:'', phone:'', email:'', address:''});
  async function handleSubmit(e){
    e.preventDefault();
    const res = await fetch('/api/customers', {
      method: 'POST', headers: { 'Content-Type':'application/json' }, body: JSON.stringify(form)
    });
    if (res.ok) router.push('/customers');
    else alert('Error creating');
  }
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Add Customer</h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow space-y-3">
        <input required placeholder="ID (e.g. C01)" value={form.cust_id} onChange={e=>setForm({...form,cust_id:e.target.value})} className="w-full p-2 border rounded" />
        <input required placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="w-full p-2 border rounded" />
        <input placeholder="Address" value={form.address} onChange={e=>setForm({...form,address:e.target.value})} className="w-full p-2 border rounded" />
        <div className="flex justify-end">
          <button type="submit" className="bg-green-600 text-white px-3 py-1 rounded">Create</button>
        </div>
      </form>
    </div>
  );
}
