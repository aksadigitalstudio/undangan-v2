import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-10">AKSA</h1>

      <nav className="space-y-6 text-xl">
        <Link href="/dashboard" className="block">
          Dashboard
        </Link>

        <Link href="/dashboard/invitations" className="block">
  Daftar Undangan
</Link>

        <Link href="/pricing" className="block">
          Pricing
        </Link>

        <Link href="/login" className="block">
          Logout
        </Link>
      </nav>
    </aside>
  );
}