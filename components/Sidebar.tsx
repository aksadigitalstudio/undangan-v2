import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-gray-900 p-6 text-white">
      <h1 className="mb-10 text-3xl font-bold">AKSA</h1>

      <nav className="space-y-6 text-xl">
        <Link href="/dashboard" className="block">
          Dashboard
        </Link>

        <Link href="/dashboard/invitations" className="block">
          Daftar Undangan
        </Link>
      </nav>
    </aside>
  );
}
