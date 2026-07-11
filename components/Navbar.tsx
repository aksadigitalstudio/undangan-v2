export default function Navbar() {
  return (
    <nav className="h-16 bg-white border-b flex items-center justify-between px-6">
      <h1 className="text-2xl font-bold">AKSA Digital Studio</h1>

      <div className="flex items-center gap-3">
        <span>Admin</span>
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>
    </nav>
  );
}