// components/Navbar.jsx
"use client";
import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link href="/">
          <span className="text-xl font-semibold">Bike Rental</span>
        </Link>

        <nav className="space-x-4 text-sm">
          <Link href="/customers" className="hover:underline">Customers</Link>
          <Link href="/bikes" className="hover:underline">Bikes</Link>
          <Link href="/rents" className="hover:underline">Rents</Link>
          <Link href="/payments" className="hover:underline">Payments</Link>
          <Link href="/services" className="hover:underline">Services</Link>
        </nav>
      </div>
    </header>
  );
}
