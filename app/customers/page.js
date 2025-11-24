// app/customers/page.js
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomersPage() {
  const [customers, setCustomers] = useState([]);
  useEffect(() => { fetchData(); }, []);
  async function fetchData(){
    const res = await fetch('/api/customers');
    setCustomers(await res.json());
  }
  async function handleDelete(id){
    // if you implement delete API, call it. For now optimistic local remove
    if(!confirm('Delete customer?')) return;
    // call your delete endpoint if available
    // await fetch(`/api/customers/${id}`,{method:'DELETE'});
    setCustomers(prev => prev.filter(c => c.cust_id !== id));
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Customers</h1>
        <Link href="/customers/new" className="bg-blue-600 text-white px-3 py-1 rounded">Add Customer</Link>
      </div>

      <div className="bg-white rounded shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr><th>ID</th><th>Name</th><th>Phone</th><th>Email</th><th>Address</th><th>Action</th></tr>
          </thead>
          <tbody>
            {customers.map(c => (
              <tr key={c.cust_id} className="border-t">
                <td className="py-2">{c.cust_id}</td>
                <td>{c.name}</td>
                <td>{c.phone}</td>
                <td>{c.email}</td>
                <td>{c.address}</td>
                <td>
                  <button onClick={()=>handleDelete(c.cust_id)} className="text-red-600 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
