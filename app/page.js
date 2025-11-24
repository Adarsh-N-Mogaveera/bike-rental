// app/page.js
import Link from 'next/link';

export default async function Page() {
  // fetch summary data (call existing endpoints)
  const [bikesRes, rentsRes] = await Promise.all([
    fetch('http://localhost:3000/api/bikes', { cache: 'no-store' }),
    fetch('http://localhost:3000/api/rents', { cache: 'no-store' })
  ]);
  const bikes = await bikesRes.json();
  const rents = await rentsRes.json();

  const totalBikes = bikes.length;
  const rented = bikes.filter(b => b.status === 'Rented').length;
  const inService = bikes.filter(b => b.status === 'In Service').length;
  const upcomingRents = rents.slice(0, 6);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Total Bikes</div>
          <div className="text-2xl font-semibold">{totalBikes}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">Rented</div>
          <div className="text-2xl font-semibold">{rented}</div>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="text-sm text-gray-500">In Service</div>
          <div className="text-2xl font-semibold">{inService}</div>
        </div>
      </div>

      <section className="bg-white rounded shadow p-4">
        <h2 className="font-semibold mb-2">Recent Rents</h2>
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500">
            <tr>
              <th>Rental ID</th>
              <th>Customer</th>
              <th>Bike</th>
              <th>Start</th>
              <th>End</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {upcomingRents.map(r => (
              <tr key={r.rental_id} className="border-t">
                <td className="py-2">{r.rental_id}</td>
                <td>{r.customer_name}</td>
                <td>{r.bike_model}</td>
                <td>{new Date(r.start_date).toLocaleString()}</td>
                <td>{new Date(r.end_date).toLocaleString()}</td>
                <td>₹{r.total_amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 text-right">
          <Link href="/rents" className="text-blue-600">View all rents →</Link>
        </div>
      </section>
    </div>
  );
}
