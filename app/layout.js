// app/layout.js
import './globals.css';
import Navbar from '../components/Navbar';

export const metadata = {
  title: 'Bike Rental Dashboard',
  description: 'Admin dashboard for Bike Rental project',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
